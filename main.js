import Vue from 'vue'
import App from './App'
App.mpType = 'app'
import store from './utils/store.js'
Vue.prototype.$store = store
Vue.mixin({
	data() {
		return {
			scrollTopM: 0,
			autoplayM: true,
			uniColorPrimary: '#1890FF'
		}
	},
	onShow() {
		this.autoplayM = true
	},
	onPageScroll(Object) {
		this.scrollTopM = Object.scrollTop
	},
	onHide() {
		this.autoplayM = false
	},
	onUnload() {
		
	},
	methods:{
		
	}
});
const app = new Vue({
	...App,
	store
})
app.$mount()
