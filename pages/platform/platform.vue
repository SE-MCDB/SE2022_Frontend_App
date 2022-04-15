<template>
	<view>
		
		
	</view>
</template>

<script>
	import paperList from "../../components/paper/paper-list.vue";
	import loadMore from "../../components/common/load-more.vue";
	import paperLeftPopup from "../../components/paper/paper-left-popup.vue";
	import time from '../../common/time.js'
			import noThing from "../../components/common/no-thing.vue";
	import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue'
	import {
		mapMutations,
		mapState,
		mapGetters,
		mapActions
		
	} from 'vuex'
	import {
		getChatList,
		deleteChat,
		updateChat,
		createSocket,
		readChatMsg
	} from '@/api/paper.js'
	import Vue from 'vue'
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
