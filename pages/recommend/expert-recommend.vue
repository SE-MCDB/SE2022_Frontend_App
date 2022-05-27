<template>
	<view>
			<!-- 这里主要添加前面关于需求的描述信息补充 -->
		<view>
			<uni-row class="header">
				<uni-col :span="9" class="image">
					<image src="../../static/bgimg/need_contracted.jpg" mode="widthFix" lazy-load class="image-image"></image>
				</uni-col>
				<uni-col :span="14" :offset="1" class="title-info">
					<uni-row class="need-title">
						<text class="need-title">{{need.title}}</text>
					</uni-row>
					<uni-row class="need-info">
						<uni-row :span="14" class="need-info-item">
							<uni-icons type="gear" size="18"></uni-icons>
							<text class="need-info-text">领域：{{field_items[need.field]}}</text>
						</uni-row>
						<uni-row :span="14" class="need-info-item">
							<uni-icons type="gear" size="18"></uni-icons>
							<text class="need-info-text">关键词：{{need.key_word}}</text>
						</uni-row>
					</uni-row>
				</uni-col>
			</uni-row>
		</view>
			<!-- 这里主要是标题 -->
		<view class="Recommend-title">
			<uni-section title="推荐结果" subTitle="可直接联系对接~" type="line">
			</uni-section>
		</view>
			<!-- 这里增加对于专家的补充 -->
		<view class="Recommend">
			<view v-for="(expert, index) in expertRegister">
				<view class="expert-info">
					<view>
					<uni-row :span="24">
						<uni-col :span="3">
							<image :src="expert.userpic" mode="widthFix" lazy-load class="expert-image" @click="goToExpertInfo(expert)"></image>
						</uni-col>
						<uni-col :span="13">
							<uni-row>
								<uni-col>
									<text class="expert-name" @click="goToExpertInfo(expert)">
										{{expert.expert_name}}
									</text>
								</uni-col>
							</uni-row>
							<uni-row>
								<uni-col>
									<text style="color:blue" class="expert-phone" v-if="expert.phone" @click="goToExpertInfo(expert)">
										{{expert.phone}}
									</text>
									<text style="color:blue" class="expert-phone" v-else @click="goToExpertInfo(expert)">
										{{expert.email}}
									</text>
								</uni-col>
							</uni-row>
							<!-- <uni-row v-show="">
								<text class="expert-description">
									{{expert.profile}}
								</text>
							</uni-row> -->
							<uni-row>
								<text class="expert-organization" @click="goToExpertInfo(expert)">
									{{expert.expert_organization}}
								</text>
							</uni-row>
						</uni-col>
						<uni-col :span="8">
							<button type="primary" @click="contact(expert)" class="expert-button">联系专家</button>
						</uni-col>
					</uni-row>
					
					</view>
				</view>
			</view>
		</view>
		
		<view class="Recommend-title">
			<uni-section title="其他推荐" subTitle="其他推荐结果,请自行联系~" type="line">
			</uni-section>
		</view>
		
		<view>
			<uni-row class="need-introduction">
				<uni-col :span="23" :offset="1">
					<uni-icons type="gear" size="18"></uni-icons>
					<text class="need-introduction-text">关键词：{{need.key_word}}</text>
				</uni-col>
			</uni-row>
		</view>
		<view v-for="(expert, index) in expertOther">
			<view class="expert-info" @click="showToast">
				<uni-row :span="24">
					<uni-col :span="3">
						<image :src="expert.userpic" mode="widthFix" lazy-load class="expert-null-image"></image>
					</uni-col>
					<uni-col :span="21">
						<uni-row>
							<uni-col>
								<text class="expert-name">
									{{expert.expert_name}}
								</text>
								<text class="expert-null-organization">
									{{expert.expert_organization}}
								</text>
							</uni-col>
						</uni-row>
						<uni-row>
							<text class="expert-title-head">
								匹配论文：
							</text>
							<text class="expert-title">{{expert.title}}</text>
						</uni-row>
						<!-- <uni-row>
							<uni-col>
								<text style="color:blue" class="expert-phone" v-if="expert.phone" @click="goToExpertInfo(expert)">
									{{expert.expert_phone}}
								</text>
								<text style="color:blue" class="expert-phone" v-else @click="goToExpertInfo(expert)">
									{{expert.expert_email}}
								</text>
							</uni-col>
						</uni-row> -->
						<!-- <uni-row>
							<text class="expert-organization">
								{{expert.expert_organization}}
							</text>
						</uni-row> -->
						<!-- <uni-row v-show="">
							<text class="expert-description">
								{{expert.profile}}
							</text>
						</uni-row> -->
					</uni-col>
				</uni-row>
			</view>
		</view>
		
		<view>
			<load-more loadtext="没有更多数据了"></load-more>
		</view>
		
		<uni-popup ref="popup" type="message">
			<uni-popup-message type="error" message="该专家用户暂未入驻,请企业自行联系~" :duration="2000"></uni-popup-message>
		</uni-popup>
	</view>
