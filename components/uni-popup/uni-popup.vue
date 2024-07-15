<template>
    <view>
        <view v-show="show && !whiteBgColor" :v-bind='originOffsetTop' :style="{ top: originOffsetTop + 'px',bottom: bottom + 'rpx',zIndex: zIndex-1 }" class="uni-mask" @click="hide" @touchmove.stop.prevent="moveHandle" />
        <view v-show="show && whiteBgColor" :v-bind='originOffsetTop' :style="{ top: originOffsetTop + 'px',bottom: bottom + 'rpx',zIndex: zIndex-1 }" class="uni-mask-white" @click="hide" @touchmove.stop.prevent="moveHandle" />
        <view v-show="show" :v-bind='originSecondOffsetTop' :style="{ bottom: bottom + 'rpx',zIndex: zIndex }" :class="'uni-popup-' + position + ' ' + 'uni-popup-' + mode" class="uni-popup"  @touchmove.stop.prevent="moveHandle">
            {{ msg }}
            <slot />
            <view
                v-if="position === 'middle' && mode === 'insert'"
                :class="{
                    'uni-close-bottom': buttonMode === 'bottom',
                    'uni-close-right': buttonMode === 'right'
                }"
                class=" uni-icon uni-icon-close"
                @click="closeMask"
            />
        </view>
    </view>
</template>

<script>
export default {
    name: 'popUp',
    props: {
        /**
         * 页面显示
         */
        show: {
            type: Boolean,
            default: false
        },
        /**
         * 对齐方式
         */
        position: {
            type: String,
            // top - 顶部， middle - 居中, bottom - 底部
            default: 'middle'
        },
        /**
         * 显示模式
         */
        mode: {
            type: String,
            default: 'insert'
        },
        /**
         * 额外信息
         */
        msg: {
            type: String,
            default: ''
        },
        /**
         * h5遮罩是否到顶
         */
        h5Top: {
            type: Boolean,
            default: true
        },
        buttonMode: {
            type: String,
            default: 'bottom'
        },
		offsetTop: {
			type: Number,
			default: 44
		},
		secondOffsetTop: {
			type: [Number, String],
			default: 0
		},
		whiteBgColor: {
			type: Boolean,
			default: false
		},
		bottom: {
			type: [Number, String],
			default: 0
		},
		zIndex: {
			default: 999
		}
    },
    data() {
      let _this=this
        return {
          originOffsetTop:_this.offsetTop,
          originSecondOffsetTop:_this.secondOffsetTop
        };
    },
    watch: {
        h5Top(newVal) {
            if (newVal) {
                this.originOffsetTop = uni.upx2px(this.offsetTop);
                this.originSecondOffsetTop = uni.upx2px(this.secondOffsetTop);
            } else {
                this.originOffsetTop = 0;
                this.originSecondOffsetTop = 0;
            }
        }
    },
    created() {
        let offsetTop = 0;
        // #ifdef H5
        if (!this.h5Top) {
            offsetTop = 44;
        } else {
            offsetTop = 0;
        }
        // #endif
        this.originOffsetTop = offsetTop;
    },
    methods: {
        hide() {
            if (this.mode === 'insert' && this.position === 'middle') return;
            this.$emit('hidePopup');
        },
        closeMask() {
            if (this.mode === 'insert') {
                this.$emit('hidePopup');
            }
        },
        moveHandle() {}
    }
};
</script>
<style>
.uni-mask {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
}

.uni-mask-white {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: white;
}

.uni-popup {
    position: absolute;
    background-color: rgba(0, 0, 0, 0);
}

.uni-popup-middle {
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.uni-popup-middle.uni-popup-insert {
    min-width: 380upx;
    min-height: 380upx;
    max-width: 100%;
    max-height: 80%;
    transform: translate(-50%, -65%);
    background: none;
    box-shadow: none;
}

.uni-popup-middle.uni-popup-fixed {
    border-radius: 10upx;
    padding: 30upx;
}
.uni-popup-auto{
	bottom: 50% !important;
}

.uni-close-bottom,
.uni-close-right {
    position: relative;
    text-align: center;
    border-radius: 50%;
    color: #f5f5f5;
    font-size: 60upx;
    font-weight: bold;
    opacity: 0.8;
    z-index: -1;
}
.uni-close-bottom {
    margin: auto;
    left: 0;
    right: 0;
}
.uni-close-right {
    right: -60upx;
    top: -80upx;
}

.uni-close-bottom:after {
    content: '';
    position: absolute;
    width: 75rpx;
	height: 75rpx;
    top: 50rpx;
    left: 50%;
    transform: translate(-50%, -0%);
	background-image: url(../../static/images/close_btn2.png);
	background-size: 75rpx 75rpx;
}

.uni-popup-top {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100upx;
    line-height: 100upx;
    text-align: center;
}

.uni-popup-bottom {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    /* min-height: 100upx; */
    /* line-height: 100upx; */
    text-align: center;
}
</style>
