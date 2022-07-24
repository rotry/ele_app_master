<template>
	<div class="home">
		<div class="home_swiper">
			<Swiper :catagoryList="catagoryList"></Swiper>
		</div>
		<div>
			<ul>
				<li>

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
			shopList:[]
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
			})
		}
	}
}
</script>

<style scoped>

</style>
