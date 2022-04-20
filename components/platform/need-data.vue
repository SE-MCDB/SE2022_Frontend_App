<template>
	<view>
		
		<swiper-tab-head :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="tabtap" scrollItemStyle="width:33.33%;"></swiper-tab-head>
		
		<!-- bar1:已完成 -->
		<view v-if="tabIndex == 0">	
		
			<tui-card v-for="item in datalist1" :image="item.img" :title="item.title" :tag="item.tag" :header="item.header">
				
				<template v-slot:body>
					<tui-bubble-popup  :show ="show" :mask="false" position="absolute" direction="bottom" @close="closeshow" translateX="200px" translateY="32px">
							<view class="tui-menu-item" @click="temp(item.id)">菜单一</view>
							<view class="tui-menu-item">菜单二</view>
							<view class="tui-menu-item">菜单三</view>
					</tui-bubble-popup>
					<view class="tui-default">
						我是主体
						
					</view>
				</template>
				<template v-slot:footer>
					<view class="tui-default" @click="print">
						更多选项↓
					</view>
				</template>
				
			</tui-card>
		</view>
		
		<!-- bar2:进行中 -->
		<view v-else-if="tabIndex == 1">
			
			<tui-card v-for="item in datalist2" :image="item.img" :title="item.title" :tag="item.tag" :header="item.header" @click="print">
				
				<template v-slot:body>
					<view class="tui-default">
						Doing-默认卡片内容部分 slot=>body
					</view>
				</template>
				<template v-slot:footer>
					<view class="tui-default">
						
						Doing-默认卡片底部 slot=>footer
					</view>
				</template>
			</tui-card>
			
		</view>
		
		<!-- bar3:待处理 -->
		<view v-else>
			<tui-card v-for="item in datalist3" :image="item.img" :title="item.title" :tag="item.tag" :header="item.header" @click="print">
				<template v-slot:body>
					<view class="tui-default">
						Todo-默认卡片内容部分 slot=>body
					</view>
				</template>
				<template v-slot:footer>
					<view class="tui-default">
						Todo-默认卡片底部 slot=>footer
					</view>
				</template>
			</tui-card>
		</view>
	</view>
	
	
</template>

<script>
	//关于需求平台各类型需求订单主界面的样式
	import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue'
	import swiperTabHead from "@/components/index/swiper-tab-head.vue";
	import tuiCard from "@/components/thorui/tui-card/tui-card"
	import tuiSwipeAction from "@/components/thorui/tui-swipe-action/tui-swipe-action"
	import tuiBubblePopup from "@/components/thorui/tui-bubble-popup/tui-bubble-popup"
	export default {
		data(){
			
			return{
				show: false,
				tabIndex: 0,
				tabBars: [
					{
						name: "已完成",
						id: "yiwancheng",
						page: 1
					},
					{
						name: "进行中",
						id: "jinxingzhong",
						page: 1
					},
					{
						name: "待处理",
						id: "daichuli",
						page: 1
					},
				],
				actions:[
					{
						name:"删除",
						color: '#fff',
						fontsize: 30, //单位rpx
						width: 70, //单位px
						background: '#FD3B31',
					}
				],
			}
		},
		
		components:{
			swiperTabHead,
			tuiCard,
			tuiSwipeAction,
			tuiBubblePopup,
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
		
		created(){
			this.initData();
		},
		beforeMount(){
			
		},
		mounted(){
			
		},
		methods:{
			temp(id){
				console.log(id);
			},
			tabtap(index) {
				this.tabIndex = index;
			},
			goToNeed(index){
				console.log(index)
				this.$emit("goToNeedInfo",index)
			},
			closeshow(){
				this.show=false;
			},
			print(){
				if(this.show==true){
					this.show = false;
				}
				else{
					this.show = true;
				}
				console.log("success");
			},
			initData(){
				this.datalist1 = [];	//已完成
				this.datalist2 = [];	//进行中
				this.datalist3 = [];	//待处理
				this.randIdPool = ["CSDN云社区", "Zhihu小管家", "微博Bot", "Siri"]
				
				if(this.userInfo && this.userInfo.id){
					for(var i=1;i<=10;i++){
						let a={
							id:1,
							img: {
								url: this.userInfo.userpic,
								circle:true,
							},
							title: {
								text: this.randIdPool[Math.floor(Math.random() * this.randIdPool.length)],
								size: 34,
							},
							tag: {
								text: parseInt(Math.random()*(23+1),10)+"小时前",
								color: '#ed3f14',
								size: 26,
							},
							header: {
								bgcolor: '#f7f7f7',
								line: true,
							},
						};
						Math.random() < 0.5 ? this.datalist1.push(a): 1;
						Math.random() < 0.5 ? this.datalist2.push(a): 1;
						Math.random() < 0.5 ? this.datalist3.push(a): 1;
					}
				}
			}
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
