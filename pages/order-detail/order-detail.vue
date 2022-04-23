<template>
	<view class=container>
		
		<tui-list-cell :size="40" :hover="false" >
			<tui-icon name="order" :size="40" unit="rpx" margin="60" color="#00007f"></tui-icon>
			订单编号：
		</tui-list-cell>
		<tui-list-cell :size="30" :hover="false">
			{{item.order_id}}
		</tui-list-cell>
		
		<tui-list-cell :size="40" :hover="false" >
			<tui-icon name="notice" :size="40" unit="rpx" margin="60" color="#ff5500"></tui-icon>
			订单状态：
		</tui-list-cell>
		<tui-list-cell :size="30" :hover="false" class=cell>
			{{item.state}}
		</tui-list-cell>
		
		<tui-list-cell :size="40" :hover="false" >
			<tui-icon name="alarm" :size="40" unit="rpx" margin="60"></tui-icon>
			订单创建时间：
		</tui-list-cell>
		<tui-list-cell :size="30" :hover="false" class=cell>
			{{item.create_time}}
		</tui-list-cell>
		
		<tui-list-cell :size="40" :hover="false" >
			<tui-icon name="alarm-fill" :size="40" unit="rpx" margin="60"></tui-icon>
			订单结束时间：
		</tui-list-cell>
		<tui-list-cell :size="30" :hover="false" class=cell>
			{{item.end_time}}
		</tui-list-cell>
		<tui-list-cell :size="40" :hover="false" >
			<tui-icon name="pie" :size="40" unit="rpx" margin="60" color="#55ff7f"></tui-icon>
			已招募人数/总人数：{{item.real}}/{{item.predict}}
		</tui-list-cell>
		<tui-list-cell :size="40" :hover="true" :arrow="true" @click=goToSpace(item.expert_id)>
			<tui-icon name="people" :size="40" unit="rpx" margin="60" color="#aa00ff"></tui-icon>
			专家名称：{{item.expert_name}}
		</tui-list-cell>
		<tui-list-cell :size="40" :hover="true" :arrow="true" @click=goToSpace(item.need.enterprise_id)>
			<tui-icon name="people" :size="40" unit="rpx" margin="60" color="#ff0000"></tui-icon>
			企业名称：{{item.need.enterprise_name}}
		</tui-list-cell>
		<tui-list-cell :size="40" :hover="true" :arrow="true" @click=goToNeed(item.need.need_id)>
			<tui-icon name="nodata" :size="40" unit="rpx" margin="60" color="#ff0000"></tui-icon>
			需求详情：{{item.need.title}}
		</tui-list-cell>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from "vuex"
	import {
		getOrderDetail
	} from "@/api/order-detail.js"
	
	
	export default {
		components: {
		},
		data() {
			return {
				item:{},
			}
		},
		onLoad(data) {
			console.log("data should be:" + data + " and id should be:" + data.id)
			try {
				
				this.initData(data.id)
			} catch (e) {

			}
		},
		onShow(data){
			try {
				this.initData(data.id)
			} catch (e) {
			
			}
		},
		// 监听导航右边按钮
		onNavigationBarButtonTap(e) {
			
		},
		onPullDownRefresh(){
			this.initData(this.item.order_id);
		},
		computed: {
			...mapState(['userInfo'])
		},
		methods: {
			//初始化数据
			async initData(id) {
				console.log(id)
				if(id){
				uni.setNavigationBarTitle({
					title: "订单详情"
				});
				let detail = await getOrderDetail(id)
				this.item = detail
				if(detail.state==1){
					this.item.state="正在合作中"
				}else if(detail.state==0){
					this.item.state="待接受"
				}else if(detail.state==2){
					this.item.state="已拒绝"
				}else{
					this.item.state="已结束"
				}
				if(!detail.end_time){
					this.item.end_time="未结束"
				}
				}
				else{
					console.log(id)
				}
				uni.stopPullDownRefresh();
			},
			goToSpace(id){
				console.log("jumpspace"+id)
				uni.navigateTo({
					url:'../user-space/user-space?uid='+id
				})
			},
			goToNeed(id){
				console.log("jumpneed"+id)
				uni.navigateTo({
					url:'../need-detail/detail?id='+id
				})
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		margin:0 auto;
		.cell{
			
		}
	}
	
</style>
