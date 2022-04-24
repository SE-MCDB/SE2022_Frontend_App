<template>
	<view class="container"> 
		<view class="item-list" @tap="openDetail">
			<view span="1">
				<text class="topic-title">{{item.title}}</text>
				<text class="topic-field">({{field_items[item.field]}})</text>
				<view v-if="emergencyItems" class="container-emergency">
					<view v-if="item.emergency === '2'" style="color: #007AFF">
						{{emergencItems[item.emergency].name}}
					</view>
					<view v-else-if="item.emergency === '1'" style="color: orange">
						{{emergencyItems[item.emergency].name}}
					</view>
					<view v-else style="color: red">
						{{emergencyItems[item.emergency].name}}
					</view>
				</view>
			</view> 	
			<view span="3" class="container1">
			    <text class="container1_text">{{item.description}}</text>
			</view>	
			
			<view span="1" class="container-detail">
				<text class="container-detail-money">
					价格估计:{{item.money}}
				</text>
				<text class="container-detail-people">
					已招募:<span style="color:red">{{item.real}}/{{item.predict}}</span>
				</text>
			</view>
			<view class="divider">
			
			</view>
			<view class="container-time">
				截止时间:{{item.end_time}}
			</view>
		</view>
		<view v-if="edit">
			<button type="default" @click="editneed">编辑需求</button>
			<button type="default" @click="goToRecommend">专家推荐</button>
		</view>
	</view>
</template>

<script>
	
	import uniFav from '@/components/uni-fav/uni-fav.vue'
	import {
		picUrl
	} from "@/api/common.js";
	export default {
		components:{
			uniFav,
			
		},
		props:{
			item:Object,
			index:Number,
			userInfo:Object,
			edit:Number
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
			}
		},
		onLoad() {
			
		},
		methods: {
			openDetail(){
				this.$emit("openDetail",this.item)
				console.log("------------------need-list")
			},
			editneed() {
				this.$emit("editneed", this.item)
				console.log("------------------edit-need")
			}
		}
	}
</script>

<style scoped>
.container{
	display: flex;
	box-sizing: border-box;
	width: 100vw;
	align-items: center;
	flex-direction: column;
	background-color: #F9F9F9;
	padding: 0 20upx ;
}
.item-list{
	background-color: #FFFFFF;
	box-sizing: border-box;
	width: 100%;
	min-height: 200upx;
	border-radius: 20upx;
	margin-bottom: 25upx;
	padding: 14upx;
}
.topic-title {
	font-weight: bold;
	font-size:larger;
	max-width: 75%;
}
.topic-field {
	color: blue;
	font-size:medium;
	border-radius: dotted;
	border-color: blue;
	max-width: 10%;
	padding-left: 10%;
}
.container1 {
    padding: 10px;
	background-color: #F7F7F9;
	border-radius: 20upx;
}
.container1-text {
	  display: -webkit-box;
	  overflow: hidden;
	  text-overflow: ellipsis;
	  word-wrap: break-word;
	  white-space: normal !important;
	  -webkit-line-clamp: 2;
	  -webkit-box-orient: vertical;
}
.container-emergency {
	font-weight: bold;
	font-size: medium;
	float: right;
}
.container-detail {
	border-color: #F7F7F9;
	border-radius: 20upx;
	padding: 15upx;
}
.container-detail-people {
	border-color: #F7F7F9;
	border-radius: 20upx;
	padding-left: 50%;
	padding-top: 10upx;
}
.divider {
	max-height: 3upx;
	padding: 10upx;
	background-color: #F7F7F9;
	border-radius: 20upx;
}
.container-time {
	padding: 15upx;
	color: blue;
}
button {
		float: left;
		width: 50%;
		text-align: center;
		font-size: small;
	}

</style>
