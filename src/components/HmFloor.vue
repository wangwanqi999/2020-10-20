
<template>
  <!-- 递归组件 -->
  <div class="bg">
    <hm-floor
      v-if="parent.parent"
      :parent='parent.parent'
    ></hm-floor>
    <div
      class="hm-floor"
      :class="{borderTop:!parent.parent}"
    >
      <!-- 设置楼层样式 -->
      <div class="top">
        <div class="left">{{count}} , 王万琦</div>
        <div class="center">2020-10-10</div>
        <div class="right">回复</div>
      </div>
      <div class="bottom line1">{{parent.content}}</div>

    </div>
  </div>

</template>

<script>
export default {
  props: ['parent'],
  //   组件传值
  data () {
    return {
      count: ''
    }
  },
  created () {
    this.count = this.getCount(1, this.parent)
    console.log(this.count);
  }
  , methods: {
    //   1.计算楼层
    getCount (num, obj) {
      if (!obj.parent) {
        console.log('最后一层', num);
        return num
      }
      console.log('楼层', num);
      return this.getCount(num + 1, obj.parent)


    }
  }
}
</script>

<style lang='less' scoped>
.hm-floor {
  background: gray;
  border: 1px solid red;
  border-top: none;
  &.borderTop {
    border-top: 4px solid blue;
  }
  .top {
    margin: 0px 10px;
    height: 30px;
    line-height: 30px;
    display: flex;
    .left {
      color: #000;
    }
    .center {
      flex: 1;
    }
    .right {
      color: green;
    }
  }
  .bottom {
    margin: 0px 10px;
    height: 30px;
    line-height: 30px;
  }
}
</style>