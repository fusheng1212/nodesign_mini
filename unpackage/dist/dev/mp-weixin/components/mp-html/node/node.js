(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/mp-html/node/node"],{203:function(t,n,e){"use strict";e.r(n);var r=e(204),i=e(206);for(var o in i)["default"].indexOf(o)<0&&function(t){e.d(n,t,(function(){return i[t]}))}(o);e(208);var s,a=e(32),c=e(210),u=Object(a["default"])(i["default"],r["render"],r["staticRenderFns"],!1,null,"1d2f0fca",null,!1,r["components"],s);"function"===typeof c["default"]&&Object(c["default"])(u),u.options.__file="components/mp-html/node/node.vue",n["default"]=u.exports},204:function(t,n,e){"use strict";e.r(n);var r=e(205);e.d(n,"render",(function(){return r["render"]})),e.d(n,"staticRenderFns",(function(){return r["staticRenderFns"]})),e.d(n,"recyclableRender",(function(){return r["recyclableRender"]})),e.d(n,"components",(function(){return r["components"]}))},205:function(t,n,e){"use strict";var r;e.r(n),e.d(n,"render",(function(){return i})),e.d(n,"staticRenderFns",(function(){return s})),e.d(n,"recyclableRender",(function(){return o})),e.d(n,"components",(function(){return r}));var i=function(){var t=this,n=t.$createElement;t._self._c},o=!1,s=[];i._withStripped=!0},206:function(t,n,e){"use strict";e.r(n);var r=e(207),i=e.n(r);for(var o in r)["default"].indexOf(o)<0&&function(t){e.d(n,t,(function(){return r[t]}))}(o);n["default"]=i.a},207:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=function(){Promise.resolve().then(function(){return resolve(e(203))}.bind(null,e)).catch(e.oe)},i={name:"node",options:{virtualHost:!0},data:function(){return{ctrl:{}}},props:{name:String,attrs:{type:Object,default:function(){return{}}},childs:Array,opts:Array},components:{node:r},mounted:function(){var t=this;this.$nextTick((function(){for(t.root=t.$parent;"mp-html"!==t.root.$options.name;t.root=t.root.$parent);}))},beforeDestroy:function(){},methods:{toJSON:function(){},play:function(n){if(this.root.pauseVideo){for(var e=!1,r=n.target.id,i=this.root._videos.length;i--;)this.root._videos[i].id===r?e=!0:this.root._videos[i].pause();if(!e){var o=t.createVideoContext(r,this);o.id=r,this.root._videos.push(o)}}},imgTap:function(n){var e=this.childs[n.currentTarget.dataset.i];e.a?this.linkTap(e.a):e.attrs.ignore||(this.root.$emit("imgtap",e.attrs),this.root.previewImg&&t.previewImage({current:parseInt(e.attrs.i),urls:this.root.imgList}))},imgLongTap:function(t){},imgLoad:function(t){var n=t.currentTarget.dataset.i;this.childs[n].w?(this.opts[1]&&!this.ctrl[n]||-1===this.ctrl[n])&&this.$set(this.ctrl,n,1):this.$set(this.ctrl,n,t.detail.width)},linkTap:function(n){var e=n.currentTarget?this.childs[n.currentTarget.dataset.i]:{},r=e.attrs||n,i=r.href;this.root.$emit("linktap",Object.assign({innerText:this.root.getText(e.children||[])},r)),i&&("#"===i[0]?this.root.navigateTo(i.substring(1)).catch((function(){})):i.split("?")[0].includes("://")?this.root.copyLink&&t.setClipboardData({data:i,success:function(){return t.showToast({title:"链接已复制"})}}):t.navigateTo({url:i,fail:function(){t.switchTab({url:i,fail:function(){}})}}))},mediaError:function(t){var n=t.currentTarget.dataset.i,e=this.childs[n];if("video"===e.name||"audio"===e.name){var r=(this.ctrl[n]||0)+1;if(r>e.src.length&&(r=0),r<e.src.length)return void this.$set(this.ctrl,n,r)}else"img"===e.name&&this.opts[2]&&this.$set(this.ctrl,n,-1);this.root&&this.root.$emit("error",{source:e.name,attrs:e.attrs,errMsg:t.detail.errMsg})}}};n.default=i}).call(this,e(2)["default"])},208:function(t,n,e){"use strict";e.r(n);var r=e(209),i=e.n(r);for(var o in r)["default"].indexOf(o)<0&&function(t){e.d(n,t,(function(){return r[t]}))}(o);n["default"]=i.a},209:function(t,n,e){},210:function(t,n,e){"use strict";e.r(n);var r=e(211);n["default"]=r["default"]},211:function(t,n,e){"use strict";e.r(n),n["default"]=function(t){t.options.wxsCallMethods||(t.options.wxsCallMethods=[])}}}]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/components/mp-html/node/node.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/mp-html/node/node-create-component',
    {
        'components/mp-html/node/node-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('2')['createComponent'](__webpack_require__(203))
        })
    },
    [['components/mp-html/node/node-create-component']]
]);
