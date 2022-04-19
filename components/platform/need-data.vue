<template>
	<view>
		
		<swiper-tab-head :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="tabtap"></swiper-tab-head>
		<view v-if="tabIndex == 0">
			0
		</view>
		<view v-else-if="tabIndex == 1">
			1
		</view>
		<view v-else>
			2
		</view>
	</view>
	
	
</template>

<script>
	//关于需求平台各类型需求订单主界面的样式
	import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue'
	import swiperTabHead from "@/components/index/swiper-tab-head.vue";
	export default {
		data(){
			
			return{
				tabIndex: 0,
				tabBars: [{
						name: "已执行",
						id: "yizhixing",
						page: 1
					},
					{
						name: "待处理",
						id: "daichuli",
						page: 1
					},
					{
						name: "新请求",
						id: "xinqingqiu",
						page: 1
					},
				],
			}
		},
		components:{
			swiperTabHead,
		},
		props:{
			needdata:Array,
		},
		onShow(){
			
		},
		onLoad(){
			
		},
		methods:{
			tabtap(index) {
				this.tabIndex = index;
			},
			goToNeed(index){
				console.log(index)
				this.$emit("goToNeedInfo",index)
			},
		}
	}
</script>

<style scoped>
.need-data{ 
	padding: 20upx 40upx;
}
.need-data>view{
	color: #989898;
}
.need-data>view>view{
	font-size: 32upx;
	color: #333333;
}
</style>
