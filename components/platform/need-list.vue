<template>
	<view class="container"> 
		<view class="item-list" @tap="openDetail">
			<view class="topic-title">
				<text style="font-weight: bold;font-size:larger;">{{item.title}}</text>
			</view>
			<view style="color: #007AFF;" >
				<text>{{item.field}}</text>
			</view> 	
			<view span="4" class="container1">
			    <text>{{item.description}}</text>
			</view>		
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
		},
		data() {
			return {
				
			}
		},
		methods: {
			openDetail(){
				this.$emit("openDetail",this.item)
				console.log("------------------need-list")
			},
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
.author-wrap{
	display: flex;
	height: 90upx;
	align-items: center;
	overflow: hidden;
}
.anthor-pic{
	width: 60upx;
	height: 60upx;
	margin-right: 20upx;
	border-radius: 50%;
	
}
.topic-text{
	margin-bottom: 10upx;
}
.topic-active{
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 0 20upx;
	height: 100upx;
	line-height: 100upx;
}
.active-comm{
	display: flex;
	align-items: center;
	color: #666666;
}
.active-text{
	margin-left: 10upx;
}
.author-wrap .author-name{
	font-weight: 700;
}

.item-list{
	background-color: #FFFFFF;
	box-sizing: border-box;
	width: 100%;
	min-height: 300upx;
	border-radius: 20upx;
	margin-bottom: 25upx;
	padding: 14upx;
}
.image-view-n{
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
}
.image-view-n >image{
	width: 220upx;
	height: 220upx;
	border-radius: 10upx;
	/* margin-right: 10upx; */
	margin-bottom: 10upx;
}
.image-view-2{
	display: flex;
	flex-wrap: wrap;
	justify-content: start;
}
.image-view-2 >image{
	width: 220upx;
	height: 220upx;
	border-radius: 10upx;
	margin-right: 10upx;
	margin-bottom: 10upx;
}
.image-view-1{
	display: flex;
	justify-content: flex-start;
}

.container1 {
        padding: 10px;
}

#editor {
        width: 100%;
        height: 300px;
        background-color: #CCCCCC;
}
</style>
