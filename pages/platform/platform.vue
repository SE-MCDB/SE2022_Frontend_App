<template>
	<view>
		<platform-create :show="show" @hide="hidepopup" @addneed="addneed">
		</platform-create>
		<!--导航栏-->
		<swiper-tab-head :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="tabtap"></swiper-tab-head>
		<swiper-item v-for="(items,index) in newslist" :key="index">
			<!--搜索框-->
			<view v-if="items.list.length>0 && tabIndex == 1">
				<myNavBar v-if = "tabIndex == 1" @signIn="signIn"></myNavBar>
				<scroll-view class="scroll" scroll-y="true">
					<view v-for="(item,index1) in items.list" :key="index1">
						<need-list 
						 :item="item" 
						 :index="index1"></need-list>
					</view>
				</scroll-view>
				<load-more :loadtext="items.loadtext"></load-more>
			</view>
			<!-- <view v-else-if="items.list.length==0 && tabIndex == 1">
				<no-thing></no-thing>
			</view> -->
			<view v-else>
				<scroll-view>
				</scroll-view>
			</view>
		</swiper-item>
		
		<!-- 需求订单统计 -->
		<view v-if="tabIndex == 0" >
			<need-data @goToNeedInfo="goToNeedInfo" :needdata="needdata"></need-data>
		</view>
	</view>
</template>

