<template>
  <div class="article-admin">
    <b-form>
      <input id="article-id" type="hidden" v-model="article.id" />
      <b-form-group label="Nome: " label-for="article-name" class="fw-bold">
        <b-form-input id="article-name" type="text" v-model="article.name" required :disabled="mode === 'remove'"
          placeholder="Informe o Nome do Artigo..." />
      </b-form-group>
      <b-form-group label="Descrição: " label-for="article-description" class="fw-bold">
        <b-form-input id="article-description" type="text" v-model="article.description" required
        :disabled="mode === 'remove'" placeholder="Informe a Descrição do Artigo..." />
      </b-form-group>
      <b-form-group label="Imagem (URL): " label-for="article-imageUrl" class="fw-bold">
        <b-form-input id="article-imageUrl" type="text" v-model="article.imageUrl" :disabled="mode === 'remove'"
          placeholder="Informe a URL do Artigo..." />
      </b-form-group>
      <b-form-group label="Categorias: " label-for="aticle-categoiryId" class="fw-bold">
        <b-form-select id="article-categoryId" :options="categories" v-model="article.categoryId" class="form-control"
          :disabled="mode === 'remove'" />
      </b-form-group>
      <b-form-group label="Autor: " label-for="aticle-userId" class="fw-bold">
        <b-form-select id="article-userId" :options="users" v-model="article.userId" :disabled="mode === 'remove'"
          class="form-control" />
      </b-form-group>
      <b-form-group label="Conteúdo: " label-for="aticle-content" class="fw-bold">
        <VueEditor v-model="article.content"
          placeholder="Informe o Conteúdo do Artigo..." :disabled="mode === 'remove'"/>
      </b-form-group>
      <b-button variant="primary" v-if="mode === 'save'" @click="save" class="mt-3 fw-bold">Salvar</b-button>
      <b-button variant="danger" v-if="mode === 'remove'" @click="remove" class="mt-3 fw-bold">Excluir</b-button>
      <b-button variant="secondary" class="mt-3 mx-2" @click="reset">Cancelar</b-button>
    </b-form>
    <hr />

    <b-table hover striped :items="articles" :fields="fields">
      <template #cell(actions)="data">
        <b-button variant="warning" @click="loadArticle(data.item)" class="mx-2">
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button variant="danger" @click="loadArticle(data.item, 'remove')">
          <i class="fa fa-trash"></i>
        </b-button>
      </template>
    </b-table>
    <b-pagination
        size="md"
        v-model="page"
        :total-rows="count"
        :per-page="limit"
        first-number
      ></b-pagination>
  </div>
</template>

<script>
import axios from 'axios';
import { baseApiUrl, showError } from '@/config/global';
import { VueEditor }  from 'vue2-editor';

export default {
  name: "ArticleAdmin",
  components: { VueEditor },
  data: function () {
    return {
      mode: 'save',
      article: {},
      articles: [],
      categories: [],
      users: [],
      page: 1,
      limit: 0,
      count: 0,
      fields: [
        { key: 'id', label: 'Código', sortable: true },
        { key: 'name', label: 'Nome', sortable: true },
        { key: 'description', label: 'Descrição', sortable: true },
        { key: 'actions', label: 'Ações' }
      ],
    }
  },
  methods: {
    loadCategories() {
      const url = `${baseApiUrl}/categories`;
      axios.get(url).then(res => {
        this.categories = res.data.map(category => {
          return { value: category.id, text: category.path }
        })
      })
    },
    loadUsers() {
      const url = `${baseApiUrl}/users`;
      axios.get(url).then(res => {
        this.users = res.data.map(user => {
          return { value: user.id, text: `${user.name} - ${user.email}` }
        })
      })
    },
    loadArticles() {
      const url = `${baseApiUrl}/articles?page=${this.page}`;
      axios.get(url).then(res => {
        // this.articles = res.data
        this.articles = res.data.data;
        this.count = res.data.count;
        this.limit = res.data.limit;
      })
    },
    reset() {
      this.mode = 'save',
        this.article = {},
        this.loadArticles()
    },
    save() {
      const method = this.article.id ? 'put' : 'post';
      const id = this.article.id ? `/${this.article.id}` : '';
      axios[method](`${baseApiUrl}/articles${id}`, this.article)
        .then(() => {
          this.$toasted.global.defaultSuccess()
          this.reset()
        })
        .catch(showError)
    },
    remove() {
      const id = this.article.id
      axios.delete(`${baseApiUrl}/articles/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess()
          this.reset()
        })
        .catch(showError)
    },
    loadArticle(article, mode = 'save') {
      this.mode = mode;
      // this.article = { ...article }
      axios.get(`${baseApiUrl}/articles/${article.id}`)
        .then(res => this.article = res.data)
    }
  },
  watch: {
    page() {
      this.loadArticles()
    }
  },
  mounted() {
    this.loadCategories();
    this.loadUsers();
    this.loadArticles();
  }
}
</script>

<style></style>