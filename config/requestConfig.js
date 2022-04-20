import request from "./request";

// let baseUrl=process.env.NODE_ENV === 'development'?"http://127.0.0.1:8000/api/":"http://127.0.0.1:8000/api/";
// let socketBaseUrl=process.env.NODE_ENV === 'development'?"ws://127.0.0.1:8000/api/":"ws://127.0.0.1:8000/api/";

<<<<<<< HEAD
let baseUrl=process.env.NODE_ENV === 'development'?"http://172.16.1.251:8000/api/":"http://172.16.1.251:8000/api/";
let socketBaseUrl=process.env.NODE_ENV === 'development'?"ws://172.16.1.251:8000/api/":"ws://172.16.1.251:8000/api/";
=======
let baseUrl=process.env.NODE_ENV === 'development'?"http://122.9.14.73:8000/api/":"http://122.9.14.73:8000/api/";
let socketBaseUrl=process.env.NODE_ENV === 'development'?"ws://122.9.14.73:8000/api/":"ws://122.9.14.73:8000/api/";
>>>>>>> 489af3c824c6a2fa88ee9e41c365f10e55583aef
//可以new多个request来支持多个域名请求

//let picUrl = "http://127.0.0.1:8000/api/"	统一管理，也许可替代api/common.js


let $http = new request({
	//接口请求地址
	baseUrl: baseUrl,
	//服务器本地上传文件地址
	fileUrl: baseUrl,
	websocket: socketBaseUrl,
	//设置请求头（如果使用报错跨域问题，可能是content-type请求类型和后台那边设置的不一致）
	headers: {
		'content-type': 'application/json;charset=UTF-8'
	},
	// {
	// 	"content-type":"application/x-www-form-urlencoded"
	// }
	
})
export default $http;