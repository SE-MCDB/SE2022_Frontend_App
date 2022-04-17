<template>
	<view class="container">
		<view class="tui-status-bar"></view>
		<view class="tui-page-title">企业认证</view>
		<view class="tui-form">

			<view class="tui-view-input">
			
<!-- 				<tui-list-cell :hover="false">
					<view class="thorui-input-item">
						<view class="thorui-input-title">姓名</view>
						<input class="thorui-input" placeholder="请输入姓名" placeholder-class="thorui-phcolor" v-model="name" />
						<icon type="clear" :size="14" v-if="name" @tap="name = ''"></icon>
					</view>
				</tui-list-cell> -->
				<tui-list-cell :hover="false" :lineLeft="false" backgroundColor="transparent">
					<view class="tui-cell-input">
						<tui-icon name="home" color="#6d7a87" :size="40"></tui-icon>
						<input :value="name" placeholder="请输入企业名称" placeholder-class="tui-phcolor" type="text" maxlength="36" @input="inputName" />
						<view class="tui-icon-close" v-show="name" @tap="clearInput(1)">
							<tui-icon name="close-fill" :size="32" color="#bfbfbf"></tui-icon>
						</view>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false" :lineLeft="false" backgroundColor="transparent">
					<view class="tui-cell-input">
						<tui-icon name="location" color="#6d7a87" :size="40"></tui-icon>
						<input :value="address" placeholder="请输入企业地址"  placeholder-class="tui-phcolor" type="text"
						 maxlength="36" @input="inputAddress" />
						<view class="tui-icon-close" v-show="address" @tap="clearInput(2)">
							<tui-icon name="close-fill" :size="32" color="#bfbfbf"></tui-icon>
						</view>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false" :lineLeft="false" backgroundColor="transparent">
					<view class="tui-cell-input">
						<tui-icon name="explore" color="#6d7a87" :size="40"></tui-icon>
						<input :value="website" placeholder="请输入企业网站" placeholder-class="tui-phcolor" type="text"
						 maxlength="36" @input="inputWebsite" />
						<view class="tui-icon-close" v-show="website" @tap="clearInput(3)">
							<tui-icon name="close-fill" :size="32" color="#bfbfbf"></tui-icon>
						</view>
					</view>
				</tui-list-cell>
				
				<tui-list-cell :hover="false" :lineLeft="false" backgroundColor="transparent">
					<view class="tui-cell-input">
						<tui-icon name="mobile" color="#6d7a87" :size="40"></tui-icon>
						<input :value="phone" placeholder="请输入联系电话" placeholder-class="tui-phcolor" type="text" maxlength="36" @input="inputPhone" />
						<view class="tui-icon-close" v-show="phone" @tap="clearInput(5)">
							<tui-icon name="close-fill" :size="32" color="#bfbfbf"></tui-icon>
						</view>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false" :lineLeft="false" backgroundColor="transparent">
					<view class="tui-cell-input">
						<tui-icon name="people" color="#6d7a87" :size="40"></tui-icon>
						<input :value="legal_representative" placeholder="请输入法定代表人" placeholder-class="tui-phcolor" type="text" maxlength="36" @input="inputLegalRepresentative" />
						<view class="tui-icon-close" v-show="legal_representative" @tap="clearInput(6)">
							<tui-icon name="close-fill" :size="32" color="#bfbfbf"></tui-icon>
						</view>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false" :lineLeft="false" backgroundColor="transparent">
					<view class="tui-cell-input">
						<tui-icon name="wallet" color="#6d7a87" :size="40"></tui-icon>
						<input :value="register_capital" placeholder="请输入注册资本" placeholder-class="tui-phcolor" type="text" maxlength="36" @input="inputRegisterCapital" />
						<view class="tui-icon-close" v-show="register_capital" @tap="clearInput(7)">
							<tui-icon name="close-fill" :size="32" color="#bfbfbf"></tui-icon>
						</view>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false" :lineLeft="false" backgroundColor="transparent">
					<view class="tui-cell-input">
						<tui-icon name="shop" color="#6d7a87" :size="40"></tui-icon>
						<input :value="field" placeholder="请输入主营业务" placeholder-class="tui-phcolor" type="text" maxlength="36" @input="inputField" />
						<view class="tui-icon-close" v-show="field" @tap="clearInput(8)">
							<tui-icon name="close-fill" :size="32" color="#bfbfbf"></tui-icon>
						</view>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false">
					<view>
						<view class="thorui-input-title">企业简介</view>
						<textarea placeholder="请输入企业简介" placeholder-class="thorui-phcolor" maxlength="512" @input="inputInstruction"></textarea>
						<view class="tui-icon-close" v-show="instruction" @tap="clearInput(4)">
							<tui-icon name="close-fill" :size="32" color="#bfbfbf"></tui-icon>
						</view>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false" unlined="">
					<view>
						<view class="thorui-input-title">营业执照</view>
						<upload-license @getLicense="getLicensePath"></upload-license>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false">
					<view>
						<view class="thorui-input-title">法人身份证</view>
						<uploadID @getIDpic="getIDPath"></uploadID>
					</view>
				</tui-list-cell>

			</view>
			<view class="tui-btn-box">
				<tui-button @tap="certificate" :disabledGray="true" :disabled="disabled" :shadow="true" shape="circle">申请认证</tui-button>
			</view>
			<view class="tui-cell-text">
				申请认证代表同意
				<view class="tui-color-primary" hover-class="tui-opcity" :hover-stay-time="150" @tap="protocol">PaperDaily用户服务协议、隐私政策</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	import {
		enterprise_certificate
	} from '../../api/certificate.js';
	import {
		mapMutations,
		mapState
	} from 'vuex';
	import uploadLicense from "../../components/uploadImages/uploadLicense.vue"
	import uploadID from "../../components/uploadImages/uploadID.vue"
	import form from "../../components/thorui/tui-validation/tui-validation.js";
	export default {
		components:{
			uploadLicense,
			uploadID
		},
		data() {
			return {
				userID: '',
				name: '',
				address: '',
				website: '',
				instruction: '',
				phone: '',
				legal_representative: '',
				register_capital: '',
				field: '',
				business_license: '',
				legal_person_ID: '',
			};
		},
		computed:{
			disabled: function() {
				let bool = true;
				if (this.userID && this.name && this.address && this.website &&
					this.instruction && this.phone && this.legal_representative &&
					this.register_capital && this.field && this.business_license && this.legal_person_ID) {
					bool = false;
				}
				return bool;
			},
			...mapState(['userInfo'])
		},
		onLoad(data) {
			this.userID = data.uid;
			console.log('onLoad in certification '+ this.userID)
		},
		methods: {
			//验证手机号码
			back() {
				uni.navigateBack();
			},
			inputName(e) {
				this.name = e.detail.value;
			},
			inputAddress(e) {
				this.address = e.detail.value;
			},
			inputWebsite(e) {
				this.website = e.detail.value;
			},
			inputInstruction(e) {
				this.instruction = e.detail.value;
			},
			inputPhone(e) {
				this.phone = e.detail.value;
			},
			inputLegalRepresentative(e) {
				this.legal_representative = e.detail.value;
			},
			inputRegisterCapital(e) {
				this.register_capital = e.detail.value;
			},
			inputField(e) {
				this.field = e.detail.value;
			},
			inputBusinessLisence(e) {
				this.business_license = e.detail.value;
			},
			inputLegalPersonID(e) {
				this.legal_person_ID = e.detail.value;
			},
			clearInput(type) {
				if (type == 1) {
					this.name = '';
				} else if(type == 2) {
					this.address = '';
				}else if (type == 3) {
					this.website = '';
				} else if (type == 4) {
					this.instruction = '';
				} else if (type == 5) {
					this.phone = '';
				} else if (type == 6) {
					this.legal_representative = '';
				} else if (type == 7) {
					this.register_capital = '';
				} else if (type == 8) {
					this.field = '';
				} else if (type == 9) {
					this.business_license = '';
				} else if (type == 10) {
					this.legal_person_ID = '';
				}
			},
			protocol() {
				this.tui.href("/pages/doc/protocol/protocol")
			},
			getIDPath(val) {
				if (val.length > 0) {
					this.legal_person_ID = val[0];
				} else {
					this.legal_person_ID = '';
				}
				console.log("IDPath!")
				console.log(this.legal_person_ID);
			},
			getLicensePath(val) {
				if (val.length > 0) {
					this.business_license = val[0];
				} else {
					this.legal_person_ID = '';
				}
				console.log("License Path!")
				console.log(this.business_license);
			},
			// async toCertificate() {
			// 	console.log("certification begins");
			// 	let data = await enterprise_certificate({
					// id: this.userID,
					// name: this.name,
					// address: this.address,
					// website: this.website,
					// instruction: this.instruction,
					// phone: this.phone,
					// legal_representative: this.legal_representative,
					// register_capital: this.register_capital,
					// field: this.field,
					// business_license: this.business_license,
					// legal_person_ID: this.legal_person_ID,
			// })
			// }
			validate() {
				let rules = [{
					name: "phone",
					rule: ["isMobile"],
					msg: ["请输入正确手机号"]
				}];
				let formData = {
					id: this.userID,
					name: this.name,
					address: this.address,
					website: this.website,
					instruction: this.instruction,
					phone: this.phone,
					legal_representative: this.legal_representative,
					register_capital: this.register_capital,
					field: this.field,
					business_license: this.business_license,
					legal_person_ID: this.legal_person_ID
				};
				let checkRes = form.validation(formData, rules);
				return checkRes;
			},
			certificate() {
				console.log("认证开始！")
				let checkRes = this.validate();
				if (checkRes) {
					uni.showToast({
						title: checkRes,
						icon: "none"
					});
					console.log("手机号不正确，认证失败");
					return;
				} 
				uni.uploadFile({
					url: 'http://172.16.2.116:8000/api/enterprise/setinfo',
					files: [{
						uri: this.business_license,
						name: 'business_license'
					},
					{
						uri: this.legal_person_ID,
						name: 'legal_person_ID'
					}],
					formData:{
						'id': this.userID,
						'name': this.name,
						'address': this.address,
						'website': this.website,
						'instruction': this.instruction,
						'phone': this.phone,
						'legal_representative': this.legal_representative,
						'register_capital': this.register_capital,
						'field': this.field,
					},
					success: (uploadFileRes) => {
						console.log(uploadFileRes.data);
						console.log("认证申请已发送");
						this.back();
					},
					fail: (err) => {
						console.log("认证失败");
					}
				})
				return;
			}
		}
	};
