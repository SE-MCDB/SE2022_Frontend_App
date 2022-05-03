<template>
	<view class="need-detail-list">
			<view class="need-detail-list">
				<view class="topic-title">
					<text>{{item.title}}</text>
					<!-- 异步问题 -->
					<span class="need-detail-list-right" v-if="emergencyItems[item.emergency]">
						{{emergencyItems[item.emergency].name}}紧急
					</span>
					<view class="need-detail-list-field">
						{{field_items[item.field]}}
					</view>
				</view>
				<view span="1">
					<text>关键词描述：</text>
					<text class="topic-keyword">{{item.key_word}}</text>
				</view>	
				<view class="topic-title-level-2">
					<text>相关信息</text>
				</view>
				<tui-list-view class="need-detail-info">
					<view class="need-detail-list-enterprise">
						发布企业：<text style="float: right;">{{item.enterprise_name}}-{{item.address}}</text>
					</view>
					<view class="need-detail-list-time">
						开始时间：<text style="float: right; color: #0081FF;">{{item.start_time}}</text>
					</view>
					<view class="need-detail-list-time">
						结束时间：<text style="float: right; color: #0081FF">{{item.end_time}}</text>
					</view>
					<view class="need-detail-list-people">
						接收人数 <text style="float: right; color: #FF0000;">{{item.real}}/{{item.predict}}</text>
					</view>
					<view class="need-detail-list-money">
						经费:<text style="float: right;">{{item.money}}千元</text> 
					</view>
				</tui-list-view>
				<view class="topic-title-level-2">
					<text>需求描述</text>
				</view>
				<view class="need-detail-list-describe">
					<rich-text v-html="item.description"></rich-text>
				</view>
				
			</view>
			
			<view v-if="userInfo.type==4">
				<tui-button type="primary" class="need-detail-button" @click="contact()">
					联系企业
				</tui-button>
			</view>
		</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from "vuex"
	import {
		getNeedDetail,
		createContact
	} from "@/api/need-detail.js"
	import tuiCard from '@/components/thorui/tui-card/tui-card.vue'
	import tuiListView from '@/components/thorui/tui-list-view/tui-list-view'
	import tuiListCell from '@/components/thorui/tui-list-cell/tui-list-cell'
	var graceRichText = require("../../components/common/richText.js");
	export default {
		components: {
			tuiCard,
			tuiListView,
			tuiListCell
		},
		data() {
			return {
				field_items: [
					"信息技术", "装备制造", "新材料", "新能源", "节能环保", "生物医药", "科学创意", "检验检测", "其他"
				],
				emergencyItems: [
					{
						value: '0',
						name: '低'
					},
					{
						value: '1',
						name: '中'
					},
					{
						value: '2',
						name: '高'
					}
				],
				item: []
			}
		},
		onLoad(data) {
			console.log("data should be:" + data + " and id should be:" + data.id)
			try {
				this.initData(data.id)
			} catch (e) {

			}
		},
		onShow(){
			try {
				this.initData(this.detail.id)
			} catch (e) {
			
			}
		},
		// 监听导航右边按钮
		onNavigationBarButtonTap(e) {
			
		},
		computed: {
			...mapState(['userInfo'])
		},
		methods: {
			//初始化数据
			async initData(id) {
				uni.setNavigationBarTitle({
					title: "需求详情"
				});
				let detail = await getNeedDetail(id)
				this.item = detail
			},
			formatRichText (html) {
							// 去掉img标签里的style、width、height属性
							let newContent= html.replace(/<img[^>]*>/gi,function(match,capture){
								match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
								match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
								match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
								return match;
							});
							// 修改所有style里的width属性为max-width:100%
							newContent = newContent.replace(/style="[^"]+"/gi,function(match,capture){
								match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
								return match;
							});
							// 去掉<br/>标签
							newContent = newContent.replace(/<br[^>]*\/>/gi, '');
							// img标签添加style属性：max-width:100%;height:auto
							newContent = newContent.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block;margin:0px auto;"');
							return newContent;
			},
			contact(){
				let temp={
					enterprise_id:this.item.enterprise_id,
					expert_id:this.userInfo.id,
					need_id:this.item.need_id,
				};
				let s =createContact(temp)
				console.log(temp)
				uni.navigateTo({
					url:'../user-chat/user-chat?fid='+this.item.enterprise_id
				})
			},
		}
	}
</script>

<style>
	.topic-title {
		font-weight: bold;
		font-size:x-large;
	}
	.topic-title-level-2 {
		font-weight: bold;
		font-size:large;
	}
	.topic-keyword {
		color: orange;
		font-size:smaller;
		border-radius: dotted;
		border-color: orange;
		max-width: 10%;
		padding-left: 1%;
	}
	.need-detail-list {
		padding: 15upx;
		min-height: 1080upx;
		bottom: 0upx!important;
	}
	.need-detail-list-right {
		float: right;
		color: #0081FF;
		font-size: medium;
		padding-top: 15upx;
	}
	.need-detail-list-field {
		margin: 10upx;
		border-radius: 20upx;
		border-style: solid;
		border-width: 3upx;
		text-align: center;
		max-width: 20%;
		border-color: #0081FF;
		color: #0081FF;
		background-color: white;
		font-family: "SimSun ";
	}
	.need-detail-info {
		margin: 15upx;
		border-radius: 20upx;
		border-style: none;
		background-color: #F9F9F9;
		border-width: 3upx;
	};
	.need-detail-list-describe {
		
	}
	.need-detail-button {
		width:80%;
		display: flex;
		align-items: center;
		justify-content: center; 
		font-size:30upx;
		bottom: 0upx;
	};
</style>
