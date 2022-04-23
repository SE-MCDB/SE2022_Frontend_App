<template>
	<view>
		<!-- 操作菜单 -->
		<view class="papar-left-popup-mask" v-show="show" @tap="hide"></view>
		<view class="papar-left-popup" v-show="show">
			<view class="u-f-ac" hover-class="papar-left-popup-h" @tap="addneed">
				<view class="icon iconfont icon-sousuo"></view> 
				发布需求
			</view>
			<!-- <view class="u-f-ac" hover-class="papar-left-popup-h" @tap="clear">
				<view class="icon iconfont icon-qingchu"></view> 
				清除列表
			</view> -->
			<view class="u-f-ac" hover-class="papar-left-popup-h" @tap="manageneed">
				<view class="icon iconfont icon-sousuo"></view> 
				需求管理
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			show:Boolean
		},
		methods:{
			hide(){
				this.$emit('hide');
			},
			addneed(){
				this.$emit('addneed');
			},
			manageneed() {
				this.$emit('manageneed');
			}
		}
	}
</script>

<style>
.papar-left-popup-mask{
	position: fixed;
	right: 0;
	left: 0;
	top: 0;
	bottom: 0;
	z-index: 1999;
}
.papar-left-popup{
	position: fixed;
	right: 0;
	top: 10upx;
	background: #FFFFFF;
	z-index: 2000;
	width: 55%;
	box-shadow: 1upx 1upx 20upx 2upx #CCCCCC;
}
.papar-left-popup>view{
	padding: 20upx;
	font-size: 35upx;
}
.papar-left-popup>view>view{
	margin-right: 10upx;
	font-weight: bold;
}
.papar-left-popup-h{
	background: #EEEEEE;
}
</style>

