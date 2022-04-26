<template>
	<view>
		<template  v-if="userInfo&&!userInfo.id">
			<!-- 未登录 -->
			<view class="u-f-ajc">登陆PaperDaily，体验更多功能</view>
			<!-- 第三方登陆 -->
			<view class="u-f-ajc" @tap="openLogin">账号密码登陆 <view class="icon iconfont icon-jinru"></view>
			</view>
		</template>
		
		<template v-else>
			<template v-if="userInfo.type=='0'">
				<!-- 普通用户 -->
				<view class="u-f-ajc" @tap="openLogin">您目前是普通用户，认证后可体验更多功能</view>
				<tui-button size="30" height="70rpx" @click="openExpertCertificate" :plain="true" type="blue">专家认证 <tui-icon name="arrowright" size="30" :bold="true"></tui-icon></tui-button>
				<tui-button size="30" height="70rpx" @click="openEnterpriseCertificate" :plain="true" type="green">企业认证 <tui-icon name="arrowright" size="30" :bold="true"></tui-icon></tui-button>
			</template>
			
			<home-info :homeinfo="homeinfo"></home-info>
			
		</template>
		<!-- 数据 -->
		<home-data @goToSpace="goToSpace"  :homedata="homedata"></home-data>
		<!-- </view> -->


	</view>
</template>

<script>
	import homeListItem from "../../components/home/home-list-item.vue";
	import homeInfo from "../../components/home/home-info.vue";
	import otherLogin from "../../components/home/other-login.vue";
	import homeData from "../../components/home/home-data.vue";
	import {
		getUserProfile,
	} from "@/api/home.js";
	
	import {
		picUrl
	} from "@/api/common.js";
	
	import {
		webUrl
	} from '../../common/config.js'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		components: {
			homeListItem,
			homeInfo,
			otherLogin,
			homeData
		},
		computed: {
			...mapState(['userInfo'])
		},
		onShow() {
			console.log(this.userInfo.email)
			if (this.userInfo.id) {
				
				this.homeinfo.userpic = this.userInfo.userpic
				this.homeinfo.username = this.userInfo.username
				this.homeinfo.email = this.userInfo.email
				this.homeinfo.type = this.userInfo.type
				
				if (!this.islogin) {
					this.initDat()
				}
			} else {
				this.homedata[0].num = 0
				this.homedata[1].num = 0
				this.homedata[2].num = 0
				this.islogin = false
			}
		},
		onLoad(){
			
			
			
			
		},
		onReady() {
			this.initDat()
		},
		created() {

		},
		async mounted() {
			this.initDat()
			if (this.userInfo.id) {
				this.homeinfo.userpic = this.userInfo.userpic
				this.homeinfo.username = this.userInfo.username
				this.homeinfo.email = this.userInfo.email
				this.homeinfo.type = this.userInfo.type
				if (!this.islogin) {
					this.initDat()
				}
			} else {
				this.homedata[0].num = 0
				this.homedata[1].num = 0
				this.homedata[2].num = 0
				this.islogin = false
			}
		},
		data() {
			return {
				islogin: false,
				homeinfo: {
					userpic: this.userInfo ? this.userInfo.userpic : '',
					username: this.userInfo ? this.userInfo.username : "",
					totalnum: 0,
					todaynum: 0,
				},
				homedata: [
					// { name:"话题", num:0 },
					{
						name: "主页",
						num: 0
					},
					{
						name: "评论",
						num: 0
					},
					{
						name: "收藏",
						num: 0
					},
				],
			};
		},
		// 监听下拉刷新
		async onPullDownRefresh() {
			await this.initDat()
			uni.stopPullDownRefresh();
		},
		onNavigationBarButtonTap(e) {
			if (this.userInfo.id) {
				if (e.index == 0) {
					uni.navigateTo({
						url: '../user-set/user-set',
					});
				}
			} else {
				uni.navigateTo({
					url: '../login/login',
				});
			}

		},
		methods: {
			...mapMutations(['setUserInfo']),
			openLogin() {
				uni.navigateTo({
					url: '../login/login'
				});
			},
			openEnterpriseCertificate() {
				uni.navigateTo({
					url: '../certificate-enterprise/certificate-enterprise?uid=' + this.userInfo.id
				})
			},
			openExpertCertificate() {
				uni.navigateTo({
					url: '../certificate-expert/certificate-expert?uid=' + this.userInfo.id
				})
			},
			async initDat() {
				if (this.userInfo && this.userInfo.id) {
					let userProfile = await getUserProfile()
					
					let temp = this.userInfo
					temp.type = userProfile.type
					this.setUserInfo(temp)
					console.log(this.userInfo.type)
					this.homeinfo.total_like = userProfile.total_like
					this.homeinfo.total_post = userProfile.total_post
					this.homeinfo.total_collect = userProfile.total_mycollect
					this.homeinfo.email = userProfile.email
					this.homeinfo.type = userProfile.type
					this.homedata[0].num = userProfile.total_post
					this.homedata[1].num = userProfile.total_comment
					this.homedata[2].num = userProfile.total_mycollect
					this.islogin = true
				}
			},
			print(){
				console.log(this.userInfo.id);
			},
			goToSpace(index) {
				switch (index) {
					case 0:
						this.$http.href('../../pages/user-space/user-space?uid=' + this.userInfo.id)
						break;
					case 1:
						// this.$http.href('../../pages/user-comment/user-comment?uid=' + this.userInfo.id)
						break;
					case 2:
						this.$http.href('../../pages/user-collect/user-collect?uid=' + this.userInfo.id)
						break;
				}
			}
		}
	}
</script>

<style>
	.yanse{
		color: #ff0000;
	}
	.home-list {
		padding: 20upx;
	}

	.home-adv {
		padding: 20upx;
	}

	.home-adv>image {
		border-radius: 20upx;
		height: 150upx;
	}
	.guanggao{
		width: 100%;
	}
</style>
