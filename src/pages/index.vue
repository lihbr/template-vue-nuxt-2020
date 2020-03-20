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
  },
  head() {
    return this.$buildHead({
      title: "Home",
      description: "This is the home page",
      metaImage: {},
      path: this.$route.path
    });
  }
};
</script>

<style lang="sass" scoped></style>
