<template>
    <div class="loading">
        <img src="@/assets/loading.gif" atl="Loading" />
    </div>
</template>

<script>
export default {
    name: 'Loading'
}
</script>

<style>
    .loading {
        grid-area: content;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>