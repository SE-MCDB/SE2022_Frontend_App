import axios from '@/config/requestConfig.js';



export const addneed = async (data) => {
	let headers = {
		"Authorization":'Bearer ' + uni.getStorageSync('token')
	}
	let result = await axios.post('need', data, headers)
	// console.log(result)
	if (result&&result.code) {
		console.log(result.error_msg);
	}
	return result
}

export const saveneed = async (data) => {
	// let headers = {
	// 	"Authorization":'Bearer ' + uni.getStorageSync('token')
	// }
	// data.state = 2
	// let result = await axios.post('need/save/', data, headers)
	// // console.log(result)
	// if (result&&result.code) {
	// 	console.log(result.error_msg);
	// }
	let result = addneed(data)
	return result
}