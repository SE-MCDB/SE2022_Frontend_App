<template>
	<view>
		<!--导航栏-->
		<swiper-tab-head :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="tabtap"></swiper-tab-head>
		
		<!--搜索框-->
		<myNavBar v-if = "tabIndex == 1" @signIn="signIn"></myNavBar>
		
		<!-- <view class="uni-tab-bar">
			<swiper class="swiper-box" :style="{height:swiperheight+'px'}"
			 :current="tabIndex" @change="tabChange">
				<swiper-item v-for="(items,index) in demandslist" :key="index">
					<scroll-view 
					@scroll="handleScroll"
					 scroll-y class="list" refresher-enabled :refresher-triggered="refreshing" refresher-background="#fafafa"
					 enable-back-to-top :refresher-threshold="100" @refresherrefresh="onrefresh" >
						<!-- 内容列表 -->
						<!-- <template v-if="items.list.length>0 && tabIndex == 0">
							<block v-for="(item,index1) in items.list" :key="index1">
								<index-list 
								@likeOrTread="likeOrTread" @opendDetail="opendDetail" @share="share" :item="item" :userInfo="userInfo"
								 :index="index1"></index-list>
							</block> 
							<load-more :loadtext="items.loadtext"></load-more>
						</template>

						<template v-if="items.list.length>0 && tabIndex == 1">
							<view class="topic-list">
								<block v-for="(list,index1) in items.list" :key="index1">
									<card @opendDetail="opendDetail" :cardinfo="list" :index="index1"></card>
								</block>
							</view>
						</template>
						
						<template v-if="shoNo">
							<!-- 无内容默认 -->
							<!-- <no-thing></no-thing>
						</template>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view> -->
		
		
	</view>
</template>

<script>
	import indexList from "@/components/index/index-list.vue";
	import swiperTabHead from "@/components/index/swiper-tab-head.vue";
	//import loadMore from "../../components/common/load-more.vue";
	//import noThing from "../../components/common/no-thing.vue";
	import myNavBar from "@/components/common/my-nav-bar.vue";
	import uniCalendar from '@/components/uni-calendar/uni-calendar.vue'
	import card from '@/components/list-card/list-card-1.vue'
	
	import paperList from "@/components/paper/paper-list.vue";
	import loadMore from "@/components/common/load-more.vue";
	import paperLeftPopup from "@/components/paper/paper-left-popup.vue";
	import time from '@/common/time.js'
	import noThing from "@/components/common/no-thing.vue";
	import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue'
	import {	//获取话题、推荐
		getTopicList,
		getRecommendList
	} from '@/api/index.js'
	import {
		mapMutations,
		mapState,
		mapGetters,
		mapActions
		
	} from 'vuex'
	import {
		getChatList,
		deleteChat,
		updateChat,
		createSocket,
		readChatMsg
	} from '@/api/paper.js'
	import Vue from 'vue'
	export default {
		components: {
			indexList,
			swiperTabHead,
			loadMore,
			noThing,
			uniCalendar,
			myNavBar,
			card
		},
		data() {
			return {
				swiperheight: 500,
				tabIndex: 1,
				start:0,
				remain:3,
				end: 5,
				size: 400,
				// list 偏移量
				offset: 0,
				refreshing: false,
				shoNo: false,
				popupShow: false,
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
				demandslist: [{
						loadtext: "没有更多数据了",
						id: "recommend",
						list: []
					},
					{
						loadtext: "没有更多数据了",
						id: "hotList",
						list: []
					},
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
		
		methods: {
			//获取需求数据
			async requestData(GoPage, Gotype) {
				let type = this.tabBars[this.tabIndex].id;
				let items;
				try {
					if(this.tabIndex===1){
						items = await getTopicList()
					}else{
						items = await getRecommendList()
					}
					console.log(items)
				} catch (e) {
					console.log(e)
					return
				}
				
				if (items && items.length === 0) {
					this.tabBars[this.tabIndex].page = page
					this.demandslist[this.tabIndex].loadtext = "没有更多数据了";
					return
				}

				this.newslist[this.tabIndex].list = items
				if (items) {
					this.demandslist[this.tabIndex].loadtext = "没有更多数据了";
				}else{
					this.demandslist[this.tabIndex].loadtext = "上拉加载更多";
				}
			},
			// tabbar点击事件
			tabtap(index) {
				this.tabIndex = index;
			},
			// 滑动事件
			tabChange(e) {
				this.tabIndex = e.detail.current;
				this.requestData(this.tabBars[this.tabIndex].page, this.tabBars[this.tabIndex].id)
			},
		}
	}
</script>

<style>
	/* 隐藏scroll-view滚动条*/
	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}

</style>
