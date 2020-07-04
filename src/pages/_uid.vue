<!-- HEALTH:UNKNOWN __page__uid -->
<template>
  <div class="__page__uid">
    <div class="content">
      <smart-link
        href="/foo"
        title="hey"
        class="test"
        alt="test"
        @click.native="$logger.log('/foo')"
      >
        /foo
      </smart-link>
      <smart-link href="/bar">
        /bar
      </smart-link>
      <smart-link href="/baz">
        /baz
      </smart-link>
      <smart-link href="//google.com">
        https://google.com
      </smart-link>
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
    return { data: {} };
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
.__page__uid
  .smartLink
    @apply block

  .nuxt-link-active
    @apply underline
</style>
