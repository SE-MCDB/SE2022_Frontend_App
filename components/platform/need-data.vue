<template>
	<view>
		<!-- 顶端三栏导航-->
		<swiper-tab-head :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="tabtap" scrollItemStyle="width:33.33%;"></swiper-tab-head>
		
		<!-- bar1:已完成/全部 -->
		<view v-if="tabIndex == 0">	
			<uni-section title="全部订单" type="line" >
				<uni-card v-for="item in datalist1" :title="item.title" :sub-title="item.subtitle" :extra="item.extra" :thumbnail="item.img" @click="onClick">
					<text class="uni-body">这是一个带头像和双标题的基础卡片</text>
					<!-- 底部功能组件 -->
					<view slot="actions" class="card-actions no-border">
						<view class="card-actions-item" @click.stop="actionsClick('分享')">	<!--加stop修饰阻止事件继续冒泡传播-->
							<uni-icons type="redo" size="18" color="#999"></uni-icons>
							<text class="card-actions-item-text">分享</text>
						</view>
						<view class="card-actions-item" @click.stop="actionsClick('评价')">	<!--加stop修饰阻止事件继续冒泡传播-->
							<uni-icons type="chatbubble" size="18" color="#999"></uni-icons>
							<text class="card-actions-item-text">评价</text>
						</view>
						<view class="card-actions-item" @click.stop="actionsClick('再来一单')">	<!--加stop修饰阻止事件继续冒泡传播-->
							<uni-icons type="cart" size="18" color="#999"></uni-icons>
							<text class="card-actions-item-text">再来一单</text>
						</view>
					</view>
				</uni-card>
			</uni-section>
			<!-- <tui-card v-for="item in datalist1" :image="item.img" :title="item.title" :tag="item.tag" :header="item.header">
				<template v-slot:body>
					<tui-bubble-popup  :show ="show[item.id]" :mask="false" position="absolute" direction="bottom" @close="closeshow" translateX="0px" translateY="50px">
							<view class="tui-menu-item u-f-ac" @click="print(item.id)"> 查看详情 </view>
							
					</tui-bubble-popup>
					<view class="tui-default" @click="print(item.id)">
						我是主体
					</view>
				</template>
				<template v-slot:footer>
					<view class="tui-default" @click="print(item.id)">
						更多选项↓
					</view>
				</template>
			</tui-card> -->
		</view>

		
		<!--bar2:进行中 -->
		<view v-else-if="tabIndex == 1">
			<uni-section title="进行中订单" type="line" >
				<uni-card v-for="item in datalist2" :title="item.title" :sub-title="item.subtitle" :extra="item.extra" :thumbnail="item.img" 
				@click="onClick">
					<text class="uni-body">这是一个带头像和双标题的基础卡片</text>
					<!-- 底部功能组件 -->
					<view slot="actions" class="card-actions no-border">
						<view class="card-actions-item" @click.stop="actionsClick('完成订单')">	<!--加stop修饰阻止事件继续冒泡传播-->
							<uni-icons type="medal" size="18" color="#999"></uni-icons>
							<text class="card-actions-item-text">完成订单</text>
						</view>
						<view class="card-actions-item" @click.stop="actionsClick('放弃订单')">	<!--加stop修饰阻止事件继续冒泡传播-->
							<uni-icons type="link" size="18" color="#999"></uni-icons>
							<text class="card-actions-item-text">放弃订单</text>
						</view>
						<view class="card-actions-item" @click.stop="actionsClick('帮助')">	<!--加stop修饰阻止事件继续冒泡传播-->
							<uni-icons type="help" size="18" color="#999"></uni-icons>
							<text class="card-actions-item-text">帮助</text>
						</view>
					</view>
				</uni-card>
			</uni-section>
		</view>
		
		<!-- bar3:待处理 -->
		<view v-else>
			<uni-section title="待处理订单" type="line" >
				<uni-card v-for="item in datalist3" :title="item.title" :sub-title="item.subtitle" :extra="item.extra" :thumbnail="item.img" @click="onClick">
					<text class="uni-body">这是一个带头像和双标题的基础卡片</text>
					<!-- 底部功能组件 -->
					<view slot="actions" class="card-actions no-border">
						<view class="card-actions-item" @click.stop="actionsClick('拒绝订单')">	<!--加stop修饰阻止事件继续冒泡传播-->
							<uni-icons type="closeempty" size="18" color="#999"></uni-icons>
							<text class="card-actions-item-text">拒绝订单</text>
						</view>
						<view class="card-actions-item" @click.stop="actionsClick('接受订单')">	<!--加stop修饰阻止事件继续冒泡传播-->
							<uni-icons type="checkmarkempty" size="18" color="#999"></uni-icons>
							<text class="card-actions-item-text">接受订单</text>
						</view>
					</view>
				</uni-card>
			</uni-section>
		</view>
	</view>
	
	
