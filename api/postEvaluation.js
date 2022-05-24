import axios from '../config/requestConfig.js';

export const postEvaluation = async (data) => {
	console.log("postEvaluation");
	let result = await axios.post('order/rate', {"formData":data});
	return result;
}