<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area  theme-bg-cl" @click="goPage"  >
			<text class=" fn-cl-theme">{{title}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
			goPage(){
				/* this.$api.getIndexData({
					data:{
						name:'liu'
					}
				}) */
				this.$mUtils.toast('即将跳转 -我的- 页面',true).then(()=>{
					/* this.$mRouter.push({
						route:this.$mRouteConfig.mine
					}) */
					this.$mRouter.switchTab({
						route:this.$mRouteConfig.mine
					})
				})
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
