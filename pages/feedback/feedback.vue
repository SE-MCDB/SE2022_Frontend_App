<template>
	<!-- 问题与反馈界面 -->
	<view class="container">
		<uni-section title="问题与反馈" type="line">
			<view class="example">
				<!-- 基础用法，不包含校验规则 -->
				<uni-forms ref="baseForm" :rules="myRules" :modelValue="baseFormData">
					<uni-forms-item label="用户名" required name="name">
						<uni-easyinput v-model="baseFormData.name" placeholder="请输入用户名" />
					</uni-forms-item>
					<uni-forms-item label="邮箱" required name="email">
						<uni-easyinput v-model="baseFormData.age" placeholder="请输入邮箱" />
					</uni-forms-item>
					<uni-forms-item label="性别" required name="sex">
						<uni-data-checkbox v-model="baseFormData.sex" :localdata="sexs" />
					</uni-forms-item>
					<uni-forms-item label="问题类型" required name="qtype">
						<uni-data-checkbox v-model="baseFormData.qtype" multiple :localdata="qtypes" />
					</uni-forms-item>
					<uni-forms-item label="问题描述" required name="description">
						<uni-easyinput type="textarea" v-model="baseFormData.description" placeholder="为更快解决您的问题,请您尽可能详细地描述您的问题" />
					</uni-forms-item>
					<uni-forms-item label="当前时间">
						<uni-datetime-picker type="datetime" return-type="timestamp" v-model="baseFormData.datetimesingle"/>
					</uni-forms-item>
				</uni-forms>
				<button type="primary" @click="submit('baseForm')">提交</button>
			</view>
		</uni-section>
	</view>
</template>

<script>
	// import {
	// 	submit_feedback
	// } from '@/api/certificate.js';
	import {
		mapMutations,
		mapState
	} from 'vuex';
	import uploadLicense from "@/components/uploadImages/uploadLicense.vue"
	import uploadID from "@/components/uploadImages/uploadID.vue"
	
	export default {
		data() {
			return {
				// 基础表单数据
				baseFormData: {
					name: '',
					email: '',
					sex: 2,
					qtype: [5],
					description: '',
					datetimesingle: Date(),
				},
				// 表单数据
				alignmentFormData: {
					name: '',
					age: '',
				},
				// 单选数据源
				sexs: [{
					text: '男',
					value: 0
				}, {
					text: '女',
					value: 1
				}, {
					text: '保密',
					value: 2
				}],
				// 多选数据源
				qtypes: [{
					text: '订单相关',
					value: 0
				}, {
					text: '支付相关',
					value: 1
				}, {
					text: '账号相关',
					value: 2
				}, {
					text: '安全相关',
					value: 3
				}, {
					text: '反馈建议',
					value: 4
				}, {
					text: '其他',
					value: 5
				}],

				// 自定义表单校验规则
				myRules: {
					name: {
						rules: [{
							required: true,
							errorMessage: '用户名不能为空'
						}]
					},
					email: {
						rules: [{
							required: true,
							errorMessage: '邮箱不能为空'
						}, {
							format: 'email',	// 貌似内置提供了email的类型
							errorMessage: '邮箱格式不正确'
						}]
					},
					qtype: {
						rules: [{
								format: 'array'
							},
							{
								validateFunction: function(rule, value, data, callback) {
									if (value.length < 1) {
										callback('请至少勾选一个问题类型')
									}
									return true
								}
							}
						]
					},
					description: {
						rules: [{
							required: true,
							errorMessage: '问题描述不能为空'
						}]
					},
				},
			}
		},
		computed: {

		},
		onLoad() {},
		onReady() {
			// 设置自定义表单校验规则，必须在节点渲染完毕后执行
			this.$refs.baseForm.setRules(this.myRules)
		},
		methods: {
			onClickItem(e) {
				console.log(e);
				this.current = e.currentIndex
			},
			
			submit(ref) {
				this.$refs[ref].validate().then(res => {
					console.log('success', res);
					uni.showToast({
						title: `已提交`
					})
				}).catch(err => {
					console.log('err', err);
				})
			},
		}
	}
	
</script>

<style lang="scss">

	.example {
		padding: 15px;
		background-color: #fff;
	}

	.segmented-control {
		margin-bottom: 15px;
	}

	.button-group {
		margin-top: 15px;
		display: flex;
		justify-content: space-around;
	}

	.form-item {
		display: flex;
		align-items: center;
	}

	.button {
		display: flex;
		align-items: center;
		height: 35px;
		margin-left: 10px;
	}
</style>