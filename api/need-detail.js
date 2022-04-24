import axios from '@/config/requestConfig.js';
import time from '../common/time.js';

import {
	picUrl
} from './common.js'

export const  getNeedDetail =async (id) => {
	console.log("id is" + id)
	console.log("getNeedDetail")
	let headers = {
		"Authorization":'Bearer ' + uni.getStorageSync('token')
	}
	let result = await axios.get('need/'+ id, {}, headers)
	// console.log("result is:" + result)
	return result
}