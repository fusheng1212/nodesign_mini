(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/uni-nav-bar/uni-nav-bar"],{166:function(e,n,t){"use strict";t.r(n);var r=t(167),o=t(169);for(var i in o)["default"].indexOf(i)<0&&function(e){t.d(n,e,(function(){return o[e]}))}(i);t(171);var u,a=t(32),c=Object(a["default"])(o["default"],r["render"],r["staticRenderFns"],!1,null,"4afea59e",null,!1,r["components"],u);c.options.__file="components/uni-nav-bar/uni-nav-bar.vue",n["default"]=c.exports},167:function(e,n,t){"use strict";t.r(n);var r=t(168);t.d(n,"render",(function(){return r["render"]})),t.d(n,"staticRenderFns",(function(){return r["staticRenderFns"]})),t.d(n,"recyclableRender",(function(){return r["recyclableRender"]})),t.d(n,"components",(function(){return r["components"]}))},168:function(e,n,t){"use strict";var r;t.r(n),t.d(n,"render",(function(){return o})),t.d(n,"staticRenderFns",(function(){return u})),t.d(n,"recyclableRender",(function(){return i})),t.d(n,"components",(function(){return r}));try{r={uniIcons:function(){return Promise.all([t.e("common/vendor"),t.e("components/uni-icons/uni-icons")]).then(t.bind(null,180))}}}catch(a){if(-1===a.message.indexOf("Cannot find module")||-1===a.message.indexOf(".vue"))throw a;console.error(a.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var o=function(){var e=this,n=e.$createElement,t=(e._self._c,1==e.contentType||"none"!=e.leftIcon?e.leftText.length:null),r=e.title.length&&1==e.contentType,o=e.title.length;e.$mp.data=Object.assign({},{$root:{g0:t,g1:r,g2:o}})},i=!1,u=[];o._withStripped=!0},169:function(e,n,t){"use strict";t.r(n);var r=t(170),o=t.n(r);for(var i in r)["default"].indexOf(i)<0&&function(e){t.d(n,e,(function(){return r[e]}))}(i);n["default"]=o.a},170:function(e,n,t){"use strict";(function(e){var r=t(4);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;r(t(25));var o=function(){t.e("components/uni-nav-bar/uni-status-bar").then(function(){return resolve(t(196))}.bind(null,t)).catch(t.oe)},i=function(){Promise.all([t.e("common/vendor"),t.e("components/uni-icons/uni-icons")]).then(function(){return resolve(t(180))}.bind(null,t)).catch(t.oe)},u={name:"UniNavBar",components:{statusBar:o,uniIcons:i},props:{scrollTopC:{type:Number,default:0},title:{type:String,default:""},leftText:{type:String,default:""},rightText:{type:String,default:""},leftIcon:{type:String,default:"arrowleft"},fixed:{type:[Boolean,String],default:!1},color:{type:String,default:"#000000"},backgroundColor:{type:String,default:"#FFFFFF"},statusBar:{type:[Boolean,String],default:!1},shadow:{type:[Boolean,String],default:!1},border:{type:[Boolean,String],default:!0},contentType:{type:[Number,String],default:1},placeholder:{type:String,default:"搜索目的地/产品名称"},desId:{type:[Number,String],default:null}},mounted:function(){e.report&&""!==this.title&&e.report("title",this.title)},methods:{onClickLeft:function(){"gear"!=this.leftIcon?getCurrentPages().length>1?e.navigateBack():e.reLaunch({url:"/pages/index/index"}):e.navigateTo({url:"/pagesB/set/set"})},onClickTitle:function(){this.$emit("clickTitle")},goSearch:function(){e.navigateTo({url:"/pages/search/search"+(null==this.desId?"":"?desId="+this.desId)})}}};n.default=u}).call(this,t(2)["default"])},171:function(e,n,t){"use strict";t.r(n);var r=t(172),o=t.n(r);for(var i in r)["default"].indexOf(i)<0&&function(e){t.d(n,e,(function(){return r[e]}))}(i);n["default"]=o.a},172:function(e,n,t){}}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/uni-nav-bar/uni-nav-bar.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/uni-nav-bar/uni-nav-bar-create-component',
    {
        'components/uni-nav-bar/uni-nav-bar-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('2')['createComponent'](__webpack_require__(166))
        })
    },
    [['components/uni-nav-bar/uni-nav-bar-create-component']]
]);
