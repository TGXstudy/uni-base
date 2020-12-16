import Vue from 'vue'
import App from './App'
import Config from 'config/index.config.js'
import Router from "common/js/router.js"
import RouteConfig from "config/routes.config.js"
import Utils from "common/js/utils.js"
import Store from 'store/index.js'
import API from "api/index.js"; 
import * as filters from "filters/index.js"
Vue.config.productionTip = false

Vue.prototype.$mRouter=Router;
Vue.prototype.$mRoutesConfig=RouteConfig;
Vue.prototype.$mUtils=Utils;
Vue.prototype.$store=Store;
Vue.prototype.$api=API

Object.keys(filters).forEach(key=>{
	Vue.filter(key,filters[key])
})

App.mpType = 'app'
// console.log("ConfigConfigConfig",Config,process.env.NODE_ENV,process.env)
Router.beforeEach((navType, to) => {
	// console.log("路由守卫",navType, to,)
	if (to.route === undefined) throw ("路由钩子函数中没有找到to.route对象，路由信息:" + JSON.stringify(to));

	// 过滤需要权限的页面
	if (to.route.requiresAuth) {
		console.log("过滤需要权限的页面");
		if (store.getters.hasLogin) {
			
			console.log("已经登录");
			// 已经登录
			uni[navType]({
				url: Utils.objParseUrlAndParam(to.route.path, to.query)
			})
		} else {
			// 登录成功后的重定向地址和参数objParseParam
		console.log(to.query)
			let query = {
				redirectUrl: to.route.path,
				query:JSON.stringify(to.query)
			}
			
			console.log("没有登录,登录成功后的重定向地址和参数",$mRoutesConfig.login.path,query);
			uni.navigateTo({
				url: Utils.objParseUrlAndParam($mRoutesConfig.login.path, query)
			})
			
		}
	} else {
		uni[navType]({
			url: Utils.objParseUrlAndParam(to.route.path, to.query)
		})
	}
})

const app = new Vue({
    ...App
})
app.$mount()
