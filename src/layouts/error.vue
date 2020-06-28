<!-- HEALTH:UNKNOWN __page__error -->
<template>
  <div class="__page__error">
    <h1>{{ code }}</h1>
    <h2>{{ message | uc_first }}</h2>
    <smart-link class="underline" href="/" :external="$route.path === '/'">
      Home page
    </smart-link>
  </div>
</template>

<script>
import statusMsg from "~/assets/js/statusMsg.json";

const unknown = "Something happened, but we're taking care of it!";

export default {
  props: {
    error: {
      type: Object,
      default: () => ({
        statusCode: 0,
        message: ""
      })
    }
  },
  computed: {
    code() {
      return this.error.statusCode;
    },
    message() {
      return statusMsg[this.code] || unknown;
    }
  },
  mounted() {
    this.$store.dispatch("pageChanged");
  },
  head() {
    return this.$buildHead({
      title: `${this.code}` || "💐",
      description: this.$options.filters.uc_first(this.message),
      metaImage: { og: undefined, tw: undefined },
      path: this.$route.path
    });
  }
};
</script>

<style lang="sass" scoped>
// .__page__error
</style>
