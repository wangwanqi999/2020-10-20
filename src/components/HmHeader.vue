<template>
  <!-- hm-header 留置占位 -->
  <div class="hm-header">
    <!-- 固定定位 -->
    <div class="m">
      <div class="left" @click="$router.back()">
        <i class="iconfont iconjiantou2"></i>
      </div>
      <div class="center">
        <slot></slot>
      </div>
      <div class="right"></div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less">
.hm-header {
  height: 40px;
  .m {
    position: fixed;
    width: 100%;
    z-index: 999;
    height: 40px;
    background: #f4f4f4;
    border-bottom: 1px solid #ccc;
    text-align: center;

    display: flex;
    align-items: center;
    .left,
    .right {
      width: 30px;
    }
    .center {
      flex: 1;
      font-size: 18px;
      font-weight: 700;
    }
  }
}
</style>
