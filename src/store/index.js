import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

const hasLogin = uni.getStorageSync("hasLogin") || false;
const auth = uni.getStorageSync("auth") || ""
const store = new Vuex.Store({
	state: {
		hasLogin,
		auth
	},
	getters: {
		getAuth(state){
			return state.auth;
		},
	},
	mutations: {
		/* SET_AUTH(state,auth){
			state.auth = auth;
			uni.setStorageSync("auth", auth)
		}, */
	},
	actions: {
		/* setAuth({
			commit
		},auth) {
			commit("SET_AUTH", auth);
		}, */
		
	}
})

export default store
