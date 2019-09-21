<template>
  <div class="wrapper">
    <h1>{{ code }}</h1>
    <h2>{{ error.message }}</h2>
    <nuxt-link class="underline" to="/">
      Home page
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => ({
        code: "Unknown",
        message: "Something happened, but we're taking care of it!"
      })
    }
  },
  computed: {
    code: function() {
      return this.error.statusCode || this.error.code;
    }
  }
};
</script>

<style lang="sass" scoped></style>
