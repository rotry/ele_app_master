<template>
	<div class="index">
		<Header :title="title"></Header>
		<router-view></router-view>
		<TabBar :data="tabbarData"></TabBar>
	</div>
</template>

<script>
import TabBar from "../components/TabBar";
import Header from "../components/Header";
export default {
	name: "index",
	data(){
		return{
			tabbarData:[
				{
					title:'首页',
					icon:'el-icon-eleme',
					path:'/home'
				},
				{
					title:'搜索',
					icon:'el-icon-search',
					path:'/search'
				},
				{
					title:'订单',
					icon:'el-icon-document',
					path:'/order'
				},
				{
					title:'我的',
					icon:'el-icon-user',
					path:'/me'
				}
			]
		}
	},
	computed:{
		title(){
			return this.$route.meta.title;
		}
	},
	components:{
		TabBar,
		Header
	}
}
</script>

<style scoped>
.index{
	width: 100%;
	height: calc(100% - 45px);
}
</style>
