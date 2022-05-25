<template>
	<view class="my-evaluations" v-if='this.flag==1'>
		<uni-section subTitle="显示你最近的评价" title="我的评价" type="line" >
			<view v-if="this.userInfo.type==5">
			<uni-card v-for='(eva,index) in rateList' :key="index" :is-shadow='false' :title="eva.expert.expert_name" :extra="eva.rate.datetime" :sub-title="eva.order.order_name" :thumbnail='eva.expert.expert_icon'>
				<uni-collapse v-model="value">
				<uni-collapse-item :show-animation="true" title="评价详情">
				<view>
				
				
				<uni-forms-item label="合作体验">
					<uni-rate  :value="eva.rate.rate_taste" :readonly="true" :is-fill="false"/>
				</uni-forms-item>
				<uni-forms-item label="完成速度">
					<uni-rate  :value="eva.rate.rate_speed" :readonly="true" :is-fill="false"/>
				</uni-forms-item>
				<uni-forms-item label="专业水准">
					<uni-rate  :value="eva.rate.rate_level" :readonly="true" :is-fill="false"/>
				</uni-forms-item>
				<uni-forms-item label="具体评价">
					<text class='uni-body' v-if='eva.rate.description'>{{eva.rate.description}}</text>
					<text class='uni-body' v-else>无</text>
				</uni-forms-item>
				</view>
				</uni-collapse-item>
				</uni-collapse>
			</uni-card>
			</view>
		</uni-section>
		
	</view>
	<view class="mystyle u-f-ajc animated fadeIn" v-else>
		<image src="/static/images/toast/no-data-03.jpg" 
			mode="widthFix"></image>
		<!-- <text>暂无数据</text> -->
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import {postEvaluation,orderToEvaluation,idToEvaluation} from '@/api/postEvaluation.js'
	import{ picUrl, } from '@/api/common.js'
	export default {
		async onLoad(){
			this.init()
		},
		computed: { ...mapState(['userInfo']) },
		data() {
			return {
				value:true,
				rateList:[],
				flag:-1,
			}
		},
		methods: {
			async init(){
				let result = await idToEvaluation(this.userInfo.id)
				if(result && result.code){
					
				}else{
					
					this.flag = result.flag
					this.rateList = result.data
					console.log(result.flag)
					console.log(this.rateList[0].rate.rate_taste)
				}
			},
		}
	}
</script>

<style>
	.my-evaluations{
		
		background-color: #F1F1F1;
		
		margin-left: 10upx;
		margin-right: 10upx;
	}
</style>
