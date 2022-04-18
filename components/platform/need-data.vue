<template>
	<view class="home-data u-f-ac animated fadeIn fast">
		<block v-for="(item,index) in needdata" :key="index">
			<view class="u-f1 u-f-ajc u-f-column" @tap="goToNeed(index)">
				<view>{{item.num}}</view>{{item.name}}
			</view>
		</block>
	</view>
</template>

<script>
	//关于需求平台各类型需求订单主界面的样式
	export default {
		props:{
			needdata:Array
		},
		methods:{
			goToNeed(index){
				console.log(index)
				this.$emit("goToNeedInfo",index)
			}
		}
	}
</script>

<style scoped>
.need-data{ 
	padding: 20upx 40upx;
}
.need-data>view{
	color: #989898;
}
.need-data>view>view{
	font-size: 32upx;
	color: #333333;
}
</style>
