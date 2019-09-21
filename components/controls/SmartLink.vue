<template>
  <span class="smartLink">
    <nuxt-link v-if="href && isRelative" :to="href" :title="realTitle">
      <slot />
    </nuxt-link>
    <a
      v-else-if="href"
      :href="href"
      :title="realTitle"
      :target="target === 'blank' ? '_blank' : false"
      :rel="target === 'blank' ? 'noopener' : false"
    >
      <slot />
    </a>
    <div v-else class="inherit">
      <slot />
    </div>
  </span>
</template>

<script>
export default {
  props: {
    href: {
      type: String,
      default: () => ""
    },
    title: {
      type: String,
      default: () => ""
    },
    target: {
      type: String,
      default: () => ""
    }
  },
  computed: {
    isRelative: function() {
      const regex = /^(([a-z0-9]*:|.{0})\/\/|mailto:|\.\/assets).*$/gim; // match if absolute
      return this.href.match(regex) === null;
    },
    realTitle: function() {
      return this.title || this.$slots.default
        ? this.$slots.default[0].text
        : "";
    }
  }
};
</script>

<style lang="sass" scoped>
.smartLink a, .smartLink .inherit
  display: inherit
  height: inherit
  align-items: inherit
  justify-content: inherit
  width: inherit
</style>
