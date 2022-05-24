<template>
	<view class="my-evaluations" v-if='this.userInfo.type==5'>
		<uni-section subTitle="显示你最近的评价" title="我的评价" type="line" >
			<uni-card :is-shadow='false' title="123" extra="123" sub-title="123" :thumbnail='this.userInfo.userpic'>
				<uni-collapse v-model="value">
				<uni-collapse-item :show-animation="true" title="评价详情">
				<view>
				
				
				<uni-forms-item label="合作体验">
					<uni-rate  value="4" :readonly="true" :is-fill="false"/>
				</uni-forms-item>
				<uni-forms-item label="完成速度">
					<uni-rate  value="3" :readonly="true" :is-fill="false"/>
				</uni-forms-item>
				<uni-forms-item label="专业水准">
					<uni-rate  value="5" :readonly="true" :is-fill="false"/>
				</uni-forms-item>
				<uni-forms-item label="具体评价">
					<text class='uni-body'>123</text>
				</uni-forms-item>
				</view>
				</uni-collapse-item>
				</uni-collapse>
			</uni-card>
		</uni-section>
		
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	
	export default {
		computed: { ...mapState(['userInfo']) },
		data() {
			return {
				value:true,
			}
		},
		methods: {
			
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
