import axios from '@/config/requestConfig.js'

export const manageUnfinishedNeed =async id => {
	console.log('manageUnFinishedNeed')
	let headers = { 'Authorization':'Bearer ' + uni.getStorageSync('token') }
	let result = await axios.get('user/' + id + '/need/proceeding', {}, headers)
	result = result.data
	return result
}

export const manageFinishedNeed =async id => {
	console.log('manageFinishedNeed')
	let headers = { 'Authorization':'Bearer ' + uni.getStorageSync('token') }
	
	let result = await axios.get('user/' + id + '/need/finished', {}, headers)
	result = result.data
	return result
}

export const manageUnissuedNeed =async id => {
	console.log('manageUnissuedNeed')
	let headers = { 'Authorization':'Bearer ' + uni.getStorageSync('token') }
	let result = await axios.get('user/' + id + '/need/saved', {}, headers)
	console.log(result)
	result = result.data
	// console.log("saved data should be:" + result)
	return result
}

export const deleteNeed =async (company_id, id) => {
	console.log('deleteNeed')
	let headers = { 'Authorization':'Bearer ' + uni.getStorageSync('token') }
	let result = await axios.delete('user/' + company_id + '/need/' + id, {}, headers)
	return result
}

export const endNeed =async (company_id, id) => {
	console.log('endNeed')
	let headers = { 'Authorization':'Bearer ' + uni.getStorageSync('token') }
	let result = await axios.post('user/' + company_id + '/need/' + id + '/finish', {}, headers)
	return result
}

// 推荐专家
export const expertRecommend =async id => {
	console.log('expertRecommend')
	let headers = { 'Authorization':'Bearer ' + uni.getStorageSync('token') }
	let result = await axios.get('need/' + id + '/expert_recommend', {}, headers)
	if (result && result.code) {
		console.log('error!')
	}
	return result
}

export const transformNeed =async (uid, id) => {
	console.log('transformNeed')
	let headers = { 'Authorization':'Bearer ' + uni.getStorageSync('token') }
	let result = await axios.post('user/'+ uid + '/need/' + id + '/transform', {}, headers)
	return result
}

export const aiRecommend =async id => {
	console.log('aiRecommend')
	let headers = { 'Authorization':'Bearer ' + uni.getStorageSync('token') }
	let result = await axios.get('ai/recommend/' + id, {}, headers)
	if (result && result.code) {
		console.log('error!')
	}
	return result
} 