<template>
  <div>
    <!-- 头部 -->
    <hm-header>注册</hm-header>
    <!-- logo -->
    <hm-logo></hm-logo>
    <!-- 输入框 -->
    <van-field
      v-model="username"
      required
      label="用户名"
      placeholder="请输入用户名"
      clearable
      :error-message="usernameErrMsg"
      @input="checkUsername"
      @clear="clearUserName"
    />
    <van-field
      v-model="nickname"
      required
      label="昵称"
      placeholder="请输入昵称"
      clearable
      :error-message="nicknameErrMsg"
      @input="checkNickname"
      @clear="clearNickname"
    />
    <van-field
      v-model="password"
      required
      label="密码"
      placeholder="请输入密码"
      clearable
      :error-message="passwordErrMsg"
      @input="checkPassword"
      @clear="clearPassword"
    />
    <!-- 按钮 -->
    <hm-button @click.native="startRegister">注册</hm-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '111105', // 用户名   10086
      nickname: '哈哈哈', // 昵称     雄霸
      password: '123', // 密码     123
      usernameErrMsg: '', // 用户名校验
      nicknameErrMsg: '', // 昵称校验
      passwordErrMsg: '', // 密码校验
    }
  },
  methods: {
    // 监听用户名
    checkUsername() {
      const reg = /^1\d{3,5}$/
      if (reg.test(this.username)) {
        this.usernameErrMsg = ''
      } else {
        this.usernameErrMsg = '用户名格式不正确'
      }
    },
    clearUserName() {
      this.usernameErrMsg = ''
    },
    // 监听昵称
    checkNickname() {
      const reg = /^[\u4e00-\u9fa5]{3,7}$/
      if (reg.test(this.nickname)) {
        this.nicknameErrMsg = ''
      } else {
        this.nicknameErrMsg = '昵称格式不正确'
      }
    },
    clearNickname() {
      this.nicknameErrMsg = ''
    },
    // 校验密码
    checkPassword() {
      const reg = /^\d{3,12}$/
      if (reg.test(this.password)) {
        this.passwordErrMsg = ''
      } else {
        this.passwordErrMsg = '密码格式不正确'
      }
    },
    clearPassword() {
      this.passwordErrMsg = ''
    },
    // 点击注册
    async startRegister() {
      if (
        this.username !== '' &&
        this.nickname !== '' &&
        this.password !== '' &&
        this.usernameErrMsg == '' &&
        this.nicknameErrMsg == '' &&
        this.passwordErrMsg == ''
      ) {
        this.$toast.success('校验成功')
        // axios.post(url,data,config)
        let res = await this.$axios.post('http://localhost:3000/register', {
          username: this.username,
          nickname: this.nickname,
          password: this.password,
        })
        console.log('注册结果', res.data)

        const { message, statusCode } = res.data

        if (statusCode === 200) {
          //1. 提示
          this.$toast.success(message)
          //2. 跳转到login
          // this.$router.push({
          //   path: '/login',
          //   query: {
          //     username: this.username,
          //     password: this.password,
          //   },
          // })
          this.$router.push({
            name: 'login',
            params: {
              username: this.username,
              password: this.password,
            },
          })
        } else {
          this.$toast.fail(message)
        }
      } else {
        this.$toast.fail('校验失败')
      }
    },
  },
}
</script>

<style scoped></style>
