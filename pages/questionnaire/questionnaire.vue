<template>
	<view class="box">
		<view class="box-top flex-column flex-center-center" v-if="nowIndex == -1">
			<view class="box-title">
				调查问卷
			</view>
			<rich-text :nodes="nowData.describe" class="box-top-content"></rich-text>
			<view class="box-top-btn" @click="nowIndex = 0">
				开始填写
			</view>
			
		</view>
		<view class=""  v-if="nowIndex == -1">
			<image src="../../static/images/my_card1.png" mode="widthFix" class="box-top-img"></image>
			<view class="box-tip">N DESIGN·STUDIO·DALIAN</view>
		</view>

		<view class="box-content" v-else>
			<view class="box-title">
				{{nowData.question[nowIndex].title}}
			</view>
			<view class="box-subtitle" v-if="nowData.question[nowIndex].subtitle">
				{{nowData.question[nowIndex].subtitle}}
			</view>
			<view class="box-content-tip" v-if="nowData.question[nowIndex].tip">
				<rich-text :nodes="nowData.question[nowIndex].tip" class="box-content-tip"></rich-text>
			</view>
			<view class="box-view" v-for="(item,index) in nowData.question[nowIndex].list" :key="index">
				<view class="box-view-title">
					{{item.title}}
				</view>
				<view class="box-view-subtitle" v-if="item.tip">
					{{item.tip}}
				</view>
				<!-- 单选框类型 -->
				<view class="box-view-content" v-if="item.type == 'radio' || item.type == 'radioNum'">
					<radio-group @change="e=>radioChange(e,index,item.type)" class="box-radio flex-wrap">
						<label class="flex-center box-label" v-for="(radio, t) in item.list" :key="t">
							<view>
								<radio :value="radio.value" :checked="radio.value == item.value" />
							</view>
							<view>{{radio.value}}</view>
							<view v-if="radio.hasInput" class="box-radio-input flex-center">
								{{radio.tip || ''}}<input :type="item.inputType" v-model="radio.inputValue"
									:style="{width: radio.inputW + 'rpx'}"
									@input="e=>changeRadioNum(e,index,radio.value,item.type)"
									:placeholder="radio.placeholder" placeholder-class="placeholder-class2" />
							</view>
						</label>
					</radio-group>
					<view class="box-view-other" v-for="(other,j) in item.subList" :key="j">
						<view class="box-view-title">{{other.title}}{{j+1}}</view>
						<view class="box-other-item flex-center" v-for="(t,i) in other.list">
							<view>{{t.title}}</view>
							<input :type="t.type" v-model="t.value" :placeholder="t.placeholder"
								placeholder-class="placeholder-class2" />
						</view>
					</view>
				</view>

				<!-- 多选 -->
				<view class="box-view-content" v-if="item.type == 'checkbox'">
					<checkbox-group @change="e=>checkboxChange(e,index)" class="box-radio flex-wrap"
						v-model="item.value">
						<label class="flex-center box-label" v-for="(checkbox,s) in item.list" :key="s">
							<view>
								<checkbox :value="checkbox.value" />
							</view>
							<view>{{checkbox.value}}</view>
							<view v-if="checkbox.hasInput"
								class="box-radio-input flex-center flex-wrap box-checkbox-input">
								<input :type="item.inputType" v-model="checkbox.inputValue"
									:style="{width: checkbox.inputW + 'rpx'}" :placeholder="checkbox.placeholder"
									placeholder-class="placeholder-class2" />
							</view>
						</label>
					</checkbox-group>
				</view>


				<!-- 输入框集合 -->
				<view class="box-view-content flex-wrap" v-if="item.type == 'inputs'">
					<view v-for="(inputs,inputsI) in item.list" :key="inputsI" class="box-inputs-item flex-center">
						{{inputs.title}}
						<input v-model="inputs.inputValue" :type="inputs.inputType"
							:style="{width: inputs.inputW + 'rpx'}" />
						<text class="box-inputs-item-tip">{{inputs.tip}}</text>
					</view>
				</view>

				<!-- 多文本内容 -->
				<view class="box-view-content flex-wrap" v-if="item.type == 'textarea'">
					<textarea auto-height :placeholder="item.placeholder" placeholder-class="placeholder-class2"
						:clearable="false" v-model="item.value" maxlength="1000" class="box-textarea"></textarea>
				</view>
				
				<!-- 满意度 -->
				<view class="box-view-content" v-if="item.type == 'star'">
					<view class="star-box flex-center-center">
						<view class="star-item star-item-1" :class="{'star-item-active': item.value==1}" @click="changeStar(1,index)"></view>
						<view class="star-item star-item-2" :class="{'star-item-active': item.value==2}" @click="changeStar(2,index)"></view>
						<view class="star-item" :class="{'star-item-active': item.value==3}" @click="changeStar(3,index)"></view>
						<view class="star-item star-item-3" :class="{'star-item-active': item.value==4}" @click="changeStar(4,index)"></view>
						<view class="star-item star-item-4" :class="{'star-item-active': item.value==5}" @click="changeStar(5,index)"></view>
					</view>
					<view class="star-box-text flex-center-space">
						<view>不满意</view>
						<view>满意</view>
					</view>
				</view>
			</view>
			
			<view class="supplement-box" v-if="nowData.question[nowIndex].needInput">
				<view class="supplement-title">
					补充说明：
				</view>
				<textarea auto-height placeholder-class="placeholder-class2"
					:clearable="false" v-model="nowData.question[nowIndex].value" maxlength="1000" class="box-textarea"></textarea>
			</view>

			<view class="box-content-btn" @click="toNext">
				{{ nowIndex > nowData.question.length-2? '提交问卷':'下一页'}}
			</view>
			<view class="box-tip">N DESIGN·STUDIO·DALIAN</view>
		</view>
		
		<!-- 拨打电话/去拜访 弹窗 -->
		<uniPopup :show="showDialog" position="middle"  mode="middle">
			<view class="dialog-box">
				<view class="dialog-title">
					填写完成
				</view>
				<rich-text :nodes="nowData.succssTip"></rich-text>
				<view class="dialog-box-btn" @click="hidePopup">确认</view>
			</view>
		</uniPopup>

	</view>
</template>

