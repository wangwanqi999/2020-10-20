
<template>
  <div class="hm-comment">
    <!-- 头部评论 -->
    <div class="top">
      <div class="left">
        <img
          :src="$axios.defaults.baseURL + comments.user.head_img"
          alt=""
        >
      </div>
      <div class="center">
        <div class="person">{{comments.user.username}}</div>
        <div class="time">{{comments.create_date | date}}</div>
      </div>
      <div class="right">回复</div>
    </div>
    <!-- 中间评论部分  楼层 -->
    <hm-floor
      v-if="comments.parent"
      :parent='comments.parent'
    ></hm-floor>
    <div class="bottom line1">
      {{comments.content}}
    </div>

  </div>
</template>

<script>
export default {
  props: ['comments']
}
</script>

<style lang='less' scoped>
.hm-comment {
  border-bottom: 1px solid #ccc;
  .top {
    height: 70px;
    display: flex;
    align-items: center;
    .left {
      margin-right: 10px;
      img {
        width: 50px;
        height: 50px;
        object-fit: cover;
        border: 1px solid blue;
        border-radius: 50%;
      }
    }
    .center {
      flex: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .preson {
        color: #000;
      }
      .time {
        color: red;
      }
    }
    .right {
      color: gray;
    }
  }
}
</style>