<template>
	<view class="container"> 
		<view class="item-list">
			<view span="1" @tap="openDetail">
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
			<view span="1" @tap="openDetail">
				<text>关键词描述：</text>
				<text class="topic-keyword">{{item.key_word}}</text>
			</view>	
			<view span="3" class="container1" @tap="openDetail">
			    <text class="container1_text">{{item.description}}</text>
			</view>	
			
			<view span="1" class="container-detail">
				<text class="container-detail-money">
					经费:{{item.money}}千元
					
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
			<view v-if="edit === 1" class="container-edit">
				<button type="primary" @click="editneed">编辑</button>
				<button type="warn" class="button popup-error" @click="deleteneed('error')"><text
						class="button-text error-text">删除</text></button>
				<button class="button popup-warn" @click="endneed('warn')"><text
						class="button-text warn-text">结束</text></button>
				<button type="primary" @click="goToRecommend">找专家</button>
				<view v-if="showExpert && edit === 1" class="container-expert">
					<view v-for="(expert, index) in expertList" :key="index">
						<view class="divider"></view>
						<view class="left">
							<view class="container-expert-info">
								<text class="author-name"> {{expert.name}}</text>
								<text class="afflite">{{expert.organization}}</text>
								<text class="phone">tel:{{expert.phone}}</text>
							</view>
							<view class="container-expert-profile">
								<text>个人简介:</text>
								<text>{{expert.profile}}</text>
							</view>
							<view class="container-expert-paper">
								<text>相关论文:</text>
								<text>{{expert.paper}}</text>
							</view>
						</view>
						<view class="container-expert-button">
							<button type="default" @click="contact(expert)" class="container-expert-button">
								咨询
							</button>
						</view>
					</view>
				</view>
			</view>
			<view v-else-if="edit === 2" class="container-edit">
				<button type="primary" @click="editneed" class="mybutton">编辑</button>
				<button type="warn" class="mybutton" @click="deleteneed('error')"><text
						class="button-text error-text">删除</text></button>
				<button class="mybutton" @click="issue"><text
						class="button-text warn-text">发布</text></button>
				<button type="primary" @click="goToRecommend" class="mybutton">找专家</button>
				<view v-if="showExpert && edit === 2" class="container-expert">
					<view v-for="(expert, index) in expertList" :key="index">
						<view class="divider"></view>
						<view class="left">
							<view class="container-expert-info">
								<text class="author-name"> {{expert.name}}</text>
								<text class="afflite">{{expert.organization}}</text>
								<text class="phone">tel:{{expert.phone}}</text>
							</view>
							<view class="container-expert-profile">
								<text>个人简介:</text>
								<text>{{expert.profile}}</text>
							</view>
							<view class="container-expert-paper">
								<text>相关论文:</text>
								<text>{{expert.paper}}</text>
							</view>
						</view>
						<view class="container-expert-button">
							<button type="default" @click="contact(expert)" class="container-expert-button">
								咨询
							</button>
						</view>
					</view>
				</view>
			</view>
			<view v-else>
			</view>
		</view>
		<!-- <view v-if="edit === 1" class="container-edit">
			<button type="primary" @click="editneed">编辑需求</button>
			<button type="warn" class="button popup-error" @click="deleteneed('error')"><text
					class="button-text error-text">删除需求</text></button>
			<button class="button popup-warn" @click="endneed('warn')"><text
					class="button-text warn-text">结束需求</text></button>
			<button type="primary" @click="goToRecommend">专家推荐</button>
			<view v-if="showExpert" class="container-expert">
				<view v-for="(expert, index) in expertList" :key="index">
					<view class="divider"></view>
					<view class="container-expert-info">
						<text class="author-name"> {{expert.name}}</text>
						<text class="afflite">{{expert.organization}}</text>
						<text class="phone">{{expert.phone}}</text>
					</view>
					<view class="container-expert-profile">
						<text>个人简介:</text>
						<text>{{expert.profile}}</text>
					</view>
					<view class="container-expert-paper">
						<text>相关论文:</text>
						<text>{{expert.paper}}</text>
					</view>
					<view class="container-expert-button">
						<button type="primary" @click="contact(expert)">
							联系专家
						</button>
					</view>
				</view>
			</view>
		</view> -->
		
		<!-- <view v-else-if="edit === 2" class="container-edit">
			<button type="primary" @click="editneed">编辑需求</button>
			<button type="warn" class="button popup-error" @click="deleteneed('error')"><text
					class="button-text error-text">删除需求</text></button>
			<button class="button popup-warn" @click="issue"><text
					class="button-text warn-text">发布需求</text></button>
			<button type="primary" @click="goToRecommend">专家推荐</button>
			
		</view>
		<view v-else>
		</view> -->
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
			edit: {
				type:Number,
				default: 0
			},
			expertList: {
				type: Array,
				default: ()=>[]
			},
			showExpert: {
				type: Boolean,
				default: false,
			}
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
		
		methods: {
			openDetail(){
				this.$emit("openDetail",this.item)
				console.log("------------------openDetail")
			},
			editneed(type) {
				this.$emit("editneed", this.item)
				console.log("------------------edit-need")
			},
			deleteneed(type) {
				this.$emit("deleteneed", this.item)
				console.log("------------------delete-need")
			},
			endneed() {
				this.$emit("endneed", this.item)
				console.log("------------------end-need")
			},
			issue() {
				this.$emit("issue", this.item)
				console.log("------------------issue")
			},
			goToRecommend() {
				this.$emit("goToRecommend", this.item, this.index)
				console.log("------------------goToRecommend")
				console.log(this.showExpert)
				console.log(this.expertList.length)
			},
			contact(expert) {
				console.log("expert:"+expert.expert_id)
				this.$emit("contact", this.item, expert)
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
.topic-keyword {
	color: orange;
	font-size:smaller;
	border-radius: dotted;
	border-color: orange;
	max-width: 10%;
	padding-left: 1%;
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
	padding-left: 40%;
	padding-top: 10upx;
}
.divider {
	max-height: 0upx;
	padding: 5upx;
	background-color: #F7F7F9;
	border-radius:10upx;
}
.left {
	width: 75%;
	float: left;
}
.container-time {
	padding: 15upx;
	color: blue;
}
.container-edit {
	margin: 10upx;
}
.container-expert {
	
}
.afflite{
	padding-left: 30upx;
	color: orange;
	font-size: small;
}
.container-expert-info {
	padding: 10upx;
}
.phone {
	float: right;
}
.author-name {
	float:left
}
.container-expert-paper {
	padding: 10upx;
	font-size: small;
	font-weight: 200;
	border: solid #0A98D5 dotted;
	border-radius: 20upx;
}
.container-expert-profile {
	padding: 10upx;
	font-size: small;
	font-weight: 200;
	border: solid #0A98D5 20upx 20upx 20upx 20upx;
	border-radius: 20upx;
}
button {
		float: left;
		width: 23%;
		margin-right: 2%;
		text-align: center;
		font-size: small;
	}
.container-expert-button {
	margin-top: 60upx;
}
</style>
