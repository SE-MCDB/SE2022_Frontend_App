import axios from '@/config/requestConfig.js';

import{
	picUrl,
} from '@/api/common.js'

//清洗result格式的函数
function purifyKeys(item){
	return {
		key: item.order_id,								//订单id，用于vue前端设置key
		ename: item.need.enterprise_name,				//企业名称
		description: item.need.enterprise_description,	//企业描述
		headpic: picUrl + item.need.enterprise_pic,		//企业头像url地址
		title: item.need.title,							//需求名称
		time: item.end_time,							//时间
	}
}

// 获得已经完成的订单
export const getFinishedOrder = async (uid) => {
	console.log("getFinishedOrder")
	let result = await axios.get('user/' + uid + '/order/finished')
	result = result.data
	
	//清洗数据格式
	if(result && result.length){
		result = result.map((item)=>{
			return purifyKeys(item)
		})
	}
	//否则返回空值
	return result
}

// 获得进行中的订单
export const getCooperatingOrder = async (uid) => {
	console.log("getCooperatingOrder")
	let result = await axios.get('user/' + uid + '/order/cooperating')
	result = result.data
	
	//清洗数据格式
	if(result && result.length){
		result = result.map((item)=>{
			return purifyKeys(item)
		})
	}
	//否则返回空值
	return result
}

// 获得待处理的订单
export const getPendingOrder = async (uid) => {
	console.log("getPendingOrder")
	let result = await axios.get('user/' + uid + '/order/cooperating')
	result = result.data
	
	//清洗数据格式
	if(result && result.length){
		result = result.map((item)=>{
			return purifyKeys(item)
		})
	}
	//否则返回空值
	return result
}

// 获得全部订单
export const getAllOrder = async (uid) => {
	console.log("getAllOrder")
	let result = await axios.get('user/' + uid + '/order/cooperating')
	result = result.data
	
	//清洗数据格式
	if(result && result.length){
		result = result.map((item)=>{
			return purifyKeys(item)
		})
	}
	//否则返回空值
	return result
}


/****** 以下为专家操作 *****/

// 接受某订单
export const acceptOrder = async (uid,id) => {
	console.log("getacceptOrder")
	let headers = {
		"Authorization":'Bearer ' + uni.getStorageSync('token')
	}
	let result = await axios.post('user/' + uid + '/order/' + id + '/accept',{},headers)
	
	
	
	//todo 是否操作成功？
	
	

	return result
}

// 拒绝某订单
export const rejectOrder = async (uid,id) => {
	console.log("getrejectOrder")
	let headers = {
		"Authorization":'Bearer ' + uni.getStorageSync('token')
	}
	let result = await axios.post('user/' + uid + '/order/' + id + '/refuse',{},headers)		//为啥不叫reject？？好别扭
	
	
	
	//todo 是否操作成功？
	
	

	return result
}

export const accomplishOrder = async (uid,id) => {
	console.log("getaccomplishOrder")
	let headers = {
		"Authorization":'Bearer ' + uni.getStorageSync('token')
	}
	let result = await axios.post('user/' + uid + '/order/' + id + '/finish',{},headers)		//为啥不叫reject？？好别扭
	
	console.log(result.error_msg)
	
	//todo 是否操作成功？
	
	

	return result
}