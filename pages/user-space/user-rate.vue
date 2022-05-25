<template>
	<view class="my-evaluations" v-if='this.flag==1'>
		<view v-if='this.type==4'>
			
			<uni-section subTitle="" title="专家评分" type="circle" >
				<home-data :homedata="ratedata"></home-data>
			</uni-section>
		</view>
		<uni-section subTitle="显示最近的评价" title="全部评价" type="line" >
			<view v-if="this.type==5">
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
			<view v-else-if="this.type==4">
			<uni-card v-for='(eva,index) in rateList' :key="index" :is-shadow='false' :title="eva.enterprise.enterprise_name" :extra="eva.rate.datetime" :sub-title="eva.order.order_name" :thumbnail='eva.enterprise.enterprise_icon'>
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
	import homeData from '../../components/home/home-data.vue'
	import {getUserInfo} from '@/api/user-space.js'
	export default {
		props: {
			id:Number,
		},
		components: {
			
			homeData,
		},
		async mounted(){
			
			this.init()
		},
		computed: { ...mapState(['userInfo']) },
		data() {
			return {
				value:true,
				rateList:[
				],
				flag:-1,
				
				type:0,
				ratedata: [
					{
						name: '合作体验',
						num: 0
					},
					{
						name: '完成速度',
						num: 0
					},
					{
						name: '专业水平',
						num: 0
					},
				],
			}
		},
		methods: {
			async init(){
				if(this.id>0){
				let result = await idToEvaluation(this.id)
				let data = await getUserInfo({ 'user_id':this.id })
				this.type = data.type
				if(result && result.code){
					
				}else if(this.type==4){
					
					this.flag = result.flag
					this.rateList = result.data
					this.ratedata[0].num=result.avg.rate_taste
					this.ratedata[1].num=result.avg.rate_speed
					this.ratedata[2].num=result.avg.rate_level
					//console.log(this.ratedata[0].num)
					//console.log(this.rateList[0].rate.rate_taste)
				}else{
					this.flag = result.flag
					this.rateList = result.data
				}
				if(this.type==5 && this.id!=this.userInfo.id){
					this.flag=0
				}
				}
			},
			gotospace(){
				uni.navigateTo({ url: '../user-space/user-space?uid=' + this.id })
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
