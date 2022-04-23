import axios from '@/config/requestConfig.js';
import time from '../common/time.js';

import {
	picUrl
} from './common.js'

export const  getOrderDetail =async (id) => {
	console.log("getOrderDetail")
	let headers = {
		"Authorization":'Bearer ' + uni.getStorageSync('token')
	}
	let result = await axios.get('order/'+ id, {}, headers)
	//console.log("before result:" + result)
	//console.log("result is:" + result)
	return result
}