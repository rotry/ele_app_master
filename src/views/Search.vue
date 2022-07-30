<template>
	<div class="search">
		<div class="search_text">
			<el-input class="input"
				placeholder="请输入内容"
				v-model="inputKey"
				clearable>
			</el-input>
			<el-button type="primary" @click="handleSearch">搜索</el-button>
		</div>
		<div class="title" v-if="searchList.length !==0 && inputKey !== ''">商家</div>
		<div class="search_data">

			<div class="search_item" v-for="(item,index) in searchList" :key="index">
				<div class="item_img">
					<img :src="'https://elm.cangdu.org/img/' + item.image_path" alt="">
				</div>
				<div class="item_content">
					<div class="item_name">{{item.name}}</div>
					<div class="item_number item">月售 {{item.recent_order_num}} 单</div>
					<div class="item_speed item">{{ item.float_minimum_order_amount }} 元起送 / 距离{{item.distance}}公里</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import fetch from "../utils/fetch";
export default {
	name: "Search",
	data(){
		return{
			inputKey:'',
			searchList:[]
		}
	},
	methods:{
		handleSearch(){
			// 获取搜索数据
			let data ={
				geohash:localStorage.getItem('geohash'),
				keyword:this.inputKey,
				'extras[]': 'restaurant_activity'
			}
			// 发送网络请求
			fetch('/v4/restaurants',data,'get').then(res => {
				this.searchList = res
			})
		}
	},
	watch:{
		inputKey(newVal, oldVal) {
			if (newVal === ''){
				this.searchList = [];
			}

		}
	}
}
</script>

<style scoped>
	.search_text{
		padding: 5px;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}
	.input{
		width: 70%;
	}
	.search_data{
		padding: 10px;
		width:calc(100% - 20px);
		background: white;
		margin-bottom: 45px;
	}
	.search_item{
		width: calc(100% - 20px);
		height: 60px;
		display: flex;
		align-items: center;
		padding: 10px;
		border-bottom: 1px solid silver;
	}
	.item_img{

		width: 40px;
		height: 40px;
	}
	.item_img img{
		width: 100%;
		height: 100%;
	}
	.item_content{
		margin-left:10px ;
	}
	.item{
		margin-top: 5px;
	}
	.title{
		margin-top: 10px;
		padding: 10px;
		font-size: 20px;
	}
</style>
