<template>
  <div>
    <hm-header>我的收藏</hm-header>
    <!-- 列表 -->
    <hm-post v-for="post in postList" :key="post.id" :post="post"></hm-post>
  </div>
</template>

<script>
export default {
  data() {
    return {
      postList: [], // 文章列表  8
    }
  },
  async created() {
    let res = await this.$axios.get('/user_star')
    console.log('收藏', res.data.data)
    this.postList = res.data.data
  },
}
</script>

<style></style>
