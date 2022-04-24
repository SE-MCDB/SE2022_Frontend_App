import axios from '@/config/requestConfig.js';

import{
	picUrl,
} from '@/api/common.js'

// 获得已经完成的订单
export const getFinishedOrder = async (uid) => {
	console.log("getFinishedOrder")
	let result = await axios.get('user/' + uid + '/order/finished')
	result = result.data
	
	//清洗数据格式
	if(result && result.length){
		result = result.map((item)=>{
			return {
				ename: item.need.enterprise_name,			//企业名称
				description: item.need.title,				//企业描述
				headpic: picUrl + item.need.enterprise_pic,	//企业头像url地址
				time: item.end_time,						//时间
			}
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
			return {
				ename: item.need.enterprise_name,			//企业名称
				description: item.need.title,				//企业描述
				headpic: picUrl + item.need.enterprise_pic,	//企业头像url地址
				time: item.end_time,						//时间
			}
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
			return {
				ename: item.need.enterprise_name,			//企业名称
				description: item.need.title,				//企业描述
				headpic: picUrl + item.need.enterprise_pic,	//企业头像url地址
				time: item.end_time,						//时间
			}
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
			return {
				ename: item.need.enterprise_name,			//企业名称
				description: item.need.title,				//企业描述
				headpic: picUrl + item.need.enterprise_pic,	//企业头像url地址
				time: item.end_time,						//时间
			}
		})
	}
	//否则返回空值
	return result
}


/****** 以下为专家操作 *****/

// 接受某订单
export const acceptOrder = async (uid) => {
	console.log("getAllOrder")
	let result = await axios.get('user/' + uid + '/order/' + id + 'accept')
	
	
	
	//todo 是否操作成功？
	
	

	return result
}

// 拒绝某订单
export const rejectOrder = async (uid) => {
	console.log("getAllOrder")
	let result = await axios.get('user/' + uid + '/order/' + id + 'refuse')		//为啥不叫reject？？好别扭
	
	
	
	//todo 是否操作成功？
	
	

	return result
}