<template>
	<view>
		<!-- <tui-fab bgColor="#FFE933" :width="98" :height="98" :bottom="150" :right="50" @click="publish"></tui-fab> -->
		<swiper-tab-head :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="tabtap">
		</swiper-tab-head>
		<swiper class="swiper-box" :style="{height:swiperheight+'px'}"
		 :current="tabIndex" @change="tabChange">
			<swiper-item>
				<template v-if="shoNo">
					<!-- 无内容默认 -->
					<no-thing></no-thing>
				</template>
			</swiper-item>
			<swiper-item>
				<template>
					这里是一行
				</template>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import loadMore from "../../components/common/load-more.vue";
	import time from '../../common/time.js'
	import noThing from "../../components/common/no-thing.vue";
	import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue'
	import swiperTabHead from "../../components/index/swiper-tab-head.vue";
	import {
		mapMutations,
		mapState,
		mapGetters,
		mapActions
	} from 'vuex'
	import Vue from 'vue'
	export default {
		components: {
			noThing,
			swiperTabHead
		},
		data() {
			return {
				swiperheight: 500,
				shoNo: true,
				tabIndex: 0,
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
		methods: {
			handleScroll(ev) {
				const scrollTop = ev.detail.scrollTop;
				// console.log(scrollTop)
				// console.log(this.newslist[this.tabIndex])
				// 开始位置
				const start = Math.floor(scrollTop / this.size)
				this.start = start < 0 ? 0 : start;
				// 结束位置
				this.end = this.start + this.remain;
				// 计算偏移
				const offset = scrollTop - (scrollTop % this.size) - this.preCount[this.tabIndex] * this.size
				this.offset = offset < 0 ? 0 : offset;
			},
			// tabbar点击事件
			tabtap(index) {
				this.tabIndex = index;
			},
			// 滑动事件
			tabChange(e) {
				this.tabIndex = e.detail.current;
			},
		}
	}
</script>

<style>

</style>
