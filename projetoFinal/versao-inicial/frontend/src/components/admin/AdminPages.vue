<template>
    <div class="admin-pages">
        <PageTitle icon="fa fa-cogs" main="Administração do Sistema" 
            sub="Cadastros & Cia"/>
        <div class="admin-pages-tabs">
            <b-card no-body>
                <b-tabs card>
                    <b-tab title="Artigos" active>
                        <ArticleAdmin />
                    </b-tab>
                    <b-tab title="Categorias">
                        <CatergoryAdmin />
                    </b-tab>
                    <b-tab title="Usuários">
                        <UserAdmin />
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
    </div>
</template>

<script>
import PageTitle from '@/components/template/PageTitle.vue';
import ArticleAdmin from './ArticleAdmin.vue';
import CatergoryAdmin from './CatergoryAdmin.vue';
import UserAdmin from './UserAdmin.vue';

export default {
    name: "AdminPages",
    components: { PageTitle, ArticleAdmin, CatergoryAdmin, UserAdmin }
}
</script>

<style>

</style>