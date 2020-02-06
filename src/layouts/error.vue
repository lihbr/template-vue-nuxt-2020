<template>
  <div class="wrapper">
    <h1>{{ code }}</h1>
    <h2>{{ message }}</h2>
    <smart-link class="underline" to="/">
      Home page
    </smart-link>
  </div>
</template>

<script>
const unknown = "Something happened, but we're taking care of it!";

export default {
  props: {
    error: {
      type: Object,
      default: () => ({
        code: "Unknown",
        message: ""
      })
    }
  },
  computed: {
    code: function() {
      return this.error.statusCode || this.error.code;
    },
    message() {
      return this.error.msg /*|| statusMsg[this.code]*/ || unknown;
    }
  }
};
</script>

<style lang="sass" scoped></style>
