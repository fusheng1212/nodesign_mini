import request from '@/utils/request.js'
import util from '@/utils/utils.js'
const PORT = '' //端口号
// 参数  借口命，请求方式，参数，请求头（默认application/json），是否显示加载中弹窗（默认true），是否显示加载结果弹窗（默认true），接口域名（默认HOST）

// 用户手机号登陆
export function loginByPhone(params){
	return request.globalRequest(`${PORT}/mini/customer/login`, 'POST',params)
}

// 获取用户信息
export function getProjectInfo(params){
	return request.globalRequest(`${PORT}/mini/project/getProjectInfo`, 'GET',params,"application/json",false,false)
}

// 问卷提交
export function saveQuestionPaper(params){
	return request.globalRequest(`${PORT}/mini/questionPaper/save`, 'POST',params)
}

// 项目状态流转
export function stepNext(params){
	return request.globalRequest(`${PORT}/mini/step/stepNext`, 'POST',params)
}

// 查询辅助事项列表
export function getMatters(params){
	return request.globalRequest(`${PORT}/mini/assistanceMatters/getList`, 'POST',params)
}
