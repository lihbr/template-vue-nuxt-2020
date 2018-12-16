<template>
  <div class="container">
    <slot/>
  </div>
</template>

<style scoped lang="stylus">
.container
  margin 0 auto
  width calc(100% - 16vw)

  @media screen and (max-width: desktop)
    width calc(100% - globalMargin * 4)
  @media screen and (max-width: tablet)
    width calc(100% - globalMargin * 2)
</style>
