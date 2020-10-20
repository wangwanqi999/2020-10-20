<template>
  <div>
    <!-- 头部 -->
    <hm-header>个人中心</hm-header>
    <!-- 信息 -->
    <div class="info">
      <div class="left">
        <img :src="$axios.defaults.baseURL + info.head_img" alt="" />
      </div>
      <div class="center">
        <div class="nickname">
          <i v-if="info.gender === 1" class="iconfont iconxingbienan"></i>
          <i v-else class="iconfont iconxingbienv"></i> {{ info.nickname }}
        </div>
        <div class="date">{{ info.create_date | date }}</div>
      </div>
    </div>
    <!-- 列表部分 -->
    <van-cell-group>
      <van-cell
        @click="$router.push('my-follow')"
        title="我的关注"
        is-link
        value="关注的用户"
      />
      <van-cell
        @click="$router.push('/my-comment')"
        title="我的跟帖"
        is-link
        value="跟帖/回复"
      />
      <van-cell
        @click="$router.push('/my-star')"
        title="我的收藏"
        is-link
        value="文档/视频"
      />
      <van-cell title="设置" is-link @click="$router.push('/edit')" />
      <van-cell title="退出" is-link @click="logout" />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {},
    }
  },

  async created() {
    // 获取token
    let token = localStorage.getItem('token')
    let user_id = localStorage.getItem('user_id')

    // 请求1
    let res = await this.$axios.get(`/user/${user_id}`)
    console.log('获取用户详情', res.data)
    const { statusCode, data, message } = res.data

    if (statusCode === 200) {
      // 保存
      this.info = data
    } else {
      this.$toast.fail(message)
    }

    // // 请求2
    // this.$axios.get(`/user/${user_id}`,{
    //   headers : {
    //     Authorization : token
    //   }
    // }).then(res => {
    //   console.log('获取用户详情',res.data);
    //   const { statusCode, data, message } = res.data

    //   if (statusCode === 200) {

    //     // 保存
    //     this.info = data

    //   } else {
    //      this.$toast.fail(message)
    //   }
    // })
  },
  methods: {
    // 退出
    async logout() {
      try {
        // 弹框
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '您确定要退出账户吗?',
        })

        console.log('确定')
        //1. 删除token + user_id
        localStorage.removeItem('token')
        localStorage.removeItem('user_id')
        //2. 提示退出功能
        this.$toast.success('退出成功')
        //3. 跳转到login
        this.$router.push('/login')
      } catch (error) {
        console.log('取消')
      }

      //   .then(() => {
      // console.log('确定')
      // //1. 删除token + user_id
      // localStorage.removeItem('token')
      // localStorage.removeItem('user_id')
      // //2. 提示退出功能
      // this.$toast.success('退出成功')
      // //3. 跳转到login
      // this.$router.push('/login')
      //   })
      //   .catch(() => {
      //     console.log('取消')
      //   })
    },
  },
}
</script>

<style scoped lang="less">
.info {
  height: 100px;
  border-bottom: 2px solid #cccccc;

  display: flex;
  padding: 0 20px;
  align-items: center;

  .left {
    img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      object-fit: cover;
    }
  }
  .center {
    flex: 1;
    padding-left: 20px;
    height: 50px;
    line-height: 25px;
    font-size: 14px;
    .name {
      color: #000;
    }
  }
}
</style>
