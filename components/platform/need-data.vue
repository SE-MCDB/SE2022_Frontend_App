<template>
	<view>
		
		<swiper-tab-head :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="tabtap" scrollItemStyle="width:33.33%;"></swiper-tab-head>
		<view v-if="tabIndex == 0">
			
			<tui-card :image="a.img" :title="a.title" :tag="a.tag" @click="print">
				<template v-slot:body>
					<view class="tui-default">
						默认卡片内容部分 slot=>body
					</view>
				</template>
				<template v-slot:footer>
					<view class="tui-default">
						默认卡片底部 slot=>footer
					</view>
				</template>
			</tui-card>
			
			
			<tui-card :image="a.img" :title="a.title" :tag="a.tag" @click="print">
				<template v-slot:body>
					<view class="tui-default">
						默认卡片内容部分 slot=>body
					</view>
				</template>
				<template v-slot:footer>
					<view class="tui-default">
						默认卡片底部 slot=>footer
					</view>
				</template>
			</tui-card>
			
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
	import tuiCard from "@/components/thorui/tui-card/tui-card"
	
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
					
				a:{
					//OYK: userpic is undefined?
					 img: {
					 		url: this.userInfo.userpic,
					 		circle:true,
					 	},
					title: {
							text: 'CSDN云计算',
						},
					tag: {
							text: '1小时前',
						},
					header: {
							bgcolor: '#55ff7f',
							line: true,
						},
				},
			}
		},
		
		components:{
			swiperTabHead,
			tuiCard,
		},
		props:{
			needdata:Array,
			userInfo:Object,
		},
		onShow(){
			console.log(this.userInfo.userpic);
		},
		onLoad(){
			console.log(this.userInfo.userpic);
		},
		mounted(){
			console.log(this.userInfo);
		},
		methods:{
			tabtap(index) {
				this.tabIndex = index;
			},
			goToNeed(index){
				console.log(index)
				this.$emit("goToNeedInfo",index)
			},
			print(){
				console.log("success");
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
