import $mUtils from '@/common/js/utils.js'
import $store from "@/store/index.js"
import $mConfig from "@/config/index.config.js"
import {
	Base64
} from 'js-base64'
import sha1 from 'js-sha1'
import Vue from 'vue'

let vue = new Vue()

const http = {}
/* 
params:{
	id:1
} 
*/
http.post = (url, params = {}, hideLoading = false) => {

	let userAgent = process.env.VUE_APP_PLATFORM,
		dataObj = params|| {};
	let appId = 'market',
		projectName = 'market',
		randStr = $mUtils.getRandStr(5),
		timestamp = $mUtils.getCurTime(),
		signature = sha1(sha1(timestamp + randStr) + appId),
		obj = {
			"header": {
				"signature": signature,
				"timestamp": timestamp,
				"nonce": randStr,
				"project": projectName,
				"user_agent": userAgent,
				"token": ''
			},
			"data": dataObj
		}
	// console.log(obj, process.env)
	let finalData = Base64.encode(JSON.stringify(obj))
	let arr = []
	arr.push(finalData)
	arr.push(appId)
	let baseData = Base64.encode(JSON.stringify(arr))
	let opt = {
		url: $mConfig.baseUrl + url,
		data: baseData,
		method: "POST",
		header: {
			"X-Requested-With": "XMLHttpRequest",
			"Content-Type": "application/json; charset=UTF-8",
			"Authorization": $store.getters.getAuth,
		},
		dataType: "json"
	}
	// console.log("请求参数",baseData);
	console.log({
		"设备代理": userAgent,
		"请求地址": opt.url,
		"请求头": opt.header,
		"请求参数": dataObj,
		"环境": process.env,
	});

	//接口请求
	if (!hideLoading) {
		uni.showLoading({
			mask: true,
			title: '请稍候...',
		})
	}
	return new Promise((reslove, reject) => {
		uni.request(opt).then(res => {
			!hideLoading && uni.hideLoading()

			let response = res[1].data;
			//根据响应code,做处理 
			if (response.code === 1003 || res.code === 1002) { //token失效，刷新token
				console.log("值", response.data)
				console.log("响应code", response.code, response)
			} else {
				reslove(response)
			}

		}).catch(err => {
			if (!hideLoading) {
				$mUtils.toast("网络不给力，请稍后再试~")
				//uni.hideLoading()
			}
			reject(err)
		})
	})

}
http.upload = (url, filePath, filename, hideLoading) => {
	//接口请求
	if (!hideLoading) {
		uni.showLoading({
			mask: true,
			title: '请稍候...',
		})
	}
	return new Promise((reslove, reject) => {

		uni.uploadFile({
			url:$mConfig.baseUrl + url, //仅为示例，非真实的接口地址
			filePath: filePath,
			name: filename,
			header: {
				"Authorization": $store.getters.getAuth
			},
			success: function(res) {
				!hideLoading && uni.hideLoading()
				reslove(res)
			},
			fail: function(error) {
				reject(error)
			}

		})
	}).catch(err => {
		if (!hideLoading) {
			$mUtils.toast("网络不给力，请稍后再试~")
			uni.hideLoading()
		}
		reject(err)
	})

}

export default http
