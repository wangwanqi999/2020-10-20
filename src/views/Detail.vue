<template>
  <div>
    <!-- 头部 -->
    <div class="header">
      <div
        class="left"
        @click="$router.back()"
      >
        <i class="iconfont iconjiantou2"></i>
      </div>
      <div class="center">
        <i class="iconfont iconnew"></i>
      </div>
      <div class="right">
        <div
          @click="unfollow"
          v-if="detail.has_follow"
          class="follow"
        >
          已关注
        </div>
        <div
          @click="follow()"
          v-else
          class="follow"
        >关注</div>
      </div>
    </div>
    <!-- 内容 -->
    <div class="container">
      <div class="title line2">
        性感女歌手拉啊啦性感手拉啊啊啦性感女歌手拉啊啊啦
      </div>
      <div class="name">
        <span>新华网</span>
        <span>2019-10-10</span>
      </div>
      <!-- 内容部分 -->
      <!-- 1. 文本内容 (图片 + 文字) -->
      <div
        v-if="detail.type == 1"
        class="content"
        v-html="detail.content"
      ></div>
      <!-- 2. 视频 -->
      <video
        v-else
        :src="detail.content"
        controls
      ></video>
      <!-- 点赞 -->
      <div class="bottom">
        <div
          @click="like"
          class="like"
          :class="{ active: detail.has_like }"
        >
          <i class="iconfont icondianzan"></i>
          <i>{{ detail.like_length }}</i>
        </div>
      </div>
      <!-- comment功能 -->
      <div class="comments">
        <!-- 创建组件 -->
        <hm-comment
          :comments='item'
          v-for="item in comments"
          :key="item.id"
        > </hm-comment>

      </div>
      <!-- 底部组件 -->
      <div class="send">
        <!-- input  -->

        <div
          class="ipt"
          v-if="!isShow"
        >
          <input
            @focus="showTextArea"
            type="text"
            value="我是评论"
            ref="input"
          >
          <van-icon
            name="chat-o"
            badge="99+"
          />
          <van-icon name="star-o" />
        </div>
        <!-- text  -->
        <div
          class="textarea"
          v-if='isShow'
        >
          <keep-alive> <textarea
              id=""
              ref="area"
              @blur="hideArea"
            ></textarea></keep-alive>
          <div class="right">发送</div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      detail: {}, // 详情页信息
      comments: [], //评论信息 
      isShow: false
    }
  },
  created () {
    this.getDetail()
    this.getComments()
  },
  methods: {
    // 获取详情页信息
    async getDetail () {
      let res = await this.$axios.get(`/post/${this.$route.params.id}`)
      this.detail = res.data.data
    },
    // 取消关注
    async unfollow () {
      //1. 请求
      let res = await this.$axios.get(`/user_unfollow/${this.detail.user.id}`)

      console.log('取消关注', res)
      //2. 提示
      this.$toast.success(res.data.message)

      //3. 重新获取
      this.getDetail()
    },
    // 关注
    async follow () {
      let token = localStorage.getItem('token')
      if (!token) {
        this.$toast('请先登录')
        // this.$router.push('/login')
        this.$router.push({
          name: 'login',
          params: {
            back: true,
          },
        })
        return
      }

      // 注意 , 当前的id 不是文章id,而是 用户id
      //1. 请求
      let res = await this.$axios.get(`/user_follows/${this.detail.user.id}`)

      console.log('关注', res)
      const { message, statusCode } = res.data
      if (statusCode === 200) {
        //2. 提示
        this.$toast.success(message)

        //3. 重新获取
        this.getDetail()
      }
    },
    // 点赞
    async like () {
      let token = localStorage.getItem('token')
      if (!token) {
        this.$toast('请登录')
        this.$router.push({
          name: 'login',
          params: {
            back: true,
          },
        })

        return
      }

      // 请求
      let res = await this.$axios.get(`/post_like/${this.detail.id}`)
      console.log('点赞', res.data)
      // 提示
      this.$toast.success(res.data.message)
      // 重新 加载
      this.getDetail()
    },
    async getComments () {
      const res = await this.$axios.get(`/post_comment/${this.$route.params.id}`)
      const { data, statusCode } = res.data
      if (statusCode == 200) {
        this.comments = data
        console.log(this.comments);
      }
    },
    // 显示textareae
    showTextArea () {
      this.isShow = true
      this.$nextTick(() => {
        // 获取dom元素 dom元素显示是异步进行的
        this.$refs.area.focus()
      })
    },
    // 失去焦点隐藏
    hideArea () {
      this.isShow = false

    }
  },
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  height: 50px;
  border-bottom: 1px solid #ccc;
  align-items: center;
  .left {
    width: 40px;
    text-align: center;
    i {
      font-size: 20px;
    }
  }
  .center {
    flex: 1;
    padding-left: 10px;
    i {
      font-size: 50px;
    }
  }
  .right {
    width: 80px;
    // background: pink;
    .follow {
      border: 1px solid #666;
      width: 60px;
      height: 24px;
      text-align: center;
      line-height: 26px;
      border-radius: 12px;
    }
  }
}

.container {
  padding: 10px;
  .title {
    font-size: 20px;
    font-weight: 700;
    margin: 10px 0;
  }
  .name {
    color: #999;
    span {
      margin-right: 20px;
    }
  }
  .content {
    margin-top: 20px;
  }
}

/deep/ img {
  width: 100%;
}

video {
  width: 100%;
  margin-top: 10px;
}

// 点赞
.bottom {
  display: flex;
  justify-content: flex-end;
  margin: 10px 0;
  .like {
    height: 30px;
    width: 80px;
    border: 1px solid #000;
    line-height: 30px;
    text-align: center;
    border-radius: 15px;
    i {
      margin: 0 5px;
    }
  }
  .like.active {
    border: 1px solid #f00;
    i {
      color: red;
    }
  }
}
// 评论容器
.comments {
  border-top: 3px solid gray;
}
// 底部评论功能
.send {
  position: fixed;
  bottom: 0px;
  width: 100%;
  background-color: blueviolet;
  // 输入
  .ipt {
    height: 40px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    input {
      height: 20px;
      line-height: 20px;
      border-radius: 10px;
      border: none;
      background-color: #ccc;
    }
    .van-icon {
      font-size: 30px;
    }
  }
  // 输出
  .textarea {
    padding: 5px 10px;
    height: 100px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    textarea {
      width: 200px;
      flex: 1;
      height: 50px;
      border: 1px solid #000;
      border-radius: 4px;
    }
    div {
      margin: 0px 10px;
      width: 70px;
      height: 30px;
      line-height: 30px;
      border: 1px solid blue;
      font-size: 20px;
      line-height: 30px;
      font-family: kaiti;
      background-color: yellow;
      border-radius: 15px;
      text-align: center;
    }
  }
}
</style>