<script>
	import utils from '@/utils/utils.js'
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import { saveQuestionPaper, stepNext } from '@/api/user.js'
	export default {
		components:{
			uniPopup
		},
		data() {
			return {
				status: 1,
				info: {
					1: {
						title: '登录后调查问卷',
						status: 1,
						describe: '你好，素未谋面，有幸相识。<br>很荣幸能和你共同开始一段筑家之旅为了更好的了解你，有助于我们对你的居室、你的生活方式、个人喜好等方面有深入的了解。<br>以便我们能够做出最适合你的设计方案，我们精心准备了这份问卷调查。<br>请认真、准确尽可能详细地填写。',
						succssTip: '您已进入<br>设计准备阶段<br>感谢您的填写<br>请耐心等候<br>需要您发送至少一套<br>您喜欢的案例到项目群<br>（可在小红书搜索）',
						question: [{
								title: '主人情况',
								list: [{
									title: '家庭常住人员数量：',
									type: 'radioNum',
									value: null,
									list: [{
										value: 1,
									}, {
										value: 2,
									}, {
										value: 3,
									}, {
										value: 4,
									}, {
										value: 5,
									}, {
										value: '其他',
										hasInput: true,
										inputValue: null,
										inputType: 'number',
										tip: '',
										inputW: 80
									}],
									subList: [],
									required: false
								}]
							}, {
								title: '房屋基本信息',
								list: [{
									title: '居住类型：',
									type: 'radio',
									value: null,
									required: false,
									list: [{
										value: '平层住宅'
									}, {
										value: '复式跃层'
									}, {
										value: '排屋/别墅'
									}, {
										value: '商用地产'
									}]
								}, {
									title: '项目地址：',
									type: 'inputs',
									value: 1,
									required: false,
									list: [{
										title: '城市：',
										inputValue: null,
										inputType: 'text',
										tip: '',
										inputW: 460,
										required: false,
									}, {
										title: '小区：',
										inputValue: null,
										inputType: 'text',
										tip: '',
										inputW: 460,
										required: false,
									}, {
										title: '详细地址：',
										inputValue: null,
										inputType: 'text',
										tip: '',
										inputW: 400,
										required: false,
									}]
								}, {
									title: '房屋结构：',
									type: 'radio',
									value: null,
									required: false,
									list: [{
										value: '框架'
									}, {
										value: '砖混'
									}, {
										value: '未知'
									}]
								}, {
									title: '交付情况：',
									type: 'radio',
									value: null,
									required: false,
									list: [{
										value: '已交付'
									}, {
										value: '未交付',
										hasInput: true,
										inputValue: null,
										inputType: 'number',
										tip: ',交付时间：',
										placeholder: '已交付不必填写',
										inputW: 220
									}]
								}, {
									title: '房屋楼层：',
									type: 'inputs',
									value: 1,
									required: false,
									list: [{
										title: '居住楼层：',
										inputValue: null,
										inputType: 'number',
										tip: '（层）',
										inputW: 310,
										required: false,
									}, {
										title: '总楼层：',
										inputValue: null,
										inputType: 'number',
										tip: '（层）',
										inputW: 340,
										required: false,
									}, {
										title: '建筑面积：',
										inputValue: null,
										inputType: 'digit',
										tip: '（平方米）',
										inputW: 250,
										required: false,
									}]
								}, {
									title: '偶住人员（人数）：',
									type: 'radio',
									value: null,
									required: false,
									list: [{
										value: '1~2人'
									}, {
										value: '2~4人'
									}, {
										value: '4人以上'
									}]
								}, {
									title: '偶住人员（身份关系）：',
									type: 'radio',
									value: null,
									required: false,
									list: [{
										value: '父母'
									}, {
										value: '亲戚朋友'
									}]
								}, {
									title: '偶住人员（居住频率）：',
									type: 'textarea',
									value: null,
									required: false,
								}, {
									title: '时间及资金计划：',
									type: 'inputs',
									value: 1,
									required: false,
									list: [{
										title: '预计入住时间：',
										inputValue: null,
										inputType: 'number',
										tip: '（年）',
										inputW: 60,
										required: false,
									}, {
										title: '',
										inputValue: null,
										inputType: 'number',
										tip: '（月）',
										inputW: 60,
										required: false,
									}, {
										title: '预计总资金（全部投入）：',
										inputValue: null,
										inputType: 'digit',
										tip: '（万）',
										inputW: 80,
										required: false,
									}]
								}]
							},
							{
								title: '性格和个性化需求',
								list: [{
									title: '您觉得自己是感性还是理性的？',
									type: 'radio',
									value: null,
									required: false,
									list: [{
										value: '偏感性'
									}, {
										value: '偏理性'
									}]
								}, {
									title: '您的衣、食、住、行受哪种文化影响？',
									type: 'radio',
									value: null,
									required: false,
									list: [{
										value: '偏东方'
									}, {
										value: '偏西方'
									}, {
										value: '均可'
									}]
								}, {
									title: '您偏好何种类型的服装？',
									type: 'radio',
									value: null,
									required: false,
									list: [{
										value: '正装'
									}, {
										value: '便装'
									}, {
										value: '视场合而定'
									}]
								}, {
									title: '您对家的感受是什么？希望家的氛围是什么样子的？',
									type: 'textarea',
									value: null,
									required: false,
								}, {
									title: '您现在的生活状态是怎么样的？未来期望的生活是怎么样的？',
									type: 'textarea',
									value: null,
									required: false,
								}, {
									title: '您觉得您梦想中全家人的生活方式？（可设想某一场景）',
									type: 'textarea',
									value: null,
									required: false,
								}, {
									title: '您对房屋装修风格的选择？（可多选）',
									type: 'checkbox',
									value: '',
									required: false,
									list: [{
										value: '现代简约'
									}, {
										value: '现代时尚'
									}, {
										value: '日式MUJI'
									}, {
										value: '赛博朋克/工业风'
									}, {
										value: '美式'
									}, {
										value: '法式乡村'
									}, {
										value: '新古典'
									}, {
										value: '东南亚'
									}, {
										value: '北欧风'
									}, {
										value: '中古风'
									}, {
										value: '地中海'
									}, {
										value: '奶油风'
									}, {
										value: '原木风'
									}, {
										value: '意式轻奢'
									}, {
										value: '极简风'
									}, {
										value: '侘寂风'
									}, {
										value: '新中式'
									}, {
										value: '混搭：',
										tip: '',
										placeholder: '（请描述何种混搭风格）',
										hasInput: true,
										inputValue: null,
										inputType: 'text',
										inputW: 370
									}, {
										value: '其他：',
										tip: '',
										hasInput: true,
										inputValue: null,
										inputType: 'text',
										inputW: 370
									}]
								}, {
									title: '对整体照明方式的要求？（可多选）',
									type: 'checkbox',
									value: '',
									required: false,
									list: [{
										value: '无主灯'
									}, {
										value: '主灯+局部无主灯 '
									}, {
										value: '均可'
									}]
								}, {
									title: '您对材质的偏好？（可多选）',
									type: 'checkbox',
									value: '',
									required: false,
									list: [{
										value: '木材'
									}, {
										value: '乳胶漆 '
									}, {
										value: '墙纸'
									}, {
										value: '不锈钢'
									}, {
										value: '微水泥'
									}, {
										value: '玻璃'
									}, {
										value: '大理石'
									}, {
										value: '水泥'
									}, {
										value: '黄铜'
									}, {
										value: '艺术涂料'
									}]
								}, {
									title: '您对房屋装修总体色调的偏好？（可多选）',
									type: 'checkbox',
									value: '',
									required: false,
									list: [{
										value: '白色色调'
									}, {
										value: '原木色调 '
									}, {
										value: '大地色调'
									}, {
										value: '彩色色调'
									}, {
										value: '黑白色色调'
									}]
								}, {
									title: '您对色彩的偏好？',
									type: 'textarea',
									value: null,
									required: false,
								}, {
									title: '除常规空间外，需要哪些特殊空间？（可多选）',
									type: 'checkbox',
									value: '',
									required: false,
									list: [{
										value: '健身房'
									}, {
										value: '图书室'
									}, {
										value: '棋牌室'
									}, {
										value: '台球室'
									}, {
										value: '乒乓球室'
									}, {
										value: '酒窖'
									}, {
										value: '阅读室'
									}, {
										value: '桑拿spa'
									}, {
										value: '画室'
									}, {
										value: '琴房'
									}, {
										value: '佛堂'
									}, {
										value: '影音室'
									}, {
										value: '泳池'
									}, {
										value: '雪茄房'
									}, {
										value: '桌游吧'
									}, {
										value: '其他：',
										tip: '',
										hasInput: true,
										inputValue: null,
										inputType: 'text',
										inputW: 370
									}]
								}, {
									title: '各房间功能业主自我理想分配？',
									type: 'textarea',
									tip: '（请尽可能详细描述）[例：南大房间主人房，南小房间儿童房，北房间客房兼书房]',
									value: null,
									required: false,
								}, {
									title: '您对以前房屋的功能和装饰有什么不满意和遗憾的地方？',
									type: 'textarea',
									tip: '[例：厨房过小、走道过长、楼梯位置不合理......]',
									value: null,
									required: false,
								}, {
									title: '是否有喜欢的家具品牌？',
									type: 'radio',
									tip: '（如有，请说明品牌）',
									value: null,
									required: false,
									list: [{
										value: '是',
										hasInput: true,
										inputValue: null,
										inputType: 'text',
										tip: '',
										inputW: 450
									}, {
										value: '否'
									}]
								}, {
									title: '是否有不喜欢的元素或物件？',
									type: 'textarea',
									value: null,
									required: false,
								}, {
									title: '是否有旧家具需要保留？',
									tip: '（请提供数量及尺寸）',
									type: 'radio',
									value: null,
									required: false,
									list: [{
										value: '是',
										hasInput: true,
										inputValue: null,
										inputType: 'text',
										tip: '',
										inputW: 450
									}, {
										value: '否'
									}]
								}, {
									title: '是否会收藏古董或贵重艺术品？',
									tip: '（请说明大概数量及尺寸）',
									type: 'radio',
									value: null,
									required: false,
									list: [{
										value: '是',
										hasInput: true,
										inputValue: null,
										inputType: 'text',
										tip: '',
										inputW: 450
									}, {
										value: '否'
									}]
								}, {
									title: '是否会收藏雪茄或者烟斗？',
									type: 'radio',
									value: null,
									required: false,
									list: [{
										value: '是',
									}, {
										value: '否'
									}]
								}, {
									title: '您最近经常的户外活动？（可多选）',
									type: 'checkbox',
									value: '',
									required: false,
									list: [{
										value: '骑行'
									}, {
										value: '钓鱼'
									}, {
										value: '滑板'
									}, {
										value: '高尔夫'
									}, {
										value: '潜水'
									}, {
										value: '滑冰'
									}, {
										value: '滑雪'
									}, {
										value: '露营'
									}, {
										value: '棒球'
									}, {
										value: '乒乓球'
									}, {
										value: '爬山'
									}, {
										value: '足球'
									}, {
										value: '篮球'
									}, {
										value: '其他：',
										tip: '',
										hasInput: true,
										inputValue: null,
										inputType: 'text',
										inputW: 370
									}]
								}, {
									title: '您每年出门旅行游玩的频率？',
									type: 'radio',
									value: null,
									required: false,
									list: [{
										value: '1~3次'
									}, {
										value: '3~6次'
									}, {
										value: '基本不'
									}, {
										value: '其他',
										hasInput: true,
										inputValue: null,
										inputType: 'number',
										tip: '',
										inputW: 370
									}]
								}, {
									title: '您是否会经常出差？频率是多少？',
									type: 'radio',
									value: null,
									required: false,
									list: [{
										value: '是',
										hasInput: true,
										inputValue: null,
										inputType: 'text',
										tip: '',
										inputW: 370
									}, {
										value: '否'
									}]
								}, {
									title: '有宠物或者未来有养宠物的打算吗？',
									type: 'checkbox',
									tip: '（可多选，如宠物在一只以上，请说明数量）',
									value: null,
									required: false,
									list: [{
										value: '大型犬'
									}, {
										value: '小型犬'
									}, {
										value: '猫'
									}, {
										value: '其他',
										hasInput: true,
										inputValue: null,
										inputType: 'text',
										tip: '',
										inputW: 370
									}, {
										value: '无'
									}]
								}, {
									title: '是否有养绿植的需求？',
									tip: '（如有，请说明植物品种的偏好）',
									type: 'radio',
									value: null,
									required: false,
									list: [{
										value: '是',
										hasInput: true,
										inputValue: null,
										inputType: 'text',
										tip: '',
										inputW: 450
									}, {
										value: '否'
									}]
								}, {
									title: '是否需要鱼缸？',
									tip: '（如需要，请说明对鱼缸的大小的偏好）',
									type: 'radio',
									value: null,
									required: false,
									list: [{
										value: '是',
										hasInput: true,
										inputValue: null,
										inputType: 'text',
										tip: '',
										inputW: 450
									}, {
										value: '否'
									}, {
										value: '均可'
									}]
								}, {
									title: '是否有运动器械？',
									type: 'radio',
									value: null,
									required: false,
									list: [{
										value: '是',
										hasInput: true,
										inputValue: null,
										inputType: 'text',
										tip: '',
										inputW: 450
									}, {
										value: '否'
									}]
								}, {
									title: '是否有宗教信仰？',
									type: 'radio',
									value: null,
									required: false,
									list: [{
										value: '佛教'
									}, {
										value: '基督教'
									}, {
										value: '伊斯兰教'
									}, {
										value: '藏传佛教'
									}, {
										value: '无'
									}, {
										value: '其他',
										hasInput: true,
										inputValue: null,
										inputType: 'text',
										tip: '',
										inputW: 370
									}]
								}, {
									title: '是否注重风水？',
									type: 'radio',
									value: null,
									required: false,
									list: [{
										value: '很注重'
									}, {
										value: '一般'
									}, {
										value: '完全不考虑'
									}]
								}]
							}, {
								title: '各区域要求',
								subtitle: '·玄关：',
								list: [{
									title: '是否介意入门能直观全室？',
									type: 'radio',
									value: null,
									required: false,
									list: [{
										value: '介意'
									}, {
										value: '不介意'
									}]
								}, {
									title: '玄关物品的种类？（可多选）',
									type: 'checkbox',
									value: null,
									required: false,
									list: [{
										value: '服装'
									}, {
										value: '鞋子'
									}, {
										value: '饰品'
									}, {
										value: '小件'
									}, {
										value: '箱包'
									}, {
										value: '杂物'
									}]
								}, {
									title: '您的靴子数量大概有多少？以什么类型的靴子为主？',
									type: 'textarea',
									value: null,
									required: false,
								}, {
									title: '是否有大件物品需要存放？',
									tip: '[例：目前有一个行李箱，以后可能会再添一个...]',
									type: 'textarea',
									value: null,
									required: false,
								}]
							}, {
								title: '各区域要求',
								subtitle: '·客厅：',
								list: [{
									title: '客厅的主要功能？（可多选）',
									type: 'checkbox',
									value: null,
									required: false,
									list: [{
										value: '阅读'
									}, {
										value: '影音'
									}, {
										value: '游戏'
									}, {
										value: '用餐'
									}, {
										value: '会客'
									}, {
										value: '办公'
									}, {
										value: '音乐'
									}, {
										value: '其他',
										hasInput: true,
										inputValue: null,
										inputType: 'text',
										tip: '',
										inputW: 370
									}]
								}, {
									title: '家里经常来客人聚会吗？',
									type: 'radio',
									value: null,
									required: false,
									list: [{
										value: '经常'
									}, {
										value: '偶尔'
									}, {
										value: '从不'
									}]
								}, {
									title: '客厅地面铺设形式？',
									type: 'radio',
									value: null,
									required: false,
									list: [{
										value: '地板'
									}, {
										value: '地砖'
									}, {
										value: '微水泥'
									}, {
										value: '均可'
									}, {
										value: '其他',
										hasInput: true,
										inputValue: null,
										inputType: 'text',
										tip: '',
										inputW: 370
									}]
								}, {
									title: '客厅的储物要求？（可多选）',
									type: 'checkbox',
									value: null,
									required: false,
									list: [{
										value: '书柜'
									}, {
										value: '零食柜'
									}, {
										value: '玩具柜'
									}, {
										value: '杂物收纳柜'
									}, {
										value: '手办柜'
									}, {
										value: '其他',
										hasInput: true,
										inputValue: null,
										inputType: 'text',
										tip: '',
										inputW: 370
									}]
								}, {
									title: '客厅的视听设备有哪些？（可多选）',
									type: 'checkbox',
									value: null,
									required: false,
									list: [{
										value: '液晶电视',
										hasInput: true,
										placeholder: '请备注是否需要隐藏',
										inputValue: null,
										inputType: 'text',
										tip: '',
										inputW: 350
									}, {
										value: '投影'
									}, {
										value: '音响系统'
									}, {
										value: '心仪尺寸及其他',
										hasInput: true,
										inputValue: null,
										inputType: 'text',
										tip: '',
										inputW: 250
									}]
								}, {
									title: '是否有家庭影院系统？如有，是否埋线',
									type: 'radio',
									value: null,
									required: false,
									list: [{
										value: '是',
										hasInput: true,
										inputValue: null,
										inputType: 'text',
										placeholder: '埋线/不埋线',
										tip: '',
										inputW: 450
									}, {
										value: '否'
									}]
								}]
								
							}, {
								title: '各区域要求',
								subtitle: '·厨房：',
								list: [{
									title: '厨房形式要求？',
									type: 'radio',
									value: null,
									required: false,
									list: [{
										value: '封闭式',
									}, {
										value: '开放式'
									}, {
										value: '均可'
									}]
								},  {
									title: '家庭烹饪习惯偏向?（可多选）',
									type: 'checkbox',
									value: null,
									required: false,
									list: [{
										value: '中式'
									}, {
										value: '西式'
									}]
								}, {
									title: '您是否经常做饭？',
									type: 'radio',
									value: null,
									required: false,
									list: [{
										value: '每天',
									}, {
										value: '很少'
									}, {
										value: '每周1~3天'
									}, {
										value: '每周3~5天'
									}]
								},  {
									title: '厨房内必备电器设备？（可多选）',
									type: 'checkbox',
									value: null,
									required: false,
									list: [{
										value: '烤箱'
									}, {
										value: '蒸箱'
									}, {
										value: '蒸烤一体'
									}, {
										value: '洗碗机'
									}, {
										value: '集成灶'
									}]
								},  {
									title: '厨房内必备小家电设备？（可多选）',
									type: 'checkbox',
									value: null,
									required: false,
									list: [{
										value: '电饭煲'
									}, {
										value: '电饼档'
									}, {
										value: '电火锅'
									}, {
										value: '电压力锅'
									}, {
										value: '电磁炉'
									}, {
										value: '微波炉'
									}, {
										value: '嵌入式微波炉'
									}, {
										value: '空气炸锅'
									}, {
										value: '厨师机'
									}, {
										value: '破壁机'
									}, {
										value: '豆浆机'
									}, {
										value: '垃圾处理器'
									}, {
										value: '其他',
										hasInput: true,
										inputValue: null,
										inputType: 'text',
										tip: '',
										inputW: 370
									}]
								}]
							}, {
								title: '各区域要求',
								subtitle: '·餐厅：',
								list: [{
									title: '您最喜欢的餐桌形式？',
									type: 'radio',
									value: null,
									required: false,
									list: [{
										value: '长桌',
									}, {
										value: '圆桌'
									}, {
										value: '折叠桌'
									}, {
										value: '岛台'
									}, {
										value: '卡座'
									}, {
										value: '均可'
									}]
								}, {
									title: '您平时用餐时会有多少人？',
									type: 'radio',
									value: null,
									required: false,
									list: [{
										value: '1~2人',
									}, {
										value: '2~4人'
									}, {
										value: '4~6人'
									}, {
										value: '6人以上'
									}]
								}, {
									title: '是否会在餐厅做其他活动？（可多选）',
									type: 'checkbox',
									value: null,
									required: false,
									list: [{
										value: '看电视'
									}, {
										value: '打扑克'
									}, {
										value: '写毛笔字'
									}, {
										value: '看书'
									}, {
										value: '做手工'
									}, {
										value: '拼乐高'
									}, {
										value: '其他',
										hasInput: true,
										inputValue: null,
										inputType: 'text',
										tip: '',
										inputW: 370
									}]
								}, {
									title: '您除了正餐以外会吃其它零食吗？',
									type: 'radio',
									value: null,
									required: false,
									list: [{
										value: '经常',
									}, {
										value: '偶尔'
									}, {
										value: '从不'
									}]
								}, {
									title: '您的饮用习惯更偏向于？（可多选）',
									type: 'checkbox',
									value: null,
									required: false,
									list: [{
										value: '红酒'
									}, {
										value: '啤酒'
									}, {
										value: '白酒'
									}, {
										value: '葡萄酒'
									}, {
										value: '洋酒'
									}, {
										value: '茶水'
									}, {
										value: '饮料'
									}, {
										value: '饮用水'
									}, {
										value: '咖啡'
									}, {
										value: '牛奶'
									}]
								}, {
									title: '您的饮酒频率？',
									type: 'radio',
									value: null,
									required: false,
									list: [{
										value: '每天',
									}, {
										value: '很少'
									}, {
										value: '每周1~3天'
									}, {
										value: '每周3~5天'
									}]
								}]
							}, {
								title: '各区域要求',
								subtitle: '·卫生间：',
								list: [{
									title: '对马桶形式的偏好？',
									type: 'radio',
									value: null,
									required: false,
									list: [{
										value: '智能马桶',
									}, {
										value: '壁挂马桶'
									}, {
										value: '普通马桶'
									}, {
										value: '蹲便器'
									}]
								}, {
									title: '对花洒形式的偏好？',
									type: 'radio',
									value: null,
									required: false,
									list: [{
										value: '明装花洒（带顶喷）',
									}, {
										value: '手持花洒'
									}, {
										value: '暗装花洒',
										hasInput: true,
										placeholder: '请备注是否带顶喷',
										inputValue: null,
										inputType: 'text',
										tip: '',
										inputW: 340
									}]
								}, {
									title: '热水器形式？（初步设想）',
									type: 'radio',
									value: null,
									required: false,
									list: [{
										value: '燃气热水器（生活用水）',
									}, {
										value: '燃气壁挂炉（生活用水，自己烧地热）'
									}, {
										value: '电热水器'
									}, {
										value: '小厨宝'
									}, {
										value: '太阳能热水器'
									}]
								}, {
									title: '您习惯在哪里洗头',
									type: 'radio',
									value: null,
									required: false,
									list: [{
										value: '洗手盆',
									}, {
										value: '淋浴区'
									}]
								}, {
									title: '是否会在卫生间吸烟？',
									type: 'radio',
									value: null,
									required: false,
									list: [{
										value: '是',
									}, {
										value: '否'
									}]
								}, {
									title: '是否需要小便斗，如需要，对小便斗的形式的偏好？',
									type: 'radio',
									value: null,
									required: false,
									list: [{
										value: '需要',
										hasInput: true,
										placeholder: '挂墙式/落地式/均可',
										inputValue: null,
										inputType: 'text',
										tip: '',
										inputW: 420
									}, {
										value: '不需要'
									}]
								}]
							}, {
								title: '各区域要求',
								subtitle: '·书房：', 
								list: [{
									title: '书房的主要用途？（可多选）',
									type: 'checkbox',
									value: null,
									required: false,
									list: [{
										value: '阅读'
									}, {
										value: '办公'
									}, {
										value: '写作'
									}, {
										value: '会客'
									}, {
										value: '游戏'
									}, {
										value: '喝茶'
									}, {
										value: '辅导作业'
									}, {
										value: '其他',
										hasInput: true,
										inputValue: null,
										inputType: 'text',
										tip: '',
										inputW: 370
									}]
								}, {
									title: '您一般何时会阅读书籍？',
									type: 'radio',
									value: null,
									required: false,
									list: [{
										value: '清晨',
									}, {
										value: '睡前'
									}, {
										value: '午后'
									}, {
										value: '随时'
									}]
								}, {
									title: '书房同时会有几个人使用？',
									type: 'radio',
									value: null,
									required: false,
									list: [{
										value: '1~2人',
									}, {
										value: '2~3人'
									}, {
										value: '3人以上'
									}, {
										value: '其他',
										hasInput: true,
										inputValue: null,
										inputType: 'text',
										tip: '',
										inputW: 370
									}]
								}, {
									title: '对书柜长度的需求？',
									type: 'radio',
									value: null,
									required: false,
									list: [{
										value: '4~8m',
									}, {
										value: '8~12m'
									}, {
										value: '12~16m'
									}, {
										value: '16m及以上:',
										hasInput: true,
										inputValue: null,
										inputType: 'text',
										tip: '',
										inputW: 320
									}]
								}, {
									title: '书房有无其他工作设备？（可多选）',
									type: 'checkbox',
									value: null,
									required: false,
									list: [{
										value: '打印机'
									}, {
										value: '扫描机'
									}, {
										value: '传真机'
									}, {
										value: '无'
									}]
								}, {
									title: '书房是否会使用电脑？数量有多少？',
									tip: '[例：有一个台式和一个笔记本...]',
									type: 'textarea',
									value: null,
									required: false,
								}]
							}, {
								title: '各区域要求',
								subtitle: '·卧室：',
								list: [{
									title: '您的作息时间？',
									type: 'radio',
									value: null,
									required: false,
									list: [{
										value: '9:30~10:30',
									}, {
										value: '10:30~12:00'
									}, {
										value: '12:00~1:30'
									}]
								}, {
									title: '您的起床时间？',
									type: 'radio',
									value: null,
									required: false,
									list: [{
										value: '6:00~7:30',
									}, {
										value: '7:30~9:00'
									}, {
										value: '10:30 左右'
									}]
								}, {
									title: '对床的偏好？（可多选）',
									type: 'checkbox',
									value: null,
									required: false,
									list: [{
										value: '实木'
									}, {
										value: '软包'
									}, {
										value: '高床'
									}, {
										value: '低床'
									}, {
										value: '带床箱'
									}, {
										value: '地台床'
									}, {
										value: '不带床箱'
									}, {
										value: '均可'
									}]
								}, {
									title: '对各个卧室床的尺寸要求？',
									tip: '[尺寸：2m*2.3m、1.8m*2m、1.5m*2m、1.35m*2m、1.2m*2m、0.9m*2m][例：主卧 1.8m*2m、次卧 1.5m*2m...]',
									type: 'textarea',
									value: null,
									required: false,
								}, {
									title: '您喜好的衣物储存形式？（可多选）',
									type: 'checkbox',
									value: null,
									required: false,
									list: [{
										value: '衣柜',
									}, {
										value: '步入式衣帽间'
									}, {
										value: '开放衣架'
									}, {
										value: '其他：',
										hasInput: true,
										inputValue: null,
										inputType: 'text',
										tip: '',
										inputW: 370
									}]
								}, {
									title: '对衣柜长度的需求？',
									type: 'radio',
									value: null,
									required: false,
									list: [{
										value: '4~8m',
									}, {
										value: '8~12m'
									}, {
										value: '12~16m'
									}, {
										value: '其他：',
										hasInput: true,
										inputValue: null,
										inputType: 'text',
										tip: '',
										inputW: 370
									}]
								}, {
									title: '谁的衣物比较多？（可多选）',
									type: 'checkbox',
									value: null,
									required: false,
									list: [{
										value: '男主人',
									}, {
										value: '女主人'
									}, {
										value: '孩子'
									}, {
										value: '父母'
									}]
								}, {
									title: '您习惯在哪里梳妆？',
									type: 'radio',
									value: null,
									required: false,
									list: [{
										value: '梳妆台',
									}, {
										value: '浴室'
									}, {
										value: '其他：',
										hasInput: true,
										inputValue: null,
										inputType: 'text',
										tip: '',
										inputW: 370
									}]
								}, {
									title: '主卧室需要视听设备吗？',
									type: 'radio',
									value: null,
									required: false,
									list: [{
										value: '需要电视',
									}, {
										value: '需要投影仪'
									}, {
										value: '不需要'
									}]
								}, {
									title: '您每晚的起夜频次？',
									type: 'radio',
									value: null,
									required: false,
									list: [{
										value: '基本不',
									}, {
										value: '1~2次'
									}, {
										value: '较多'
									}]
								}, {
									title: '老人房是否考虑老人的特殊身体状况或习惯？',
									tip: '(请详细说明)',
									type: 'radio',
									value: null,
									required: false,
									list: [{
										value: '是',
										hasInput: true,
										inputValue: null,
										inputType: 'text',
										tip: '',
										inputW: 420
									}, {
										value: '否'
									}]
								}]
							}, {
								title: '各区域要求',
								subtitle: '·家务间：',
								list: [{
									title: '对清洁设备的需要？（可多选）',
									type: 'checkbox',
									value: null,
									required: false,
									list: [{
										value: '子母式洗衣机',
									}, {
										value: '独立式洗衣机'
									}, {
										value: '独立式烘干机'
									}, {
										value: '洗烘一体式洗衣机'
									}, {
										value: '壁挂式洗衣机'
									}, {
										value: '衣物护理机'
									}, {
										value: '扫地机器人'
									}, {
										value: '扫托一体机'
									}, {
										value: '手持吸尘器'
									}, {
										value: '手持洗地机'
									}]
								}, {
									title: '您居家清洁整理的频率？',
									type: 'radio',
									value: null,
									required: false,
									list: [{
										value: '经常整理'
									},{
										value: '阶段性整理'
									}]
								}, {
									title: '您对晾衣架形式的偏好？',
									type: 'radio',
									value: null,
									required: false,
									list: [{
										value: '落地式'
									},{
										value: '顶装式',
										hasInput: true,
										placeholder: '请备注嵌入或者明装',
										inputValue: null,
										inputType: 'text',
										tip: '',
										inputW: 370
									}]
								}, {
									title: '是否需要水槽？',
									type: 'radio',
									value: null,
									required: false,
									list: [{
										value: '是'
									},{
										value: '否'
									}]
								}, {
									title: '是否需要挂衣区？',
									type: 'radio',
									value: null,
									required: false,
									list: [{
										value: '是'
									},{
										value: '否'
									}]
								}, {
									title: '是否有熨烫需求？',
									type: 'radio',
									value: null,
									required: false,
									list: [{
										value: '否'
									},{
										value: '是',
										hasInput: true,
										placeholder: '请备注挂烫机或者电熨斗',
										inputValue: null,
										inputType: 'text',
										tip: '',
										inputW: 420
									}]
								}]
							}, {
								title: '各区域要求',
								subtitle: '·庭院露台：',
								list: [{
									title: '对庭院或露台的需求？会进行什么活动？（可多选）',
									type: 'checkbox',
									value: null,
									required: false,
									list: [{
										value: '种花',
									}, {
										value: '种菜'
									}, {
										value: '小型景观树'
									}, {
										value: '水景'
									}, {
										value: '鱼池'
									}, {
										value: '烧烤'
									}, {
										value: '朋友聚会'
									}, {
										value: '喝茶聊天'
									}, {
										value: '户外电影'
									}, {
										value: '运动健身'
									}, {
										value: '儿童活动区'
									}, {
										value: '其他：',
										hasInput: true,
										inputValue: null,
										inputType: 'text',
										tip: '',
										inputW: 370
									}]
								}, {
									title: '对植物景观是否有要求？',
									tip: '[例：喜欢小枫树这种小一点的，太高大的不喜欢...]',
									type: 'radio',
									value: null,
									required: false,
									list: [{
										value: '是',
										hasInput: true,
										inputValue: null,
										inputType: 'text',
										tip: '',
										inputW: 420
									},{
										value: '否'
									}]
								}]
							}, {
								title: '各区域要求',
								subtitle: '·家用设备要求：',
								list: [{
									title: '您需要哪些设备？（可多选）',
									type: 'checkbox',
									value: null,
									required: false,
									list: [{
										value: '地暖',
									}, {
										value: '暖气'
									}, {
										value: '全屋分体空调'
									}, {
										value: '全屋中央空调'
									}, {
										value: '软水'
									}, {
										value: '直饮机'
									}, {
										value: '中央净水'
									}, {
										value: '前置净水'
									}, {
										value: '地源热泵'
									}, {
										value: '空气源热泵'
									}, {
										value: '污水提升泵'
									}, {
										value: '保险柜'
									}, {
										value: '智能居家系统'
									}, {
										value: '新风系统'
									}, {
										value: '安防系统'
									}, {
										value: '应急电源'
									}, {
										value: '电梯',
										hasInput: true,
										placeholder: '请备注观光电梯或者传统电梯',
										inputValue: null,
										inputType: 'text',
										tip: '',
										inputW: 420
									}, {
										value: '其他：',
										hasInput: true,
										inputValue: null,
										inputType: 'text',
										tip: '',
										inputW: 370
									}]
								}, {
									title: '是否更换地热？',
									type: 'radio',
									value: null,
									required: false,
									list: [{
										value: '是'
									},{
										value: '否'
									}]
								}, {
									title: '是否更换窗户？',
									type: 'radio',
									value: null,
									required: false,
									list: [{
										value: '是',
										hasInput: true,
										placeholder: '请备注全换或者局部',
										inputValue: null,
										inputType: 'text',
										tip: '',
										inputW: 420
									},{
										value: '否'
									}]
								}, {
									title: '是否更换防盗门？',
									type: 'radio',
									value: null,
									required: false,
									list: [{
										value: '是'
									},{
										value: '否'
									}]
								}, {
									title: '您对全屋WIFI布控方式的偏好？',
									type: 'radio',
									value: null,
									required: false,
									list: [{
										value: 'AP+AC'
									},{
										value: 'Mesh',
										hasInput: true,
										placeholder: '有线/无线',
										inputValue: null,
										inputType: 'text',
										tip: '',
										inputW: 400
									},{
										value: '均可'
									}, {
										value: '其他：',
										hasInput: true,
										inputValue: null,
										inputType: 'text',
										tip: '',
										inputW: 370
									}]
								}, {
									title: '您对智能居家系统的需求？（可多选）',
									type: 'checkbox',
									value: null,
									required: false,
									list: [{
										value: '智能灯光',
									}, {
										value: '电动窗帘'
									}, {
										value: '背景音乐'
									}, {
										value: '红外安防'
									}, {
										value: '监控系统'
									}, {
										value: '报警系统'
									}, {
										value: '智能门锁'
									}, {
										value: '可视对讲'
									}, {
										value: '网络安全'
									}, {
										value: '影音系统'
									}, {
										value: '智能暖通'
									}, {
										value: '智能门窗'
									}, {
										value: '其他：',
										hasInput: true,
										inputValue: null,
										inputType: 'text',
										tip: '',
										inputW: 370
									}]
								}, {
									title: '对网络、电话、音响等弱电是否有特殊要求？',
									tip: '（如仅需满足各空间常规网线、电话、电视卫星请选择无）',
									type: 'radio',
									value: null,
									required: false,
									list: [{
										value: '是',
										hasInput: true,
										inputValue: null,
										inputType: 'text',
										tip: '',
										inputW: 420
									},{
										value: '否'
									}]
								}]
							}, {
								title: '补充说明',
								tip: '感谢您的回答！<br>除以上问题之外，<br>如果您还有其他对于家的想法，<br>您可以补充一份设计需求在最后。<br>祝您生活愉快！',
								value: null,
								needInput: true
							}
						]
					},
					6: {
						title: '施工图设计阶段调查问卷',
						status: 6,
						describe: '您好，目前阶段我们需要进行<br>一个小小的回访<br>需要您协助我们进行问卷填写<br>您的意见对我们来说至关重要<br>感谢您的支持与耐心',
						succssTip: '您已进入<br>施工前清单整理阶段<br>感谢您的填写',
						question: [{
							title: '设计满意度调研问卷',
							list: [{
								title: '对于本次的设计服务您的总体满意为？',
								type: 'star',
								value: null,
								required: false,
							},{
								title: '对于房屋整体功能，是否满意？',
								type: 'star',
								value: null,
								required: false,
							},{
								title: '对于空间整体效果，是否满意？',
								type: 'star',
								value: null,
								required: false,
							},{
								title: '设计师在与您的汇报过程中表达是否清晰？',
								type: 'star',
								value: null,
								required: false,
							},{
								title: '您觉得我们在哪里需要改进和提升？请留下您的宝贵意见！',
								type: 'textarea',
								value: null,
								required: false,
							}]
						}]
					},
					19: {
						title: '油作施工阶段调查问卷',
						status: 18,
						describe: '您好，目前阶段我们需要进行<br>一个小小的回访<br>需要您协助我们进行问卷填写<br>您的意见对我们来说至关重要<br>感谢您的支持与耐心',
						succssTip: '您已进入<br>第三方安装阶段<br>感谢您的填写',
						question: [{
							title: '设计师满意度',
							list: [{
								title: '对于本次的施工服务您的总体满意度为？',
								type: 'star',
								value: null,
								required: false,
							},{
								title: '对于设计师的责任心，您是否满意？',
								type: 'star',
								value: null,
								required: false,
							},{
								title: '在施工过程中，与设计师的沟通是否顺畅？',
								type: 'star',
								value: null,
								required: false,
							},{
								title: '对于设计师的专业度，你是否满意？',
								type: 'star',
								value: null,
								required: false,
							},{
								title: '对于设计师解决问题的时效性，您是否满意？',
								type: 'star',
								value: null,
								required: false,
							},{
								title: '设计师的整体服务是否耐心、周到、细致？',
								type: 'star',
								value: null,
								required: false,
							},{
								title: '在本次施工过程中，设计师是否有失误？',
								type: 'textarea',
								value: null,
								required: false,
							},{
								title: '您觉得我们在哪里需要改进和提升？请留下您的宝贵意见！',
								type: 'textarea',
								value: null,
								required: false,
							}]
						},{
							title: '工程负责人满意度',
							list: [{
								title: '对于本次的施工服务您的总体满意为？',
								type: 'star',
								value: null,
								required: false,
							},{
								title: '对于工程负责人的责任心您是否满意？',
								type: 'star',
								value: null,
								required: false,
							},{
								title: '在施工过程中，与工程负责人沟通是否顺畅？',
								type: 'star',
								value: null,
								required: false,
							},{
								title: '对于工程负责人的专业度，你是否满意？',
								type: 'star',
								value: null,
								required: false,
							},{
								title: '对于工程负责人解决问题的时效性，您是否满意？',
								type: 'star',
								value: null,
								required: false,
							},{
								title: '工程负责人的整体服务是否耐心、周到、细致？',
								type: 'star',
								value: null,
								required: false,
							},{
								title: '在本次施工过程中，工程负责人是否有失误？',
								type: 'textarea',
								value: null,
								required: false,
							},{
								title: '您觉得我们在哪里需要改进和提升？请留下您的宝贵意见！',
								type: 'textarea',
								value: null,
								required: false,
							}]
						}]
					},
				},
				nowData: {},
				nowIndex: -1, //当前操作的序号
				showDialog: false,
				id: null,
			}
		},
		onLoad(option) {
			this.status = option.status || 1;
			this.projectId = option.id;
			this.nowData = this.info[this.status]
		},
		methods: {
			// 单选框事件
			radioChange(e, index, type) {
				let value = e.detail.value
				this.nowData.question[this.nowIndex].list[index].value = value
				console.log(type)
				if (type == 'radioNum' && Number(value)) {
					this.addOtherItem(index, Number(value))
				}
			},
			// 多选
			checkboxChange(e, index) {
				let value = e.detail.value
				this.nowData.question[this.nowIndex].list[index].value = value.toString()
			},
			changeRadioNum(e, index, radioVaule, type) {
				if (type != 'radioNum') return;
				this.nowData.question[this.nowIndex].list[index].value = radioVaule
				let value = Number(e.detail.value);
				this.addOtherItem(index, value)
			},
			changeStar(star,index){
				this.nowData.question[this.nowIndex].list[index].value = star
			},
			addOtherItem(index, num) {
				let t = {
					title: '家庭成员',
					list: [{
						title: '姓名：',
						value: null,
						required: false,
						type: 'text'
					}, {
						title: '性别：',
						value: null,
						required: false,
						type: 'text'
					}, {
						title: '年龄：',
						value: null,
						required: false,
						type: 'number'
					}, {
						title: '身高：',
						value: null,
						placeholder: 'CM',
						type: 'digit'
					}, {
						title: '体重：',
						value: null,
						type: 'digit',
						placeholder: 'KG',
					}, {
						title: '职业：',
						value: null,
						type: 'text'
					}, {
						title: '星座：',
						value: null,
						type: 'text'
					}, {
						title: '联络电话：',
						value: null,
						type: 'number'
					}]
				};
				let list = [];
				(new Array(num).fill(0)).map(s => {
					list.push(JSON.parse(JSON.stringify(t)))
				})
				this.nowData.question[this.nowIndex].list[index].subList = list
			},
			// 下一页
			toNext() {
				if(this.nowIndex > this.nowData.question.length-2){ //提交问卷
					return this.saveData()
				}
				let isOk = true
				this.nowData.question[this.nowIndex].list.map(item => {
					if (!item.value && item.required) {
						isOk = false
					}
					if (item.type == "radioNum") {
						if (!item.subList || !item.subList.length) isOk = false;
						item.subList && item.subList.map(sub => {
							sub.list.map(t => {
								t.required && !t.value && (isOk = false)
							})
						})
					}
					if (item.type == "inputs") {
						item.list.map(t => {
							t.required && !t.inputValue && (isOk = false)
						})
					}
				})
				if (!isOk) {
					return uni.showToast({
						title: '请填写完整后提交！',
						icon: 'none',
					})
				}
				this.nowIndex++
				uni.pageScrollTo({
				  scrollTop: 0,
				  duration: 0
				})
			},
			saveData(){
				saveQuestionPaper({
					paperName: this.nowData.title,
					paperDesc: this.nowData.title,
					paperType: this.nowData.status,
					paperContent: JSON.stringify(this.nowData.question),
					projectId: this.projectId,
					staffId: this.$store.state.userInfo.staffId,
				}).then(res=>{
					this.showDialog = true;
					stepNext({
						"projectId": this.projectId,
						"stepNum": this.status
					})
				})
			},
			hidePopup(){
				uni.redirectTo({
					url: '/pages/my/my'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.box {
		padding: 40rpx 40rpx env(safe-area-inset-bottom);
		overflow: hidden;
		min-height: 100vh;
		box-sizing: border-box;
		font-size: 32rpx;
		color: rgba(128, 128, 128, 1);
		border-top: 1px solid #F7F7F7;

		.box-title {
			text-align: center;
			font-size: 72rpx;
			line-height: 100rpx;
			color: rgba(0, 0, 0, 1);
		}
		
		.box-subtitle{
			font-weight: bold;
			font-size: 32rpx;
			color: rgba(0, 0, 0, 1);
			line-height: 100rpx;
		}

		.box-tip {
			font-size: 22rpx;
			color: #616161;
			line-height: 60rpx;
			text-align: center;
		}

		.box-top {
			line-height: 60rpx;
			text-align: center;
			background: #fff;
			margin: 0 20rpx 30rpx;
			overflow: hidden;
			border-radius: 30rpx;
			padding:0 15rpx 20rpx;
			font-size: 32rpx;
			.box-top-content {
				margin-top: 30rpx;
			}

			.box-top-btn {
				border-radius: 140rpx;
				background: rgba(0, 186, 173, 1);
				font-size: 56rpx;
				color: #FFFFFF;
				line-height: 140rpx;
				width: 316rpx;
				margin-top: 30rpx;
			}

			
		}
		
		.box-top-img {
			width: 316rpx;
			height: 316rpx;
			display: block;
			margin: 30rpx auto 0;
		}

		.box-content {
			.box-title {
				border-bottom: 1px solid #F7F7F7;
				margin-bottom: 60rpx;
			}
			
			.box-content-tip{
				text-align: center;
				padding: 0rpx 40rpx;
				line-height: 45rpx;
			}
			.supplement-box{
				background: #fff;
				padding: 0 20rpx;
				color: rgba(56, 56, 56, 1);
				border-radius: 10rpx;
				.supplement-title{
					border-bottom: 1px solid rgba(229, 229, 229, 1);
					padding: 20rpx 0;
				}
				.box-textarea{
					color: #000;
					min-height: 500rpx;
					padding-top: 20rpx;
				}
			}
			.box-content-btn {
				font-size: 56rpx;
				background: rgba(0, 186, 173, 1);
				width: 316rpx;
				line-height: 140rpx;
				text-align: center;
				border-radius: 140rpx;
				margin: 40rpx auto;
				color: #fff;
			}

			.box-view {
				background: #fff;
				overflow: hidden;
				border-radius: 10rpx;
				padding: 16rpx 40rpx;
				margin-bottom: 40rpx;
				box-shadow: 0rpx 4rpx 30rpx rgba(229, 229, 229, 0.25);
				.box-view-title {
					line-height: 60rpx;
					font-size: 40rpx;
					color: rgba(56, 56, 56, 1);
				}

				.box-view-subtitle {
					font-size: 32rpx;
					color: #a6a6a6;
				}

				.box-view-content {
					font-size: 32rpx;
					color: rgba(128, 128, 128, 1);
					padding-top: 20rpx;
					.box-radio {
						.box-label {
							margin: 15rpx  0;
							min-width: 195rpx;
							padding-right: 20rpx;
							box-sizing: border-box;
							radio,
							checkbox {
								transform: scale(0.9)
							}

							.box-radio-input {
								input {
									border-bottom: 1px solid #E5E5E5;
									padding-left: 20rpx;
								}
							}
						}
					}

					.box-view-other {
						margin-top: 40rpx;
						.box-view-title{
							
						}
						.box-other-item {
							line-height: 86rpx;
							padding-left: 20rpx;
							border-bottom: 1px solid #E5E5E5;
							input {
								padding-left: 20rpx;
							}
						}
					}

					.box-inputs-item {
						padding: 15rpx 0;

						input {
							border-bottom: 1px solid #E5E5E5;
							padding: 0 10rpx;
						}
						.box-inputs-item-tip{
							font-size: 32rpx;
							color: rgba(166, 166, 166, 1);
						}
					}

					.box-textarea {
						padding: 15rpx 0;
						border-top: 1px solid #E5E5E5;
						min-height: 440rpx;
					}
					
					.star-box{
						padding-top: 20rpx;
						.star-item{
							border-radius: 100%;
							border: 1px solid rgba(201, 201, 201, 1);
							width: 40rpx;
							height: 40rpx;
							margin: 0 20rpx;
							&.star-item-active{
								background: rgba(204, 232, 144, 1)
							}
							&.star-item-1{
								width: 60rpx;
								height: 60rpx;
								border-color: rgba(177, 128, 186, 1);
								&.star-item-active{
									background: rgba(177, 128, 186, 1);
								}
							}
							&.star-item-2{
								width: 50rpx;
								height: 50rpx;
								border-color: rgba(177, 128, 186, 1);
								&.star-item-active{
									background: rgba(177, 128, 186, 1);
								}
							}
							&.star-item-3{
								width: 50rpx;
								height: 50rpx;
								border-color: rgba(22, 153, 15, 1);
								&.star-item-active{
									background: rgba(22, 153, 15, 1);
								}
							}
							&.star-item-4{
								width: 60rpx;
								height: 60rpx;
								border-color: rgba(22, 153, 15, 1);
								&.star-item-active{
									background: rgba(22, 153, 15, 1);
								}
							}
						}
					}
					.star-box-text{
						width: 450rpx;
						margin: 20rpx auto;
					}
				}
			}
			
		}
		.dialog-box{
			background: #fff;
			width: 690rpx;
			border-radius: 40rpx;
			text-align: center;
			line-height: 60rpx;
			font-size: 30rpx;
			box-sizing: border-box;
			padding: 0 30rpx 30rpx;
			color: rgba(56, 56, 56, 1);
			.dialog-title{
				font-size: 68rpx;
				line-height: 100rpx;
				margin-bottom: 20rpx;
			}
			.dialog-box-btn{
				font-size: 56rpx;
				background: rgba(0, 186, 173, 1);
				width: 316rpx;
				line-height: 140rpx;
				text-align: center;
				border-radius: 140rpx;
				margin: 50rpx auto 0;
				color: #fff;
			}
		}
	}
</style>