</template>

<script>
	//关于需求平台各类型需求订单主界面的样式
	import uniCard from '@/components/uni-card/uni-card.vue'
	import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue'
	import swiperTabHead from "@/components/index/swiper-tab-head.vue";
	import tuiCard from "@/components/thorui/tui-card/tui-card"
	import tuiSwipeAction from "@/components/thorui/tui-swipe-action/tui-swipe-action"
	import tuiBubblePopup from "@/components/thorui/tui-bubble-popup/tui-bubble-popup"
	import tuiIcon from "@/components/thorui/tui-icon/tui-icon"
	
	export default {
		data(){
			return{
				show:[],
				tabIndex: 0,
				tabBars: [
					{
						name: "全部",
						id: "quanbu",
						page: 1
					},
					// {
					// 	name: "已完成",
					// 	id: "yiwancheng",
					// 	page: 1
					// },
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
			tuiIcon,
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
			onClick(){
				console.log("click for detail")
				//todo
			},
			print(id){
				if(this.show[id]==true){
					this.show.splice(id,1,false);
					
				}
				else{
					this.show.splice(id,1,true);
				}
				console.log(id+"success "+this.show[id]);
			},
			initData(){
				this.datalist1 = [];	//已完成 全部
				this.datalist2 = [];	//进行中
				this.datalist3 = [];	//待处理
				this.randIdPool = ["CSDN云社区", "Zhihu小管家", "微博Bot", "Siri"]
				
				if(this.userInfo && this.userInfo.id){
					for(var i=1;i<=10;i++){
						this.show[i]=false;
						let a={
							// id:i,
							// img: {
							// 	url: this.userInfo.userpic,
							// 	circle:true,
							// },
							// title: {
							// 	text: this.randIdPool[Math.floor(Math.random() * this.randIdPool.length)],
							// 	size: 34,
							// },
							// tag: {
							// 	text: parseInt(Math.random()*(23+1),10)+"小时前",
							// 	color: '#ed3f14',
							// 	size: 26,
							// },
							// header: {
							// 	bgcolor: '#f7f7f7',
							// 	line: true,
							// },
							
							id:i,
							img: this.userInfo.userpic,
							title: this.randIdPool[Math.floor(Math.random() * this.randIdPool.length)],
							extra: parseInt(Math.random()*(23+1),10)+"小时前",
						};
						Math.random() < 0.5 ? this.datalist1.push(a): 1;
						Math.random() < 0.5 ? this.datalist2.push(a): 1;
						Math.random() < 0.5 ? this.datalist3.push(a): 1;
					}
				}
			},
			actionsClick(str){
				switch(str){
					case "拒绝订单":
						console.log(str)
						break;
					case "接受订单":
						console.log(str)
						break;
					case "分享":
						console.log(str)
						break;
					case "评价":
						console.log(str)
						break;
					case "再来一单":
						console.log(str)
						break;
					case "完成订单":
						console.log(str)
						break;
					case "放弃订单":
						console.log(str)
						break;
					case "帮助":
						console.log(str)
						break;	
					default:
						break;
				}
			}
		}
	}
</script>

<style scoped>
/* .need-data{ 
	padding: 20upx 40upx;
}
.need-data>view{
	color: #989898;
}
.need-data>view>view{
	font-size: 32upx;
	color: #333333;
}
.tui-menu-item{
	size:400upx;
}
.u-f-ac{
	font-size:30upx;
	text-align: center;
} */
</style>
