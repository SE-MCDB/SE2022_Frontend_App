import axios from '../config/requestConfig.js';
import{ picUrl, } from '@/api/common.js'

export const postEvaluation = async (data) => {
	console.log("postEvaluation");
	let result = await axios.post('order/rate', {"formData":data});
	return result;
}
export const orderToEvaluation = async (data) => {
	console.log("orderToEvaluation");
	let result = await axios.get('order/'+data+'/rate');
	return result;
}
export const idToEvaluation = async (data) => {
	console.log("idToEvaluation");
	let result = await axios.get('user/'+data+'/rate');
	if(result && result.code){
		console.log(result)
	}else{
		let x=0
		let l = result.data.length;
		for(x = 0;x<l;x++){
			result.data[x].expert.expert_icon = picUrl+result.data[x].expert.expert_icon
			result.data[x].enterprise.enterprise_icon = picUrl+result.data[x].enterprise.enterprise_icon
		}
	}
	return result;
}