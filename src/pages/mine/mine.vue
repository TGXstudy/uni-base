<template>
	<view class="">
		<image :src=" '/static/imgs/icons/indexNavIcon/首页1.png' | imgUrl" mode="" @click="testStore"></image>
		我的
	</view>
</template>

<script>
	export default{
		name:"mine",
		methods:{
			testStore(){
				console.log("this.$store.getter.getAuth",this.$store.getters.getAuth);
			}
		}
	}
</script>

<style>
</style>
