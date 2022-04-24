<template>
	<view>
	<template v-if="userInfo&&userInfo.id">
		
		<!--导航栏-->
		<swiper-tab-head :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="tabtap" scrollItemStyle="width:50%;"></swiper-tab-head>
		<scroll-view
		 scroll-y class="list" refresher-enabled :refresher-triggered="refreshing" refresher-background="#fafafa"
		 enable-back-to-top :refresher-threshold="100" @refresherrefresh="onrefresh" >
			<!--搜索框-->
			<view v-if="tabIndex == 1 ">
				<view v-for="(item, index) in unfinisheditems" :key="index">
					<need-list :item="item" :index="index" @openDetail="openDetail" :edit="1" @editneed="editneed">
					</need-list>
				</view>
			</view>
			
			<!-- 需求订单统计 -->
			<view v-else-if="tabIndex == 0" >
				<view v-for="(item, index) in finisheditems" :key="index">
					<need-list :item="item" :index="index" @openDetail="openDetail">
					</need-list>
				</view>
			</view>
			<template v-else>
				<view class="u-f-ajc">
					登陆PaperDaily，体验更多功能
				</view>
				<view class="u-f-ajc" @tap="openLogin">
					账号密码登陆 
					<view class="icon iconfont icon-jinru">
						
					</view>
				</view>
			</template>
		</scroll-view>
	</template>
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
		mapState
	} from 'vuex'
	import {
		getUserProfile,
	} from "@/api/home.js"
	import {
		manageFinishedNeed,
		manageUnfinishedNeed
	} from "@/api/manage-need.js"
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
				islogin: false,
				swiperheight: 500,
				tabIndex: 0,
				shoNo: false,
				unfinisheditems: [],
				finisheditems: [],
				show: false,
				refreshing: false,
				tabBars: [{
						name: "已完成",
						id: "wode",
						page: 1
					},
					{
						name: "未完成",
						id: "faxian",
						page: 1
					},
				],
				
			}
		},
		
		onLoad() {
			console.log(this.userInfo)
			uni.getSystemInfo({
				success: (res) => {
					let height = res.windowHeight - uni.upx2px(100)
					this.swiperheight = height;
				}
			});
			console.log("-------------------Requesting")
			this.requestData()
			console.log("-------------------Request Success")
		},
		
		onShow() {
			console.log(this.userInfo)
			console.log("-------------------Requesting")
			this.requestData()
			console.log("-------------------Request Success")
		},
		
		// 监听导航按钮点击事件
		onNavigationBarButtonTap(e) {
			if (!this.userInfo.id) {
				uni.navigateTo({
					url: '../login/login',
				});
			}
			switch (e.index) {
				case 0:
					this.show = true;
					break;
			}
		},
		
		
		methods: {
			//获取需求数据
			async requestData(GoPage, Gotype) {
				let type = this.tabBars[this.tabIndex].id;
				try {
					if(this.tabIndex === 1){
						let unfinisheditems = await manageUnfinishedNeed(this.userInfo.id)
						this.unfinisheditems = unfinisheditems
					} else {
						let finisheditems = await manageFinishedNeed(this.userInfo.id)
						this.finisheditems = finisheditems
					}
					// console.log(items)
				} catch (e) {
					console.log(e)
					return
				}
			},
			openLogin() {
				uni.navigateTo({
					url: '../login/login'
				});
			},
			openDetail(item) {
				console.log("-----------------------------------openDetail")
				uni.navigateTo({
					url: '../need-detail/detail?id=' + item.need_id
				})
			},
			editneed(item) {
				console.log("------------------------------------rewrite need")
				uni.navigateTo({
					url: '../edit-need/edit-need?id=' + item.need_id
				})
			},
			goToRecommend() {
				
			},
			async onrefresh() {
				if (this.refreshing) return;
				this.refreshing = true;
				await this.requestData()
				setTimeout(() => {
					this.refreshing = false;
					uni.showToast({title:'已更新',duration:500})
				}, 200)
			},
			tabtap(index) {
				console.log("change index to " + index);
				this.tabIndex = index;
				this.requestData(this.tabBars[this.tabIndex].page, this.tabBars[this.tabIndex].id)
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
