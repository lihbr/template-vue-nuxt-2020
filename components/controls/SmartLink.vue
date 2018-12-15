<template>
  <span class="smartLink">
    <nuxt-link v-if="isRelative" :to="href" :title="realTitle">
      <slot/>
    </nuxt-link>
    <a
      v-else
      :href="href"
      :title="realTitle"
      :target="target === 'blank' ? '_blank' : ''"
      :rel="target === 'blank' ? 'noopener' : ''"
    >
      <slot/>
    </a>
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
      const regex = /^([a-z0-9]*:|.{0})\/\/.*$/gim; // match if absolute
      return this.href.match(regex) === null;
    },
    realTitle: function() {
      return this.title || this.getSlotText();
    }
  },
  methods: {
    getSlotText() {
      return this.$slots.default
        .map(vnode => vnode.text || vnode.elm.innerText)
        .join(" ");
    }
  }
};
</script>

<style scoped lang="stylus">
.container
  display block
  overflow hidden
  padding 0 8vw

  @media screen and (max-width: desktop)
    padding 0 50px
  @media screen and (max-width: tablet)
    padding 0 20px
</style>


/^([a-z0-9]*:|.{0})\/\/.*$/gmi
