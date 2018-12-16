<template>
  <div class="container">
    <slot />
  </div>
</template>

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
