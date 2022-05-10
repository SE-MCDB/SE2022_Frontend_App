import axios from '@/config/requestConfig.js'
import time from '../common/time.js'

import { picUrl } from './common.js'

//清洗result函数的格式
function purifyKeys(item){
	let purified_result = {
		cites: '引用次数：' + item.cites,	//引用次数
		pyear: String(item.pyear),		//发表年限
		title: item.title,		//发表年限
		subtitle: '副标题'
	}
	if(purified_result.pyear === 'undefined' || purified_result.pyear === null || purified_result.pyear === ''){
		purified_result.pyear = '未知'
	}

	return purified_result
}

export const getExpertInfo = async uid => {
	console.log('getExpertInfo')
	let headers = { 'Authorization':'Bearer ' + uni.getStorageSync('token') }
	
	console.log(uid)
	
	let result = await axios.get('expert/' + uid, { 'tab':'papers', }, headers)
	
	result = result.data
	
	// console.log(result)
	
	//清洗数据格式
	if(result && result.length){
		result = result.map(item=>{
			return purifyKeys(item)
		})
	}
	
	
	return result
}