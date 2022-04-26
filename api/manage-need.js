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

export const deleteNeed =async (company_id, id) => {
	console.log("deleteNeed")
	let headers = {
		"Authorization":'Bearer ' + uni.getStorageSync('token')
	}
	let result = await axios.delete('user/' + company_id + "/need/" + id, {}, headers)
	return result
}

export const endNeed =async (company_id, id) => {
	console.log("endNeed")
	let headers = {
		"Authorization":'Bearer ' + uni.getStorageSync('token')
	}
	let result = await axios.post('user/' + company_id + "/need/" + id + "/finish", {}, headers)
	return result
}