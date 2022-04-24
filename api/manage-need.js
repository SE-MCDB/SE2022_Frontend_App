import axios from '@/config/requestConfig.js';

export const  manageUnfinishedNeed =async (id) => {
	console.log("id is:" + id)
	console.log("manageUnFinishedNeed")
	let headers = {
		"Authorization":'Bearer ' + uni.getStorageSync('token')
	}
	let result = await axios.get('user/' + id + "/need/proceeding", {}, headers)
	result = result.data
	return result
}

export const  manageFinishedNeed =async (id) => {
	console.log("manageFinishedNeed")
	let headers = {
		"Authorization":'Bearer ' + uni.getStorageSync('token')
	}
	let result = await axios.get('user/' + id + "/need/finished", {}, headers)
	result = result.data
	return result
}