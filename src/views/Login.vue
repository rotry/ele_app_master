<template>
	<div class="login">
		<div class="logo">
			<img src="../assets/logo.jpg" alt="">
		</div>
		<InputGroup type="text"
		            v-model="username"
		            placeholder="用户名"
		            :error="errors.username"/>
		<InputGroup type="password"
		            v-model="password"
		            placeholder="密码"
		            :error="errors.password"/>
		<InputGroup type="text"
		            v-model="verifyCode"
		            placeholder="验证码"
		            :imgCode="imgCode"
		            :error="errors.code"
		            @btnClick="getVerifyCode"/>


		<!--		用户服务协议-->
		<div class="login_des">
			<p>
				新用户登陆即自动注册，表示已同意
				<span>《用户服务协议》</span>
			</p>
		</div>
		<!--		登录按钮-->
		<div class="login_btn">
			<button :disabled="isClick" @click="login">登录</button>
		</div>
	</div>

</template>

<script>
import fetch from "../utils/fetch";

export default {
	name: "Login",
	components: {
		InputGroup: () => import('../components/InputGroup')
	},
	data() {
		return {
			username: '',
			verifyCode: '',
			errors: {},
			password: '',
			imgCode: ''
		}
	},
	mounted() {
		//发送网络请求
		this.getVerifyCode();

	},
	computed: {
		isClick() {
			return !this.verifyCode || !this.username || !this.password;
		}
	},
	methods: {
		// 获取验证码
		getVerifyCode() {
			/*this.$axios.post('/v1/captchas').then(res => {
				this.imgCode = res.code;
			});*/
			fetch('/v1/captchas', {}, 'POST').then(res => {
				this.imgCode = res.code;
			})
		},
		/**
		 * 验证用户名
		 * @returns {boolean}
		 */
		validateUser() {
			// 验证手机号码
			if (!this.username) {
				this.errors = {
					username: '用户名不能为空'
				};
				return false;
			} else {
				this.errors = {};
				return true;
			}
		},
		/**
		 * 验证密码
		 */
		validatePassword() {
			if (!this.password) {
				this.errors = {
					password: '密码不能为空'
				};
				return false;
			} else {
				this.errors = {};
				return true;
			}
		},
		/**
		 * 登录功能
		 */
		/**
		 * 验证验证码功能
		 * @returns {boolean}
		 */
		validateCode() {
			if (!this.verifyCode) {
				this.errors = {
					code: '验证码不能为空'
				};
				return false;
			} else {
				this.errors = {};
				return true;
			}
		},
		login() {
			this.errors = {};// 取消错误提示
			if (!this.validateUser()) {
				return false;
			} else if (!this.validatePassword()) {
				return false;
			} else if (!this.validateCode()) {
				return false
			}
			// 登录 发送请求
			/*this.$axios.post('v2/login',{
				username:this.phone,
				password:this.password,
				captcha_code:this.verifyCode
			}).then(res => {
				console.log(res)
			});*/
			fetch('/v2/login', {
				username: this.username,
				password: this.password,
				captcha_code: this.verifyCode
			}, 'POST').then(res => {
				if (res.user_id) { // 登录成功
					// 设置登陆状态
					localStorage.setItem('user_id',res.user_id);
					this.$router.push('/');
				} else if (res.status === 0) {
					// 错误类型
					let {type} = res
					// 登陆失败 获取错误信息
					let {message} = res;
					console.log(type, message)
					if (type === 'ERROR_CAPTCHA') {
						this.getVerifyCode();
						this.errors = {
							code: message
						};

					}
					return false;
				}
			})

		}
	}


}
</script>

<style scoped>
.login {
	width: 100%;
	height: 100%;
	padding: 30px;
	box-sizing: border-box;
	background: #fff;
	text-align: center;

}

.logo {
	text-align: center;

}

.logo img {
	width: 150px;
}

.text_group,
.login_des,
.login_btn {
	margin-top: 20px;
}

.login_des {
	color: #aaa;
	line-height: 22px;
}

.login_des span {
	color: #4d90fe;
}

.login_btn button {
	width: 100%;
	height: 40px;
	background-color: #48ca38;
	border-radius: 4px;
	color: white;
	font-size: 14px;
	border: none;
	outline: none;
}

.login_btn button[disabled] {
	background-color: #8bda81;
}
</style>
