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
				
		// 	}
		// })
	}
	return result
}

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
				
		// 	}
		// })
	}
	return result
}

export const  getFinishedNeedOfEnterprise =async () => {
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