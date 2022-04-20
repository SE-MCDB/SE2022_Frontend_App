import axios from '@/config/requestConfig.js';



export const addneed = async (data) => {
	let headers = {
		"Authorization":'Bearer ' + uni.getStorageSync('token')
	}
	console.log("test");
	let result = await axios.post('need', data, headers)
	// console.log(result)
	if (result&&result.code) {
		console.log(result.error_msg);
		result = {}
	}
	return result
}