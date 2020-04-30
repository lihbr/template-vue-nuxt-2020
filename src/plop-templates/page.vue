<!-- HEALTH:UNKNOWN __page__{{ kebabCase route }} -->
<template>
  <div class="__page__{{ kebabCase route }}" :slices="data.slices">
    <div class="content">
      {{ pascalCase route }}
    </div>
  </div>
</template>

<script>
// import Component from "~/components/Component.vue";

export default {
  components: {
    // Component
  },
  async asyncData(context) {
    return await context.$pagePayload(context);
  },
  mounted() {
    this.$store.dispatch("pageChanged");
  },
  head() {
    const { meta_title, meta_description, meta_image } = this.data;
    return this.$buildHead({
      title: meta_title || "💐",
      description: meta_description,
      metaImage: {
        og: undefined /* meta_image.url */,
        tw: undefined /* meta_image.twitter_variant.url */
      },
      path: this.$route.path
    });
  }
};
</script>

<style lang="sass" scoped>
// .__page__{{ kebabCase route }}
</style>
