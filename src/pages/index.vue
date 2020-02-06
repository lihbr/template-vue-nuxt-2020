<template>
  <div class="home">
    home
  </div>
</template>

<script>
// import Component from "~/components/Component.vue"

export default {
  components: {
    // Component
  },
  mounted() {
    this.$store.dispatch("pageChanged");
  }
};
</script>

<style lang="sass" scoped></style>