</template>

<script>
	import uniRow from '@/components/uni-row/components/uni-row/uni-row.vue'
	import uniCol from '@/components/uni-row/components/uni-col/uni-col.vue'
	import loadMore from '@/components/common/load-more.vue'
	import { picUrl } from '@/api/common.js'
	import uniPopupMessage from '@/components/uni-popup-message/uni-popup-message.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import {
		aiRecommend
	} from '@/api/manage-need.js'
	import {
		mapState
	} from 'vuex'
	import {
		createContact
	} from "@/api/need-detail.js"
	export default {
		components: {
			uniCol,
			uniRow,
			loadMore,
			uniPopup,
			uniPopupMessage
		},
		data() {
			return {
				need: {},
				expertRegister: [],
				expertOther: [],
				field_items: [
					'信息技术', '装备制造', '新材料', '新能源', '节能环保', '生物医药', '科学创意', '检验检测', '其他'
				],
				showDescription: false
			}
		},
		computed: {
			...mapState(['userInfo'])
		},
		onLoad(option) {
			if (option) {
				try {
					let options = JSON.parse(decodeURIComponent(option.item))
					let object = options
					this.need = object
					this.initExperts(object.need_id)
				} catch(e) {
					console.log(e)
				}
			} else {
				console.log("Error! no data is loaded")
			}
		},
		
		methods: {
			async initExperts(id) {
				let experts = await aiRecommend(id)
				if (experts) {
					this.expertRegister = experts.register 
					this.expertOther = experts.other
				}
				this.validate()
			},
			validate() {
				console.log(this.expertRegister.length)
				for(var i = 0; i < this.expertRegister.length; i ++) {
					this.expertRegister[i].userpic = picUrl + this.expertRegister[i].userpic
				}
				for(var i = 0; i < this.expertOther.length; i ++) {
					this.expertOther[i].userpic = picUrl + this.expertOther[i].userpic
				}
			},
			goToExpertInfo(expert) {
				uni.navigateTo({
					url:'../user-space/user-space?uid='+ expert.id
				})
			},
			// goToNullExpertInfo(expert) {
			// 	let route_to = encodeURIComponent(JSON.stringify(expert))
			// 	console.log(route_to)
			// 	uni.navigateTo({
			// 		url:'../user-space/user-space-null?expert='+ route_to 
			// 	})
			// },
			contact(expert) {
				let temp={
					expert_id:expert.id,
					enterprise_id:this.userInfo.id,
					need_id:this.need.need_id,
				};
				let s =createContact(temp)
				uni.navigateTo({
					url:'../user-chat/user-chat?fid='+expert.id
				})
			},
			showToast() {
				this.$refs.popup.open()
			}
		}
	}
</script>

<style>
	.detail {
		min-height: 1380upx;
		background-color: #F1F1F1;
		padding: 10upx;
	}
	.header {
		margin: 10upx;
		background-color: white;
		border: solid #F5FFF0 2upx;
		height: 17%;
	}
	.image-image {
		padding-top: 5%;
		width:100%;
	}
	.title-info {
		
	}
	.need-title {
		font-size: 35upx;
		font-weight: bold;
		color: skyblue;
		overflow: hidden;
		width: 400rpx !important;
	    overflow: unset;
	    word-break: break-all;
	    text-overflow: ellipsis;
	    display: -webkit-box;
	   -webkit-box-orient: horizontal;
	   -webkit-line-clamp: 2;
	   white-space: nowrap;
	}
	.need-info {
		padding-top: 10upx;
	}
	.need-info-item {
		height: 50upx;
	}
	.need-info-text {
		font-weight: 100;
		font-size: 20upx;
	}
	
	.need-introduction {
		max-height: 150upx;
		opacity: 0.8;
		background-color: #FFFFFD;
		margin-top: 10upx;
	}
	
	/* .expert-title {
		font-weight: solid;
		font-size: large;
		color: blue;
	} */
	.expert-title-head {
		font-weight: 100;
		font-size: small;
	}
	
	.expert-info {
		background-color: #FFFFFD;
		margin-top: 20upx;
	}
	.expert-image {
		margin-top: 10upx;
		margin-left: 8upx;
		width: 80upx;
		border-radius: 50px;
		margin-right: 3px;
	}
	.expert-null-image {
		height: 40upx;
	}
	.expert-header-view{
		display: flex;
		flex-direction: row;
	}
	.expert-button {
		margin: 20upx;
		font-size: small;
	}
	.expert-name {
		font-weight: 900;
		font-size: medium;
	}
	.expert-phone {
		font-size: x-small;
	}
	.expert-null-organization {
		margin-left: 50upx;
		color: skyblue;
	}
	.expert-organization {
		color: skyblue;
	}
</style>
