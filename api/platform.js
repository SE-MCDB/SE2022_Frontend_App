import axios from '@/config/requestConfig.js';
import time from '../common/time.js';

import {
	picUrl
} from './common.js'

export const  getAllNeed =async () => {
	let headers = {
		"Authorization":'Bearer ' + uni.getStorageSync('token')
	}
	let result = await axios.get(url = 'platform', data = {}, headers)
	
	//result 参照接口文档
	if(result&&result.length){
		result = result.data
		// result = result.map((item)=>{
		// 	index = index + 1
		// 	return{
		// 		"need_id": item.need_id,
		// 		"title": item.title,
		// 		"description": item.description,
		// 		"valid_time": item.valid_time,
		// 		"field": item.field,
		// 		"state": item.state,
		// 		"emergancy": item.emergancy
		// 		"index": index
		// 	}
		// })
	}
	return result
}

export const  getAllList =async () => {
	let headers = {
		"Authorization":'Bearer ' + uni.getStorageSync('token')
	}
	let result = await axios.get(url = 'platform', data = {}, headers)
	
	//result 参照接口文档
	if(result&&result.length){
		result = result.data
	}
	return result
}

//获取已完成需求
export const  getFinishedNeed =async (data) => {
	let result = await axios.get(url = 'platform', data = {}, this.data)
	
	//result 参照接口文档
	if(result&&result.length){
		result = result.data
	}
	return result
}

//获取进行中需求
export const  getProcedingNeed =async (data) => {
	//TODO:如何传递参数进来
	let headers = {
		"Authorization":'Bearer ' + uni.getStorageSync('token')
	}
	let result = await axios.get(url = 'platform', data = {}, headers)
	
	//result 参照接口文档
	if(result&&result.length){
		result = result.data
		// result = result.map((item)=>{
		// 	index = index + 1
		// 	return{
				
		// 	}
		// })
	}
	return result
}

//发布新需求
export const  postNewNeed =async (data) => {
	//TODO:如何传递参数进来
	// let headers = {
	// 	"Authorization":'Bearer ' + uni.getStorageSync('token')
	// }
	let result = await axios.post(url = 'platform', data)
	
	//result 参照接口文档
	// if(result&&result.length){
	// 	result = result.data
	// 	// result = result.map((item)=>{
	// 	// 	index = index + 1
	// 	// 	return{
				
	// 	// 	}
	// 	// })
	// }
	return result
}

