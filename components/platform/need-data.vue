<template>
	<view>

		<!-- 顶端多栏导航-->
		<swiper-tab-head :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="tabtap" scrollItemStyle="width:25%;">

		</swiper-tab-head>
		
		<!-- bar1:全部 -->
		<view v-if="tabIndex == 0">
			<uni-section title="全部订单" type="line" >
				<uni-card v-for="(item, index) in datalist1" :key="index" :title="item.entp_name" 
					:sub-title="item.description" :extra="item.time" :thumbnail="item.headpic" @click="openOrderDetail(item)">
					<text class="uni-body">{{item.title}}</text>
					<!-- 底部功能组件 -->
					
					<!-- state = 0, 待接受 -->
					<view v-if="item.state == 0" slot="actions" class="card-actions no-border u-f-ac u-f-jsb">	<!-- ac和jsb是设置横向+居中+两端对齐样式 -->
						<!-- 4 = 企业， 5 = 专家 -->
						<view v-if="userInfo.type == EXPERT" class="card-actions-item" @click.stop="actionsClick('拒绝订单', item)">	<!--加stop修饰阻止事件继续冒泡传播-->
							<uni-icons type="closeempty" size="18" color="#999"></uni-icons>
							<text class="card-actions-item-text">拒绝订单</text>
						</view>
						<view v-if="userInfo.type == EXPERT" class="card-actions-item" @click.stop="actionsClick('接受订单', item)">	<!--加stop修饰阻止事件继续冒泡传播-->
							<uni-icons type="checkmarkempty" size="18" color="#999"></uni-icons>
							<text class="card-actions-item-text">接受订单</text>
						</view>
						<view v-if="userInfo.type == EXPERT" class="card-actions-item" @click.stop="actionsClick('联系企业', item)">	<!--加stop修饰阻止事件继续冒泡传播-->
							<uni-icons type="chatboxes" size="18" color="#999"></uni-icons>
							<text class="card-actions-item-text">联系企业</text>
						</view>
						<view v-if="userInfo.type == ENTERPRISE" class="card-actions-item" @click.stop="actionsClick('催促专家', item)">	<!--加stop修饰阻止事件继续冒泡传播-->
							<uni-icons type="notification" size="18" color="#999"></uni-icons>
							<text class="card-actions-item-text">催促专家</text>
						</view>
						<view v-if="userInfo.type == ENTERPRISE" class="card-actions-item" @click.stop="actionsClick('联系专家', item)">	<!--加stop修饰阻止事件继续冒泡传播-->
							<uni-icons type="chatboxes" size="18" color="#999"></uni-icons>
							<text class="card-actions-item-text">联系专家</text>
						</view>
					</view>
					
					<!-- state = 1, 正在合作中 -->
					<view v-else-if="item.state == 1" slot="actions" class="card-actions no-border u-f-ac u-f-jsb">	<!-- ac和jsb是设置横向+居中+两端对齐样式 -->
						<view v-if="userInfo.type == ENTERPRISE" class="card-actions-item" @click.stop="actionsClick('完成订单', item)">	<!--加stop修饰阻止事件继续冒泡传播-->
							<uni-icons type="medal" size="18" color="#999"></uni-icons>
							<text class="card-actions-item-text">完成订单</text>
						</view>
						<view v-if="userInfo.type == ENTERPRISE" class="card-actions-item" @click.stop="actionsClick('放弃订单', item)">	<!--加stop修饰阻止事件继续冒泡传播-->
							<uni-icons type="link" size="18" color="#999"></uni-icons>
							<text class="card-actions-item-text">放弃订单</text>
						</view>
						<view class="card-actions-item" @click.stop="actionsClick('帮助', item)">	<!--加stop修饰阻止事件继续冒泡传播-->
							<uni-icons type="help" size="18" color="#999"></uni-icons>
							<text class="card-actions-item-text">帮助</text>
						</view>
					</view>
					
					<!-- state = 2+3, 已拒绝+已结束 -->
					<view v-else slot="actions" class="card-actions no-border u-f-ac u-f-jsb">	<!-- ac和jsb是设置横向+居中+两端对齐样式 -->
						<view class="card-actions-item" @click.stop="actionsClick('分享', item)">	<!--加stop修饰阻止事件继续冒泡传播-->
							<uni-icons type="redo" size="18" color="#999"></uni-icons>
							<text class="card-actions-item-text">分享</text>
						</view>
						<view class="card-actions-item" @click.stop="actionsClick('评价', item)">	<!--加stop修饰阻止事件继续冒泡传播-->
							<uni-icons type="chatbubble" size="18" color="#999"></uni-icons>
							<text class="card-actions-item-text">评价</text>
						</view>
						<view class="card-actions-item" @click.stop="actionsClick('再来一单', item)">	<!--加stop修饰阻止事件继续冒泡传播-->
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
		
		<!-- bar2:待处理 -->
		<view v-else-if="tabIndex == 1">	
			<uni-section title="待处理订单" type="line" >
				<uni-card v-for="(item, index) in datalist2" :key="index" :title="item.entp_name"
					:sub-title="item.description" :extra="item.time" :thumbnail="item.headpic" @click="openOrderDetail(item)">
					<text class="uni-body">{{item.title}}</text>
					<!-- 底部功能组件 -->
					<view slot="actions" class="card-actions no-border u-f-ac u-f-jsb">	<!-- ac和jsb是设置横向+居中+两端对齐样式 -->
						<!-- 4 = 企业， 5 = 专家 -->
						<view v-if="userInfo.type == EXPERT" class="card-actions-item" @click.stop="actionsClick('拒绝订单', item)">	<!--加stop修饰阻止事件继续冒泡传播-->
							<uni-icons type="closeempty" size="18" color="#999"></uni-icons>
							<text class="card-actions-item-text">拒绝订单</text>
						</view>
						<view v-if="userInfo.type == EXPERT" class="card-actions-item" @click.stop="actionsClick('接受订单', item)">	<!--加stop修饰阻止事件继续冒泡传播-->
							<uni-icons type="checkmarkempty" size="18" color="#999"></uni-icons>
							<text class="card-actions-item-text">接受订单</text>
						</view>
						<view v-if="userInfo.type == EXPERT" class="card-actions-item" @click.stop="actionsClick('联系企业', item)">	<!--加stop修饰阻止事件继续冒泡传播-->
							<uni-icons type="chatboxes" size="18" color="#999"></uni-icons>
							<text class="card-actions-item-text">联系企业</text>
						</view>
						<view v-if="userInfo.type == ENTERPRISE" class="card-actions-item" @click.stop="actionsClick('催促专家', item)">	<!--加stop修饰阻止事件继续冒泡传播-->
							<uni-icons type="notification" size="18" color="#999"></uni-icons>
							<text class="card-actions-item-text">催促专家</text>
						</view>
						<view v-if="userInfo.type == ENTERPRISE" class="card-actions-item" @click.stop="actionsClick('联系专家', item)">	<!--加stop修饰阻止事件继续冒泡传播-->
							<uni-icons type="chatboxes" size="18" color="#999"></uni-icons>
							<text class="card-actions-item-text">联系专家</text>
						</view>
					</view>
					
				</uni-card>
			</uni-section>
		</view>

		
		<!--bar3:进行中 -->
		<view v-else-if="tabIndex == 2">
			<uni-section title="进行中订单" type="line" >
				<uni-card v-for="(item, index) in datalist3" :key="index" :title="item.entp_name"
					:sub-title="item.description" :extra="item.time" :thumbnail="item.headpic" @click="openOrderDetail(item)">
					<text class="uni-body">{{item.title}}</text>
					<!-- 底部功能组件 -->
					<view slot="actions" class="card-actions no-border u-f-ac u-f-jsb">	<!-- ac和jsb是设置横向+居中+两端对齐样式 -->
						<view v-if="userInfo.type == ENTERPRISE" class="card-actions-item" @click.stop="actionsClick('完成订单', item)">	<!--加stop修饰阻止事件继续冒泡传播-->
							<uni-icons type="medal" size="18" color="#999"></uni-icons>
							<text class="card-actions-item-text">完成订单</text>
						</view>
						<view v-if="userInfo.type == ENTERPRISE" class="card-actions-item" @click.stop="actionsClick('放弃订单', item)">	<!--加stop修饰阻止事件继续冒泡传播-->
							<uni-icons type="link" size="18" color="#999"></uni-icons>
							<text class="card-actions-item-text">放弃订单</text>
						</view>
						<view class="card-actions-item" @click.stop="actionsClick('帮助', item)">	<!--加stop修饰阻止事件继续冒泡传播-->
							<uni-icons type="help" size="18" color="#999"></uni-icons>
							<text class="card-actions-item-text">帮助</text>
						</view>
					</view>
				</uni-card>
			</uni-section>
		</view>
		
		<!-- bar4:已完成 -->
		<view v-else>
			<uni-section title="已完成订单" type="line" >
				<uni-card v-for="(item, index) in datalist4" :key="index" :title="item.entp_name" 
					:sub-title="item.description" :extra="item.time" :thumbnail="item.headpic" @click="openOrderDetail(item)">
					<text class="uni-body">{{item.title}}</text>
					<!-- 底部功能组件 -->
					<view slot="actions" class="card-actions no-border u-f-ac u-f-jsb">	<!-- ac和jsb是设置横向+居中+两端对齐样式 -->
						<view class="card-actions-item" @click.stop="actionsClick('分享', item)">	<!--加stop修饰阻止事件继续冒泡传播-->
							<uni-icons type="redo" size="18" color="#999"></uni-icons>
							<text class="card-actions-item-text">分享</text>
						</view>
						<view class="card-actions-item" @click.stop="actionsClick('评价', item)">	<!--加stop修饰阻止事件继续冒泡传播-->
							<uni-icons type="chatbubble" size="18" color="#999"></uni-icons>
							<text class="card-actions-item-text">评价</text>
						</view>
						<view class="card-actions-item" @click.stop="actionsClick('再来一单', item)">	<!--加stop修饰阻止事件继续冒泡传播-->
							<uni-icons type="cart" size="18" color="#999"></uni-icons>
							<text class="card-actions-item-text">再来一单</text>
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
	
	//import tuiCard from "@/components/thorui/tui-card/tui-card"
	//import tuiSwipeAction from "@/components/thorui/tui-swipe-action/tui-swipe-action"
	//import tuiBubblePopup from "@/components/thorui/tui-bubble-popup/tui-bubble-popup"
	//import tuiIcon from "@/components/thorui/tui-icon/tui-icon"
	
	import tuiModal from "@/components/thorui/tui-modal/tui-modal"	//提示窗
	import tuiAlert from "@/components/thorui/tui-alert/tui-alert"	//提示窗
	
	//订单相关函数
	import {
		getFinishedOrder,
		getCooperatingOrder,
		getPendingOrder,
		getAllOrder,
		acceptOrder,
		rejectOrder,
	} from '@/api/platform/order.js'
	
	//需要用contact函数
	import {
		createContact
	} from "@/api/need-detail.js"
	
	export default {
		data(){
			return {
				EXPERT: 4,
				ENTERPRISE: 5,	//usertype的常量
				show:[],
				tabIndex: 1,
				tabBars: [
					{
						name: "全部",
						id: "quanbu",
						page: 1
					},
					{
						name: "待处理",
						id: "daichuli",
						page: 1
					},
					{
						name: "进行中",
						id: "jinxingzhong",
						page: 1
					},
					{
						name: "已完成",
						id: "yiwancheng",
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
			// tuiCard,
			// tuiSwipeAction,
			// tuiBubblePopup,
			// tuiIcon,
			// tuiModal,
		},
		props:{
			needdata: Array,
			userInfo: Object,
			//item:Object,	//关于odrder_list信息
		},
		onShow(){
			console.log("onshow");
		},
		onLoad(){
			console.log("onload");
		},
		created(){
			this.initData();
		},
		beforeMount(){
			
		},
		mounted(){
			
		},
		beforeUpdate(){
			
		},
		updated() {
			this.initData();
		},
		methods:{
			temp(id){
				console.log(id);
			},
			tabtap(index) {
				
				this.tabIndex = index;
				//this.initData()
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
			
			//打开订单详情
			openOrderDetail(orderItem){
				console.log("click for order detail. id = "+ orderItem.order_id)
				this.$emit("openOrderDetail", orderItem.order_id)
			},
			
			// initData(){
			// 	this.datalist1 = [];	//已完成 全部
			// 	this.datalist2 = [];	//进行中
			// 	this.datalist3 = [];	//待处理
			// 	this.randIdPool = ["CSDN云社区", "Zhihu小管家", "微博Bot", "Siri"]
				
			// 	if(this.userInfo && this.userInfo.id){
			// 		for(var i=1;i<=10;i++){
			// 			this.show[i]=false;
			// 			let a={
			// 				// id:i,
			// 				// img: {
			// 				// 	url: this.userInfo.userpic,
			// 				// 	circle:true,
			// 				// },
			// 				// title: {
			// 				// 	text: this.randIdPool[Math.floor(Math.random() * this.randIdPool.length)],
			// 				// 	size: 34,
			// 				// },
			// 				// tag: {
			// 				// 	text: parseInt(Math.random()*(23+1),10)+"小时前",
			// 				// 	color: '#ed3f14',
			// 				// 	size: 26,
			// 				// },
			// 				// header: {
			// 				// 	bgcolor: '#f7f7f7',
			// 				// 	line: true,
			// 				// },
							
			// 				id:i,
			// 				img: this.userInfo.userpic,
			// 				title: this.randIdPool[Math.floor(Math.random() * this.randIdPool.length)],
			// 				extra: parseInt(Math.random()*(23+1),10)+"小时前",
			// 			};
			// 			Math.random() < 0.5 ? this.datalist1.push(a): 1;
			// 			Math.random() < 0.5 ? this.datalist2.push(a): 1;
			// 			Math.random() < 0.5 ? this.datalist3.push(a): 1;
			// 		}
			// 	}
			// },
			
			async initData(){	//需要加async/await, 否则接口返回为一个Promise类型
				this.datalist1 = [];	//全部
				this.datalist2 = [];	//待处理
			 	this.datalist3 = [];	//进行中
				this.datalist4 = [];	//已完成

				this.datalist1 = await getAllOrder(this.userInfo.id)
				this.datalist2 = await getPendingOrder(this.userInfo.id)
				this.datalist3 = await getCooperatingOrder(this.userInfo.id)
				this.datalist4 = await getFinishedOrder(this.userInfo.id)
			},
			
			async actionsClick(str, item){
				
				let order_id = item.order_id
				switch(str) {
					case "拒绝订单":
						await acceptOrder(this.userInfo.id, order_id)
						console.log(str)
						break;
					case "接受订单":
						await rejectOrder(this.userInfo.id, order_id)
						console.log(str)
						break;
					case "联系企业": 
					case "联系专家":
						console.log(str)
						this.contact(item)
						break;
					case "帮助":
						uni.navigateTo({
							url:'../feedback/feedback'
						})
						console.log(str)
						break;
					case "分享":
						console.log(str)
						uni.showToast({title:'分享成功！', duration:500})
						break;
					case "评价":
						console.log(str)
						uni.showToast({title:'评价成功！', duration:500})
						break;
					case "再来一单":
						console.log(str)
						uni.showToast({title:'已反馈！', duration:500})
						break;
					case "完成订单":
						console.log(str)
						uni.showToast({title:'???', duration:500})
						break;
					case "放弃订单":
						console.log(str)
						uni.showToast({title:'???', duration:500})
						break;
					case "催促专家":
						console.log(str)
						uni.showToast({title:'已发送提醒！', duration:500})
						break;
					default:
						break;
				}
			},
			
			//跳转到联系对方聊天窗口
			contact(item) {
				if(this.userInfo.type == this.EXPERT) {
					//自己是企业，则联系专家
					var contact_id = item.entp_id	//不能用let!否则传不出 {} 区域
				} else {
					var contact_id = item.exp_id
				}
				
				//console.log("Cid = ", contact_id)

				uni.navigateTo({
					url:'../user-chat/user-chat?fid=' + contact_id
				})
			},

		}
	}
</script>

<style scoped>

</style>
