<template>
  <!-- eslint-disable-next-line -->
  <div class="markdown" v-html="formatedText" />
</template>

<script>
import marked from "marked";

marked.setOptions({
  sanitize: true
});

export default {
  props: {
    text: {
      type: String,
      default: ""
    }
  },
  computed: {
    formatedText() {
      return marked(this.text.replace(/</g, "&lt;").replace(/>/g, "&gt;"));
    }
  }
};
</script>
