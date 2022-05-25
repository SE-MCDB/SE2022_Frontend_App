import axios from '../config/requestConfig.js';

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