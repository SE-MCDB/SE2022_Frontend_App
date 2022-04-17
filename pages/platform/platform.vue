<template>
	<view>
		<!--导航栏-->
		<swiper-tab-head :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="tabtap"></swiper-tab-head>
		<swiper-item v-for="(items,index) in newslist" :key="index">
			<!--搜索框-->
			<scroll-view @scroll = "scroll"
			 scroll-y="true" class="list" 
			 :scroll-top="scrollTop" @scrolltoupper="upper" @scrolltolower="lower">
				<template v-if="items.list.length>0 && tabIndex == 1">
					<myNavBar v-if = "tabIndex == 1" @signIn="signIn"></myNavBar>
						<block v-for="(item,index1) in items.list" :key="index1">
							<need-list 
							@opendDetail="opendDetail" :item="item" 
							 :index="index1"></need-list>
						</block> 
					<load-more :loadtext="items.loadtext"></load-more>
				</template>
				<template v-else-if="items.list.length==0 && tabIndex == 1">
					<no-thing></no-thing>
				</template>
				<template v-else>
					<!-- <no-thing></no-thing> -->
					<scroll-view>
						<!-- <block v-for="(order, index1) in "> -->
					</scroll-view>
				</template>
			</scroll-view>
		</swiper-item>
	</view>
</template>

<script>
	import needList from "@/components/platform/need-list.vue";
	import swiperTabHead from "@/components/index/swiper-tab-head.vue";
	import myNavBar from "@/components/common/my-nav-bar.vue";
	import uniCalendar from '@/components/uni-calendar/uni-calendar.vue'
	import card from '@/components/list-card/list-card-1.vue'
	import loadMore from "@/components/common/load-more.vue";
	import time from '@/common/time.js'
	import noThing from "@/components/common/no-thing.vue";
	import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue'
	import {
		getAllNeed,
		postNewNeed
	} from '@/api/platform.js'
	import Vue from 'vue'
	export default {
		components: {
			needList,
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
				start:0,
				remain:3,
				end: 5,
				size: 400,
				// list 偏移量
				offset: 0,
				refreshing: false,
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
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
							}
						]
				if (items && items.length === 0) {
					this.tabBars[this.tabIndex].page = page
					this.newslist[this.tabIndex].loadtext = "没有更多数据了";
					return
				}
				this.newslist[this.tabIndex].list = items
				// console.log(this.newslist[this.tabIndex])
				if (items) {
					this.newslist[this.tabIndex].loadtext = "没有更多数据了";
				}else{
					this.newslist[this.tabIndex].loadtext = "上拉加载更多";
				}
				return
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
			scroll: function(e) {
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
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
			scroll: function(e) {
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			// handleScroll(ev) {
			// 	const scrollTop = ev.detail.scrollTop;
			// 	console.log(scrollTop)
			// 	// console.log(this.newslist[this.tabIndex])
			// 	// 开始位置
			// 	const start = Math.floor(scrollTop / this.size)
			// 	this.start = start < 0 ? 0 : start;
			// 	// 结束位置
			// 	this.end = this.start + this.remain;
			// 	// 计算偏移
			// 	const offset = scrollTop - (scrollTop % this.size) - this.preCount[this.tabIndex] * this.size
			// 	this.offset = offset < 0 ? 0 : offset;
			// },
			// tabbar点击事件
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