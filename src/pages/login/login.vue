<template>
	<!-- 登录 -->
	<view class="container">
		<view class="fn-sz-30">伙拼乐购申请</view>
		<view class="fn-sz-30">获取你的昵称、头像、地区及性别</view>
		<button class="login-btn fn-sz-30 fn-cl-fff" open-type="getUserInfo" @getuserinfo="doLogin">登录</button>
	</view>
</template>

<script>
	export default {
		onLoad() {
			console.log(this.$store.getters.getToken)
		},
		//微信授权登录 wxlogin
		methods: {
			doLogin() {
				let self = this;
				uni.getSetting({
					success(res) {
						if (res.authSetting['scope.userInfo'] === undefined) {
							self.wxLogin()
						} else if (res.authSetting['scope.userInfo'] === false) {
							uni.showModal({
								title: "提示",
								content: "99供货申请获得你的公开信息",
								showCancel: false,
								success(res) {
									if (res.confirm) {
										self.openAuthSetting()
									}
								}
							})
						} else if (res.authSetting['scope.userInfo'] === true) {
							self.wxLogin()
						}
					}
				})
			},
			openAuthSetting() {
				let self = this;
				uni.openSetting({
					success(res) {
						console.log("success", res);
						self.doLogin()
					},
					fail(res) {
						console.log("fail", res);
					}
				})
			},
			//
			wxLogin() {
				let self = this;
				uni.login({
					provider: 'weixin',
					success(res) {
						let code = res.code
						uni.getUserInfo({
							provider: "weixin",
							success(res) {
								//授权登录接口
								console.log("授权登录接口",res,code)
								let data={
									code,
									signature:res.signature,
									rawData:res.rawData,
									encryptedData:res.encryptedData,	
									iv:res.iv
								}
								self.handleLogin(data);
							},
							fail(res) {
								console.log("获取用户信息拒绝fail");
							}
						})

					}
				})
			},
			//授权登录接口
			handleLogin(data){
				this.$api.wxlogin(data).then(res=>{
					console.log("授权登录接口",res)
					if(res.code == 200){
						this.$store.commit("SET_TOKEN",res.data.authorization)
						this.$store.commit("SET_HASLOGIN",true)
						console.log(this.$store.getters.getToken)
							
						this.checkTel();
						//获取用户信息 childCode 
						this.getUserInfo()
						
					}else{
						this.$mUtils.toast(res.msg)
					}
				})
				
			},
			//是否绑定了手机号 
			checkTel(){
				this.$api.checkTel().then(res=>{
					console.log("是否绑定了手机号",res)
					if(res.code == 200){
						this.$mRouter.back()
					}else if(res.code == 210){
						this.$mRouter.redirectTo({
							route:this.$mRoutesConfig.bindTel
						})
					}else{
						this.$mUtils.toast(res.msg)
					}
				})
			},
			//获取用户信息 childCode  
			getUserInfo(){
				this.$api.getUserInfo().then(res=>{
					if(res.code == 200){
						this.$store.commit("SET_CHILDCODE",res.data.child_code);
						this.$store.commit("SET_USERINFO",res.data);
					}
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.container {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.login-btn {
			margin-top: 40upx;
			//#ifdef MP-WEIXIN
			background-color: $theme-orange;
			//#endif
			//#ifdef H5
			background-color: var(--theme-orange);
			//#endif
			width: 560upx;
			height: 80upx;
			line-height: 80upx;
			border-radius: 40upx;

		}
	}
</style>
