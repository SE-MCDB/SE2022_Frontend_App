<template>
	<view>
		
		<uni-section title="关注我们" type="circle">
			<uni-list :border="false">
				<uni-list-item :border="false" title="关注微信公众号" thumb="/static/images/share/icon_wechat.png"
				 	 thumb-size="lg" rightText="PAPDaily"></uni-list-item>
				<uni-list-item :border="false" title="关注微博" thumb="/static/images/share/icon_sina.png"
				 	 thumb-size="lg" rightText="@PAPDaily"></uni-list-item>
				<uni-list-item :border="false" title="关注Github" thumb="/static/images/share/icon_github.png"
				 	 thumb-size="lg" rightText="@SE-mcdb"></uni-list-item>
			</uni-list>
		</uni-section>
		
		<uni-section title="探索" type="circle">
			<uni-list>
				<uni-list-item showArrow title="使用条款" />
				<uni-list-item showArrow title="隐私声明" />
				<uni-list-item showArrow title="开源协议" />
				<uni-list-item showArrow title="致谢" />
			</uni-list>
		</uni-section>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
