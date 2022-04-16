<template>
	<view>
		<!--导航栏-->
		<swiper-tab-head :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="tabtap"></swiper-tab-head>
		
		<!--搜索框-->
		<myNavBar v-if = "tabIndex == 1" @signIn="signIn"></myNavBar>
	</view>
</template>

<script>
	import indexList from "@/components/index/index-list.vue";
	import swiperTabHead from "@/components/index/swiper-tab-head.vue";
	import myNavBar from "@/components/common/my-nav-bar.vue";
	import uniCalendar from '@/components/uni-calendar/uni-calendar.vue'
	import card from '@/components/list-card/list-card-1.vue'
	import loadMore from "@/components/common/load-more.vue";
	import time from '@/common/time.js'
	import noThing from "@/components/common/no-thing.vue";
	import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue'
	import Vue from 'vue'
	export default {
		components: {
			indexList,
			swiperTabHead,
			loadMore,
			noThing,
			myNavBar,
			card
		},
		data() {
			return {
				swiperheight: 500,
				tabIndex: 1,
				shoNo: false,
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
					this.newslist[this.tabIndex].loadtext = "没有更多数据了";
					return
				}
				this.newslist[this.tabIndex].list = items
				if (items) {
					this.newslist[this.tabIndex].loadtext = "没有更多数据了";
				}else{
					this.newslist[this.tabIndex].loadtext = "上拉加载更多";
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