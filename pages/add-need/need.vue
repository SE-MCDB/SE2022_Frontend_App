<template>
	<view class="container">
			<view class="tui-status-bar">
				<uni-card :is-shadow="false" is-full>
					<text class="uni-h6">需求描述</text>
				</uni-card>
			</view>
			<view class="need-form">
				<form @submit="formSubmit" @reset="formReset">
					<uni-section title="需求标题" subTitle="为您的需求总结一个标题" type="line" padding>
						<uni-easyinput errorMessage v-model="title" focus placeholder="请输入内容" @input="inputTitle"></uni-easyinput>
					</uni-section>
					<uni-section title="需求描述" subTitle="详细描述您的需求" type="line" padding>
						<uni-easyinput type="textarea" v-model="description" placeholder="请输入内容" @input="inputDescription"></uni-easyinput>
					</uni-section>
					<uni-section title="经费" subTitle="为您的需求标上价格" type="line" padding>
						<uni-easyinput type="digit" v-model="money" placeholder="请输入内容" @input="inputMoney"></uni-easyinput>
					</uni-section>
					<uni-section title="开始日期" subTitle="请选择需求开始日期" type="line" padding>
						<tui-datetime ref="start_time" @confirm="changeStart" v-model="start_time" :type="1">
						</tui-datetime>
					</uni-section>
					<uni-section title="结束日期" subTitle="请选择需求结束日期" type="line" padding>
						<tui-datetime ref="end_time" @confirm="changeEnd" v-model="valid_time" :type="1">
						</tui-datetime>
					</uni-section>
					<uni-section title="关键词" subTitle="请为您的需求添加几个关键词" type="line" padding>
						<uni-easyinput v-model="key_word" placeholder="请输入一些关键词,以空格分开" @input="inputKeyword"></uni-easyinput>
					</uni-section>
					<uni-section title="领域" subTitle="请为您的需求确定一个领域方向" type="line" padding>
						<!-- <tui-picker :show="show" :pickerData="field_items" @hide="hide" @change="inputField">
						</tui-picker> -->
						<picker @change="inputField" :value="index" :range="field_items">
							<view class="uni-input">{{field_items[index]}}</view>
						</picker>
					</uni-section>
					<uni-section title="地址" subTitle="请为您的需求添加地址" type="line" padding>
						<uni-easyinput v-model="address" placeholder="请输入需求地址" @input="inputAddress"></uni-easyinput>
					</uni-section>
					<uni-section title="紧急程度" subTitle="请为您的需求进行紧急估量" type="line" padding>
						<view class="uni-list">
							<radio-group @change="radioChange">
								<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in emergencyItems" :key="item.value">
									<view>
										<radio :value="item.value" :checked="index === emergency" />
									</view>
									<view>{{item.name}}</view>
								</label>
							</radio-group>
						</view>
					</uni-section>
					<uni-section title="预估人数" subTitle="为您的需求商定所需人数" type="line" padding>
						<uni-easyinput type="digit" v-model="predict" placeholder="请输入内容" @input="inputPredict"></uni-easyinput>
					</uni-section>
					
					<view class="uni-btn-v">
						<button form-type="submit">Submit</button>
						<button type="default" form-type="reset">Reset</button>
					</view>
				</form>
			</view>
		</view>
</template>
<script>
	import {
		mapMutations,
		mapState
	} from 'vuex';
	import uniCard from '@/components/uni_modules/uni-card/components/uni-card/uni-card.vue'
	import uniEasyinput from '@/components/uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.vue'
	import uniSection from '@/components/uni-section/uni-section.vue'
	import tuiDatetime from '@/components/thorui/tui-datetime/tui-datetime.vue'
	// import tuiPicker from "@/components/thorui/tui-picker/tui-picker"
	export default {
		components:{
			uniCard,
			uniEasyinput,
			uniSection,
			tuiDatetime,
			// tuiPicker
		},
		data() {
			return {
				company_id: '',
				title: '',
				description: '',
				money: '',
				start_time: '',
				valid_time: '',
				key_word: '',
				field: '',
				address: '',
				state: 0,
				emergency: '',
				predict: '',
				index: 0,
				field_items: [
					"计算机", "美术"
				],
				emergencyItems: [
					{
						value: '0',
						name: '非紧急'
					},
					{
						value: '1',
						name: '紧急'
					}
				]
			};
		},
		methods: {
			//验证手机号码
			back() {
				uni.navigateBack();
			},
			inputTitle(e) {
				this.title = e.detail;
			},
			inputDescription(e) {
				this.description = e.detail;
			},
			inputMoney(e) {
				this.money = e.detail;
			},
			show: function(e) {
				this.$refs.start_time.show();
			},
			changeStart: function(e) {
				this.start_time = e.result;
			},
			// show: function(e) {
			// 	this.$refs.end_time.show();
			// },
			changeEnd: function(e) {
				this.valid_time = e.result;
			},
 			inputKeyword(e) {
				this.key_word = e.detail.split(" ");
			},
			inputField(e) {
				this.field = e.detail;
			},
			inputRegisterCapital(e) {
				this.register_capital = e.detail;
			},
			inputField(e) {
				this.field = e.detail;
			},
			inputAddress(e) {
				this.address = e.detail;
			},
			radioChange: function(evt) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.detail.value) {
						this.emergency = i;
						break;
					}
				}
			},
			Submit: function(e) {
				
			},
			Reset: function(e) {
				
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
