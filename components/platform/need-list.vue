<template>
	<uni-card>
		<view @click="openDetail">
			<uni-row :span="24" class="title">
				<uni-col class="title">
					{{item.title}}
				</uni-col>
			</uni-row>
			<uni-row class="detail">
				<uni-col :span="12" class="detail">
					研发领域：<text class="detail-field">{{field_items[item.field]}}</text>
				</uni-col>
				<uni-col :span="12" class="detail">
					研发金额：<text class="detail-money">￥{{item.money}}万</text>
				</uni-col>
			</uni-row>
			<uni-row class="description">
				<uni-col class="description-text" :span="23">
					{{item.description}}
				</uni-col>
			</uni-row>
			<uni-row>
				<uni-col :span="16">
					<uni-row class="location">
						<uni-icons type="location" size="18"></uni-icons>
						<text>所在地：{{item.address}}</text>
					</uni-row>
					<uni-row class="location">
						<uni-icons type="calendar" size="18"></uni-icons>
						<text>截止时间：{{item.end_time}}</text>
					</uni-row>
					<uni-row class="location">
						<uni-icons type="auth" size="18"></uni-icons>
						<text>
							已对接专家：
						</text>
					</uni-row>
				</uni-col>
				<uni-col :span="7" class="buttons" :offset="1" v-if="!edit">
					<button type="primary" class="buttons-text" @click="openDetail">查看详情</button>
				</uni-col>
			</uni-row>
		</view>
		<uni-row>
			<view v-if="edit">
			<uni-col :span="6" class="operation-buttons">
				<view @click="editneed">
					<uni-icons type="refreshempty" size="18"></uni-icons>
					<text>编辑</text>
				</view>
			</uni-col>
			<uni-col :span="6" class="operation-buttons">
				<view @click="deleteneed">
					<uni-icons type="minus" size="18"></uni-icons>
					<text>删除</text>
				</view>
			</uni-col>
			<uni-col :span="6" class="operation-buttons">
				<view @click="endneed" v-if="edit != 2">
					<uni-icons type="checkmarkempty" size="18"></uni-icons>
					<text>结束</text>
				</view>
				<view @click="issue" v-else>
					<uni-icons type="checkmarkempty" size="18"></uni-icons>
					<text>发布</text>
				</view>
			</uni-col>
			<uni-col :span="6" class="operation-buttons">
				<view @click="goToRecommend">
					<uni-icons type="search" size="18"></uni-icons>
					<text>找专家</text>
				</view>
			</uni-col>
			</view>
		</uni-row>
	</uni-card>
</template>

<script>
	import uniRow from '@/components/uni-row/components/uni-row/uni-row.vue'
	import uniCol from '@/components/uni-row/components/uni-col/uni-col.vue'
	import uniFav from '@/components/uni-fav/uni-fav.vue'
	import uniCard from '@/components/uni-card/uni-card.vue'
	import {
		picUrl
	} from "@/api/common.js";
	export default {
		components:{
			uniRow,
			uniCol,
			uniFav,
			uniCard
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
				gutter: 0,
				nvueWidth: 730,
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
				yanse: this.item.emergency === 1 ? 'orange' : this.item.emergency === 2 ? 'red' : 'blue'
			}
		},
		
		methods: {
			openDetail(){
				this.$emit("openDetail",this.item)
				console.log("------------------openDetail")
			},
			editneed() {
				this.$emit("editneed", this.item)
				console.log("------------------edit-need")
			},
			deleteneed() {
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
.title {
	font-size: 30upx;
	font-weight: 600;
	color: #0A98D5;
}
.detail {
	font-weight: 200;
	font-size: 20upx;
}
.detail-field {
	font-weight: bold !important;
}
.description {
	border-radius: 20upx 20upx 20upx 20upx;
	background-color: #F5FFF0;
}
.description-text {
	margin: 10upx;
	font-size: 25upx;
	font-weight: 100;
}
.location {
	font-size: 20upx;
}
.buttons {
	margin-top: 75upx;
}
.buttons-text {
	font-size: 20upx;
}
.operation-buttons {
	text-align: center;
	box-shadow: 0 0 1upx rgba(0, 0, 0, .12), 1upx 0 0 rgba(0, 0, 0, .04)
}
</style>
