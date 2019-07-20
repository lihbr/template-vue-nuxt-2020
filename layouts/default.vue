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
  data() {
    return {
      whichBrowser: "",
      isMobile: false,
      isTouch: false
    };
  },
  mounted() {
    /**
     * Default operations
     */
    const isMobile = require("is-mobile");

    const that = this;

    // Object fit polyfill
    objectFitImages();

    // Browser?
    const browserDetection = new BrowserDectector();
    this.whichBrowser = `is${browserDetection.browser[0].toUpperCase() +
      browserDetection.browser.slice(1)}`;

    // Mobile?
    if (isMobile()) {
      this.isMobile = true;
    }

    // Touch?
    window.addEventListener(
      "touchstart",
      function onFirstTouch(e) {
        e.stopPropagation();
        console.log("touch");
        that.isTouch = true;
        window.removeEventListener("touchstart", onFirstTouch, false);
      },
      false
    );

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
      this.menuActive && htmlClass.push("menuActive");

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
