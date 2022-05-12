import axios from '@/config/requestConfig.js'
import time from '../common/time.js'

import { picUrl } from './common.js'

//清洗result函数的格式
function purifyPapers(item){
	let purified_result = {
		type: 0,	// 0=论文，1=专利，2=项目
		strType: '论文',
		title: item.title,		//发表年限
		pyear: String(item.pyear),		//发表年限
		cites: '引用次数：' + item.cites,	//引用次数
	}
	if(purified_result.pyear === 'undefined' || purified_result.pyear === null || purified_result.pyear === ''){
		purified_result.pyear = '未知年份'
	}
	return purified_result
}

function purifyPatents(item){
	let purified_result = {
		type: 1,	// 0=论文，1=专利，2=项目
		strType: '专利',
		title: item.title,		//发表年限
		pyear: String(item.pyear),		//发表年限
		url: item.url,
	}
	if(purified_result.pyear === 'undefined' || purified_result.pyear === null || purified_result.pyear === ''){
		purified_result.pyear = '未知年份'
	}
	return purified_result
}

function purifyProjects(item){
	let purified_result = {
		type: 2,	// 0=论文，1=专利，2=项目
		strType: '项目',
		title: item.title,		//发表年限
		pyear: item.startYead + '-' + item.endYear,		//发表年限
		url: item.url,
		level1: item.typeFirst,	//项目级别
		level2: item.typeSecond,	//项目级别
		level3: item.typeThird,	//项目级别
	}
	if(purified_result.pyear === 'undefined' || purified_result.pyear === null || purified_result.pyear === ''){
		purified_result.pyear = '未知年份'
	}
	return purified_result
}

export const getExpertInfo = async(uid, type) => {
	// type为papers、patents、projects三类
	console.log('getExpertInfo')
	let headers = { 'Authorization':'Bearer ' + uni.getStorageSync('token') }
	
	// console.log(uid)
	
	let result = await axios.get('expert/' + uid, { 'tab':type, }, headers)
	
	result = result.data
	
	// console.log(result)
	
	//清洗数据格式
	if(result && result.length){
		result = result.map(item=>{
			switch(type){
				case 'papers':
					return purifyPapers(item)
				case 'patents':
					return purifyPatents(item)
				case 'projects':
					return purifyProjects(item)
			}
			
		})
	}
	
	
	return result
}