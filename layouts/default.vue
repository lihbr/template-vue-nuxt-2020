<template>
  <div class="globalContainer">
    <main class="main">
      <nuxt />
    </main>
  </div>
</template>

<script>
import objectFitImages from "object-fit-images";

export default {
  head() {
    return {
      htmlAttrs: {
        class: this.getHtmlClass().join(" ")
      }
    };
  },
  computed: {
    whichBrowser() {
      return this.$store.state.detect.browser;
    },
    isMobile() {
      return this.$store.state.detect.mobile;
    },
    isTouch() {
      return this.$store.state.detect.touch;
    }
  },
  mounted() {
    /**
     * Default operations
     */
    this.$store.dispatch("detect/detect");
    // Object fit polyfill
    objectFitImages();
    // Force add classes once
    document.documentElement.classList.add(...this.getHtmlClass());
    /**
     * End of default operations
     */
  },
  methods: {
    getHtmlClass() {
      const htmlClass = [];

      this.whichBrowser && htmlClass.push(this.whichBrowser);
      this.isMobile && htmlClass.push("isMobile");
      this.isTouch && htmlClass.push("isTouch");

      return htmlClass;
    }
  }
};
</script>


<style lang="stylus">
html
  font-family mainFont
  font-size 16px
  word-spacing 1px
  -ms-text-size-adjust 100%
  -webkit-text-size-adjust 100%
  -moz-osx-font-smoothing grayscale
  -webkit-font-smoothing antialiased
  box-sizing border-box
  color black
  background white

.main
  min-height 100vh
  display flex
  flex-flow column nowrap
  justify-content space-between
  overflow-x hidden
</style>