</script>

<style lang="scss" scoped>
	.container {
		.tui-page-title {
			width: 100%;
			font-size: 48rpx;
			font-weight: bold;
			color: $uni-text-color;
			line-height: 42rpx;
			padding: 110rpx 40rpx 40rpx 40rpx;
			box-sizing: border-box;
		}
		.tui-header {
			width: 100%;
			padding: 40rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			box-sizing: border-box;
		}
		.tui-form {
			padding-top: 50rpx;
			
			.thorui-input-title {
				padding-right: 10rpx;
				font-size: 35rpx;
			}

			.tui-view-input {
				width: 100%;
				box-sizing: border-box;
				padding: 0 40rpx;

				.tui-cell-input {
					width: 100%;
					display: flex;
					align-items: center;
					padding-top: 48rpx;
					padding-bottom: $uni-spacing-col-base;

					input {
						flex: 1;
						padding-left: $uni-spacing-row-base;
					}

					.tui-icon-close {
						margin-left: auto;
					}

					.tui-btn-send {
						width: 156rpx;
						text-align: right;
						flex-shrink: 0;
						font-size: $uni-font-size-base;
						color: $uni-color-primary;
					}

					.tui-gray {
						color: $uni-text-color-placeholder;
					}
				}
			}

			.tui-cell-text {
				width: 100%;
				padding: 40rpx $uni-spacing-row-lg;
				box-sizing: border-box;
				font-size: $uni-font-size-sm;
				color: $uni-text-color-grey;
				display: flex;
				align-items: center;

				.tui-color-primary {
					color: $uni-color-primary;
					padding-left: $uni-spacing-row-sm;
				}
			}

			.tui-btn-box {
				width: 100%;
				padding: 0 $uni-spacing-row-lg;
				box-sizing: border-box;
				margin-top: 80rpx;
			}
		}
	}
</style>