<script>
	import needList from "@/components/platform/need-list.vue";
	import needData from '@/components/platform/need-data.vue'
	import swiperTabHead from "@/components/index/swiper-tab-head.vue";
	import myNavBar from "@/components/common/my-nav-bar.vue";
	import uniCalendar from '@/components/uni-calendar/uni-calendar.vue'
	import card from '@/components/list-card/list-card-1.vue'
	import loadMore from "@/components/common/load-more.vue";
	import time from '@/common/time.js'
	import noThing from "@/components/common/no-thing.vue";
	import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue'
	import platformCreate from '@/components/platform/platform-create.vue'
	import {
		getAllNeed,
		postNewNeed
	} from '@/api/platform.js'
	import {
		mapState
	} from 'vuex'
	import {
		getUserProfile,
	} from "@/api/home.js"
	import Vue from 'vue'
	export default {
		components: {
			needList,
			needData,
			swiperTabHead,
			loadMore,
			noThing,
			myNavBar,
			card,
			platformCreate
		},
		computed: {
			...mapState(['userInfo'])
		},
		data() {
			return {
				swiperheight: 500,
				tabIndex: 1,
				shoNo: false,
				
				show: false,
				
				tabBars: [{
						name: "我的",
						id: "wode",
						page: 1
					},
					{
						name: "发现",
						id: "faxian",
						page: 1
					},
				],
				newslist: [{
						loadtext: "没有更多数据了",
						id: "wode",
						list: []
					},
					{
						loadtext: "没有更多数据了",
						id: "faxian",
						list: [],
						
					}
				],
				needdata:[
					{ name:"已执行", num:0 },
					{ name:"待处理", num:0 },
					{ name:"新请求", num:0 },
				],
				
			}
		},
		
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					let height = res.windowHeight - uni.upx2px(100)
					this.swiperheight = height;
				}
			});
			this.requestData()
		},
		
		// 监听导航按钮点击事件
		onNavigationBarButtonTap(e) {
			switch (e.index) {
				case 0:
					this.show = true;
					// this.hidepopup();
					break;
			}
		},
		
		methods: {
			//获取需求数据
			async requestData(GoPage, Gotype) {
				let type = this.tabBars[this.tabIndex].id;
				let items;
				// try {
				// 	if(this.tabIndex===1){
				// 		items = await getAllNeed()
				// 	}
				// 	console.log(items)
				// } catch (e) {
				// 	console.log(e)
				// 	// return
				// }
				items = [
							{
								"need_id": "0",
								"title": "也县它直则力",
								"description": "越角保类感太是接放林向育便省话候。具造育西只支积当书本志达示。八并他规究打有口采发外治主美你行。争历有复切根流八参元素受复报置之。会造油合然器亲王许张知话体称达八。习解极们切这构月火证文器就工头效命。",
								"valid_time": "1650031320",
								"field": "力",
								"state": 1,
								"emergancy": 0
							},
							{
								"need_id": "1",
								"title": "定由值节教保",
								"description": "心儿红器交七花再你及利建己龙越十对实。党时七际意除养月前压中运回展着。况当天条约南样你三了离解压思认。支权些实技习电样克美却根交报容但发。验型六经系深眼满当温作始展。红称单究志指须会必严导关习展团放。",
								"valid_time": "1650031320",
								"field": "才",
								"state": 0,
								"emergancy": 0
							},
							{
								"need_id": "2",
								"title": "世亲压次约",
								"description": "且从几效流切有规造但题义解务阶。场十离程火放积约万少根者国集进。只整地将金阶身或称研进从它府道体查行。第几张族住步条已验被进美老。争强公多说目达平下教质积包电。",
								"valid_time": "1650031320",
								"field": "后",
								"state": 0,
								"emergancy": 0
							},
							{
								"need_id": "3",
								"title": "世订单次约",
								"description": "且从几效流切有的风格。场十离程火放积约万少根者国集进。只整地将金阶身或称研进从它府道体查行。第几张族住步条已验被进美老。争强公多说目达平下教质积包电。",
								"valid_time": "1650471320",
								"field": "嘿嘿",
								"state": 0,
								"emergancy": 0
							}
						]
				if (items && items.length === 0) {
					this.tabBars[this.tabIndex].page = page
					this.newslist[this.tabIndex].loadtext = "没有更多数据了";
					return
				}
				this.newslist[this.tabIndex].list = items
				if (items) {
					this.newslist[this.tabIndex].loadtext = "没有更多数据了";
				}else{
					this.newslist[this.tabIndex].loadtext = "上拉加载更多";
				}
				return
			},
			goTop: function(e) {
				this.scrollTop = this.old.scrollTop
				this.$nextTick(() => {
					this.scrollTop = 0
				});
				uni.showToast({
					icon:"none",
					title:"纵向滚动 scrollTop 值已被修改为 0"
				})
			},
			upper: function(e) {
				console.log(e)
			},
			lower: function(e) {
				console.log(e)
			},
			tabtap(index) {
				this.tabIndex = index;
			},
			// 滑动事件
			tabChange(e) {
				this.tabIndex = e.detail.current;
				this.requestData(this.tabBars[this.tabIndex].page, this.tabBars[this.tabIndex].id)
			},
			initNavigation(e) {
				this.opcity = e.opcity;
				this.top = e.top;
			},
			hidepopup() {
				this.show = false;
			},
			showpopup() {
				this.show = true;
			},
			addneed() {
				uni.navigateTo({
					url: '../add-need/need'
				})
				this.hidepopup();
			},
			onShow() {
				if (this.userInfo.id) {
					if (!this.islogin) {
						this.initDat()
					}
				} else {
					this.needdata[0].num = 0
					this.needdata[1].num = 0
					this.needdata[2].num = 0
					this.islogin = false
				}
			
			},
			async mounted() {
				this.initDat()
				if (this.userInfo.id) {
					if (!this.islogin) {
						this.initDat()
					}
				} else {
					this.needdata[0].num = 0
					this.needdata[1].num = 0
					this.needdata[2].num = 0
					this.islogin = false
				}
			},
			async initDat() {
				if (this.userInfo && this.userInfo.id) {
					let userProfile = await getUserProfile()
					console.log(userProfile)
					this.needdata[0].num = userProfile.total_post
					this.needdata[1].num = userProfile.total_comment
					this.needdata[2].num = userProfile.total_mycollect
					this.islogin = true
				}
			},
			//跳转到各种类订单list
			goToNeedInfo(index) {
				console.log(index)
				switch (index) {
					case 0:
						console.log(this.userInfo);
						uni.navigateTo({
							url: '../user-space/user-space?uid=' + this.userInfo.id
						});
						
						break;
					case 1:
						uni.navigateTo({
							url: '../user-comment/user-comment?uid=' + this.userInfo.id
						});
						
						break;
					case 2:
						uni.navigateTo({
							url: '../user-collect/user-collect?uid=' + this.userInfo.id
						});
						
						break;
				}
			}
		}
	}
</script>

<style>
	/* 隐藏scroll-view滚动条 */
	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}
	/* need数据的style样式 */
	.need-statistic-data{
		background: #FFFFFF;
		position: relative;
		z-index: 10;
		border-top-left-radius: 20upx;
		border-top-right-radius: 20upx;
		margin-top: -15upx;
	}
</style>