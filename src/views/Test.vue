<template>
  <div>
    <!-- 标签 -->
    <h1>哈哈</h1>
    <p>嘻嘻</p>
    <!-- 组件 -->
    <van-tabs v-model="active">
      <van-tab title="标签 1">内容 1</van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
    }
  },
}
</script>

<style scoped lang="less">
/* 深度作用选择器  */
// css : >>>
// less : /deep/
/deep/ .van-tabs__nav {
  background: red;
}

h1 {
  color: red;
}
</style>
