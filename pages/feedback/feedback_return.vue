<template>
	
	<view>
		<swiper-tab-head
			:tabBars="tabBars" 
			:tabIndex="tabIndex"
			@tabtap="tabtap"
			scrollItemStyle="width:50%;"
			scrollStyle="border-bottom:0;">
		</swiper-tab-head>
		<template v-if="tabIndex==0">
			<uni-section  title="显示全部已回复反馈" type="circle" >
				<view class="u-f-ajc animated fadeIn" v-if="feeds0.length==0">
					<image src="/static/images/toast/no-data-03.jpg" 
						mode="widthFix"></image>
					<!-- <text>暂无数据</text> -->
				</view>
				<view v-else>
					
				</view>
			</uni-section>
			
		</template>
		
		<template v-else-if="tabIndex==1">
			<uni-section title="显示全部未回复反馈" type="circle" >
				<view class="u-f-ajc animated fadeIn" v-if="feeds1.length==0">
					<image src="/static/images/toast/no-data-03.jpg" 
						mode="widthFix"></image>
					<!-- <text>暂无数据</text> -->
				</view>
				<view v-else>
					<uni-card v-for='(feed,index) in feeds1' :key="index"
							  :is-shadow='false' :title="feed.abc" 
							  :extra="feed.abc" :sub-title="feed.abc">
					</uni-card>
				</view>
			</uni-section>
			
		</template>
		
		
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import{ picUrl, } from '@/api/common.js'
	import homeData from '../../components/home/home-data.vue'
	import { getUserInfo } from '@/api/user-space.js'
	import swiperTabHead from '../../components/index/swiper-tab-head.vue'
	
	export default {
		components:{
			swiperTabHead,
		},
		computed:{ ...mapState(['userInfo']) },
		onLoad(){
			
		},
		onShow(){
			
		},
		data() {
			return {
				feeds0:[
					{ 
					abc:1, 
					
					},
				],
				feeds1:[
					
				],
				tabIndex:0,
				tabBars:[
					{ name:'已回复', id:'homepage' },
					{ name:'未回复', id:'dynamic' },
									
				],
			}
		},
		methods: {
			async init(){
				
			},
			tabtap(index){
				this.tabIndex=index
			},
		}
	}
</script>
	
<style>
	.mystyle image{
		width: 100%;
	}
</style>
