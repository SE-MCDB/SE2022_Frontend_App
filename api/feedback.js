import axios from '@/config/requestConfig.js'

export const submitForm = async data => {
	console.log('submitForm')
	console.log(data)
	let result = await axios.post('user/feedback', data)
	return result
}