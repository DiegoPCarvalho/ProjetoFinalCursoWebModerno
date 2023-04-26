<template>
  <footer class="footer">
    <span>Copyright <strong>DC<span>7</span> © 2019-2022 </strong></span>
  </footer>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style>
.footer {
  grid-area: footer;
  background-color: #DDD;
  color: #333;

  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 10px;
}
</style>