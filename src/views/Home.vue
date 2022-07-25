<template>
	<div class="home">
		<div class="home_swiper">
			<Swiper :catagoryList="catagoryList"></Swiper>
		</div>
		<div class="home_food">
			<div class="food_title">
				<li class="el-icon-s-shop" style="font-size: 18px"></li>
				<div class="food_title_text">附近商店</div>
			</div>
			<ul class="food_list">
				<li class="food_item" :key="index" v-for="(item,index) in shopList">
					<div class="food_item_img">
						<img :src="'https://elm.cangdu.org/img/' + item.image_path" alt="">
					</div>
					<div class="food_item_content">
						<div class="row">
							<div class="content_type">品牌</div>
							<div class="content_title">{{ item.name }}</div>
							<div class="content_piao">{{item.supports[0].icon_name + item.supports[1].icon_name}}</div>
						</div>
						<div class="row">
							<div class="content_rank">评分：<span>{{item.rating}}</span></div>
							<div class="content_number">月做{{ item.recent_order_num }}单</div>
							<div class="content_song">{{item.delivery_mode.text}}</div>
							<div class="content_ontime">准时达</div>
						</div>
						<div class="row">
							<div class="content_price">￥{{ item.float_minimum_order_amount }}元起送/{{item.piecewise_agent_fee.tips}}</div>
							<div class="content_rate">{{item.distance}}/{{item.order_lead_time}}</div>
						</div>
					</div>
				</li>

			</ul>
		</div>
	</div>
</template>

<script>
import fetch from "../utils/fetch";
import Swiper from "../components/Swiper";

export default {
	name: "Home",
	data() {
		return {
			address: "",
			catagoryList: [],
			shopList: []
		}
	},
	components: {
		Swiper
	},
	mounted() {
		this.getAddressBygeohash();
		this.getCatagoryList();
		this.getShop();
	},
	methods: {
		getAddressBygeohash() {
			fetch(`/v2/pois/${localStorage.getItem('geohash')}`,
				{}, 'GET').then(res => {
				this.address = res;
			})
		},
		getCatagoryList() {
			fetch('/v2/index_entry', {}, 'GET').then(res => {
				this.catagoryList = res;
			})
		},
		// 获取店铺
		getShop() {
			// 获取经纬度
			let geohash = localStorage.getItem('geohash');
			let array = geohash.split(',');
			fetch('/shopping/restaurants', {

				latitude: array[0],
				longitude: array[1]

			}, 'GET').then(res => {
				console.log(res)
				this.shopList = res
			})
		}
	}
}
</script>

<style scoped>
.home_food {
	margin-top: 10px;
	width: 100%;
	background: white;
}

.food_title {
	width: 100%;
	height: 40px;
	display: flex;
	flex-direction: row;
	align-items: center;
}

.food_title li {
	margin-left: 10px;
}

.food_title_text {
	margin-left: 5px;
	font-size: 18px;
	color: #999999;
}

.food_list {
	background: white;
	width: 100%;
	margin-bottom: 45px;
}
.food_item{
	width: calc(100% - 20px);
	height: 90px;
	padding: 10px;
}
.food_item{
	display: flex;
	flex-direction: row;
	align-items: center;
	border-bottom: 1px solid #d9d9d9;
}
.food_item_img{
	width: 60px;
	height: 60px;
	display: flex;
}
.food_item_img img{
	width: 100%;
}
.food_item_content{
	display: flex;
	flex-direction:column ;
	margin-left:10px ;
}
.row{
	display: flex;
	flex-direction: row;
	margin-top: 5px;
	line-height: 25px;
}
.content_type{
	background: #ffd930;
	color: #555;
	font-weight: bold;
	border-radius: 5px;
}
.content_title{
	font-size: 18px;
	font-weight: bold;
	margin-left: 5px;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
	width: 100px;
}
.content_piao{
	color: #999;
	font-size: 12px;
}
.content_rank{
	font-size: 14px;
	color: #555;
	font-weight: bold;
}
.content_rank span{
	color:orange ;
	font-size: 18px;
}
.content_number{
	margin-left: 5px;
	font-size: 12px;
	font-weight: bold;
	color: #999999;
}
.content_song{
	margin-left: 65px;
	background: deepskyblue;
	border-radius: 5px;
	font-size: 10px;
	color: white;
}
.content_ontime{
	border: 1px solid deepskyblue;
	margin-left: 5px;
	color: deepskyblue;
	font-size: 10px;
	border-radius: 5px;
}
.content_price{
	color: #666;
	font-size: 12px;
	font-weight: bold;
}
.content_rate{
	color: #666;
	font-size: 12px;
	font-weight: bold;
	margin-left: 50px;
}
</style>
