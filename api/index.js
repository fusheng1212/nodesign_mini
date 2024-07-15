import request from '@/utils/request.js'
import util from '@/utils/utils.js'
const PORT = '' //端口号


// 获取验证码
export function getCode(params){
	return request.globalRequest(`${PORT}/SMS/send`, 'GET',params)
}

export function getMaterialList(params){
	return request.globalRequest(`${PORT}/mini/material/getMaterialList`, 'POST',params)
}

export function getCaseInfoList(params){
	return request.globalRequest(`${PORT}/mini/caseInfo/getList`, 'POST',params)
}

