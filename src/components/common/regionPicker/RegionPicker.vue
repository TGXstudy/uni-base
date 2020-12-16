<template>
	<view class="picker-wrapper">
		<!-- #ifdef MP-WEIXIN -->
		<picker mode="region" :custom-item="'请选择'" @change="getArea">
			<slot></slot>
		</picker>
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<picker mode="multiSelector" :range="region" range-key='name' :value='reginVal' @change="getRegion" @columnchange="bindColumnchange">
			<slot></slot>
		</picker>
		<!-- #endif -->
	</view>
</template>

<script>
	// #ifdef H5
	import region from './region.js'
	// #endif
	export default {
		data() {
			return {
				//#ifdef H5
				reginVal:[],
				region: [[{id:0,adcode:0,name:"请选择"}].concat(region.region), [{id:0,adcode:0,name:"请选择"}], [{id:0,adcode:0,name:"请选择"}]],
				//#endif
			}
		},
		
		
		methods: {
			

			//#ifdef MP-WEIXIN
			getArea(e) {
				console.log("选择地区", e.detail);
				if (e.detail.code.length <= 2 ) {
					this.$mUtils.toast("请选择地区");
				} else {

					let region = {
						province: {
							adcode: e.detail.code[0],
							text: e.detail.value[0]
						},
						city: {
							adcode: e.detail.code[1],
							text: e.detail.value[1]
						},
						county: {
							adcode: e.detail.code[2],
							text: e.detail.value[2]
						},
					}
					this.$emit("getRegion", region)

				}
			}
			//#endif
			//#ifdef H5
				bindColumnchange(e){
					let col = e.detail.column;
					let val = e.detail.value;

					if( col === 0 ){ //拨动第一列
					console.log(val);
						if(val > 0){
							//更新 第二列   第三列 的数据
							this.region[1]=[{id:0,adcode:0,name:"请选择"}].concat(region.region[val-1].next);
							this.region[2]=[{id:0,adcode:0,name:"请选择"}].concat(this.region[1][1].next);
						}
					}else if( col === 1 ){ //拨动第二列
					// console.log(val);
						if(val > 0){
							//更新 第三列 的数据
							this.region[2]=[{id:0,adcode:0,name:"请选择"}].concat(this.region[1][val].next);
						}
					}else{ //拨动第三列

					}

				},


				// 确认选怎区域
				getRegion(e){
					// let val=e.detail.value[1] || 0;
					let provinceIdx=e.detail.value[0] || 0;
					let cityIdx=e.detail.value[1] || 0;
					let countyIdx=e.detail.value[2] || 0;
					// console.log("选择地区",e.detail)

					if( provinceIdx == 0  || cityIdx ==0 || countyIdx == 0){
						this.$mUtils.toast("请选择地区");
					}else{
						let _province=this.region[0][provinceIdx],
							_city=this.region[1][cityIdx],
							_county=this.region[2][countyIdx]


						// console.log(_province,_city,_county);
						let region={
							province:{ adcode:_province.adcode,text:_province.name},
							city:{ adcode: _city.adcode,text:_city.name},
							county:{ adcode: _county.adcode || 0 ,text:_county.name},
						}
						this.$emit("getRegion",region)
					}
				},

			//#endif
		}
	}
</script>

<style lang="scss" scoped>
	.picker-wrapper {
		flex: 1;
		flex-shrink: 1;
		height: 100%;
		align-items: center;
		font-size: 28upx;

		picker {
			width: 100%;
			height: 100%;
			align-items: center;

		}
	}
</style>
