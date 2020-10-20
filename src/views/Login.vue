<template>
  <div>
    <!-- 头部 -->
    <hm-header>登录</hm-header>
    <!-- logo -->
    <hm-logo></hm-logo>

    <!-- 输入框 -->
    <van-field
      v-model="username"
      required
      label="用户名"
      placeholder="请输入用户名"
      :error-message="usernameErrMsg"
      clearable
      @input="checkUsername"
      @clear="clearUsername"
    />
    <van-field
      v-model="password"
      required
      label="密码"
      placeholder="请输入密码"
      :error-message="passwordErrMsg"
      clearable
      @input="checkPassword"
      @clear="clearPassword"
    />

    <!-- 按钮 -->
    <hm-button @click.native="startLogin">登录</hm-button>

    <!-- 如果没有登录 -->
    <div class="link">
      如果没有账号,请点击 <router-link to="/register">注册</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '10086', // 用户名
      password: '123', // 密码
      usernameErrMsg: '', // 用户名校验信息
      passwordErrMsg: '', // 密码校验信息
    }
  },
  created() {
    console.log(this.$route)
    // 方法1
    // const { username, password } = this.$route.query
    const { username, password } = this.$route.params

    if (username && password) {
      this.username = username
      this.password = password
    }
  },
  methods: {
    // 校验用户名
    checkUsername() {
      const reg = /^1\d{3,5}$/
      if (reg.test(this.username)) {
        this.usernameErrMsg = ''
      } else {
        this.usernameErrMsg = '用户名格式不正确'
      }
    },
    // 清除用户名
    clearUsername() {
      this.usernameErrMsg = ''
    },
    // 校验 密码
    checkPassword() {
      const reg = /^\d{3,12}$/
      if (reg.test(this.password)) {
        this.passwordErrMsg = ''
      } else {
        this.passwordErrMsg = '密码格式不正确'
      }
    },
    // 清除密码
    clearPassword() {
      this.passwordErrMsg = ''
    },
    // 开始登录
    async startLogin() {
      try {
        await this.$dialog.confirm({
          title: '提示',
          message: '登录吗?',
        })

        console.log('确定')

        let res = await this.$axios.post('/login', {
          username: this.username,
          password: this.password,
        })

        console.log('登录结果', res)
        const { statusCode, message, data } = res.data

        // 1. 保存token + 用户id
        localStorage.setItem('token', data.token)
        localStorage.setItem('user_id', data.user.id)

        // 2. 提示
        this.$toast.success(message)

        // 3. 跳转
        if (this.$route.params.back) {
          // 3.1 登录完返回   /detail ==> /login
          this.$router.back()
        } else {
          // 3.2 登录去/user  直接访问的/login => /user
          this.$router.push('/user')
        }
      } catch (error) {
        console.log('取消')
      }
    },
    async startLogin1() {
      // 有值 + 正确
      if (
        this.username !== '' &&
        this.password !== '' &&
        this.usernameErrMsg === '' &&
        this.passwordErrMsg === ''
      ) {
        let res = await this.$axios.post('/login', {
          username: this.username,
          password: this.password,
        })
        console.log('登录结果', res)
        const { statusCode, message, data } = res.data

        if (statusCode === 200) {
          // 1. 保存token + 用户id
          localStorage.setItem('token', data.token)
          localStorage.setItem('user_id', data.user.id)

          // 2. 提示
          this.$toast.success(message)

          // 3. 跳转  /user
          this.$router.push('/user')
        } else {
          this.$toast.fail(message)
        }
      } else {
        this.$toast.loading('校验失败')
      }
    },
  },
}
</script>

<style lang="less" scoped>
h1 {
  color: red;
}

.link {
  text-align: right;
  padding-right: 20px;
  font-size: 14px;
}
</style>
