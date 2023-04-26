<template>
  <div class="category-admin">
    <b-form>
      <input id="category-id" type="hidden" v-model="category.id" />
      <b-row>
        <b-col xs="12">
          <b-form-group label="Categoria: " label-for="category-name" class="fw-bold">
            <b-form-input id="category-name" type="text" v-model="category.name" required
              placeholder="Informe o Nome da Categoria..." :disabled="mode === 'remove'" />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row >
        <b-col xs="12">
          <b-form-group label="Categoria Pai: " label-for="category-parentId" class="fw-bold">
              <b-form-select id="category-parentId" class="form-control"
                  :options="categories" v-model="category.parentId" :disabled="mode === 'remove'">
              </b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col xs="12">
          <b-button variant="primary" v-if="mode === 'save'" @click="save" class="mt-3 fw-bold">Salvar</b-button>
          <b-button variant="danger" v-if="mode === 'remove'" @click="remove" class="mt-3 fw-bold">Excluir</b-button>
          <b-button variant="secondary" class="mt-3 mx-2" @click="reset">Cancelar</b-button>
        </b-col>
      </b-row>
      
    </b-form>

    <hr />
    
    <b-table hover striped :items="categories" :fields="fields">
      <template #cell(actions)="data">
        <b-button variant="warning" @click="loadCategory(data.item)" class="mx-2">
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button variant="danger" @click="loadCategory(data.item, 'remove')">
          <i class="fa fa-trash"></i>
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import axios from 'axios';
import { baseApiUrl, showError } from '@/config/global';

export default {
  name: "CategoryAdmin",
  data: function () {
    return {
      mode: 'save',
      category: {},
      categories: [],
      fields: [
        { key: 'id', label: 'Código', sortable: true },
        { key: 'name', label: 'Categoria', sortable: true },
        { key: 'path', label: 'Caminho', sortable: true },
        { key: 'actions', label: 'Ações' }
      ],
    }
  },
  methods: {
    loadCategories() {
      const url = `${baseApiUrl}/categories`;
      axios.get(url).then(res => {
        this.categories = res.data.map(category => {
          return { ...category, value: category.id, text: category.path}
        })
      })
    },
    reset() {
      this.mode = 'save',
        this.category = {},
        this.loadCategories()
    },
    save() {
      const method = this.category.id ? 'put' : 'post';
      const id = this.category.id ? `/${this.category.id}` : '';
      axios[method](`${baseApiUrl}/categories${id}`, this.category)
        .then(() => {
          this.$toasted.global.defaultSuccess()
          this.reset()
        })
        .catch(showError)
    },
    remove() {
      const id = this.category.id
      axios.delete(`${baseApiUrl}/categories/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess()
          this.reset()
        })
        .catch(showError)
    },
    loadCategory(category, mode = 'save') {
      this.mode = mode;
      this.category = { ...category }
    }
  },
  mounted() {
    this.loadCategories()
  }
}
</script>

<style></style>