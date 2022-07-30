<template>
	<div class="cities">
		<Header :title="this.$route.meta.title"></Header>
		<div class="city_current city">
			<div class="city_current_title">
				<span>当前定位城市</span>
			</div>
			<div class="city_current_item" @click="toDetail(guessAddress.id)">
				<span style="font-size: 20px;color: #009eef">{{ guessAddress.name }}</span>
			</div>
		</div>
		<div class="city_hot city">
			<h4 class="city_title">
				<span>热门城市</span>
			</h4>
			<ul class="city_ul_item" style="color: #009eef">

				<li class="city_item" @click="toDetail(item.id)" v-for="(item,index) in hotAddress" :key="index">{{item.name}}</li>
			</ul>
		</div>
		<div class="city_all">
			<div class="city_all_item city" v-for="(value,key) in groupAddress" :key="key">
				<h4 class="city_title">
					<span>{{key}}</span>
				</h4>
				<ul class="city_ul_item">
					<li class="city_item" @click="toDetail(item.id)" v-for="(item,i) in value" :key="i">{{item.name}}</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import {mapState} from "vuex";
import Header from "../components/Header";

export default {
	name: "Cities",
	components: {Header},
	computed: {
		...mapState({
			guessAddress:state => state.address.guessAddress,
			hotAddress:state => state.address.hotAddress,
			groupAddress:state => {
				let arys = state.address.groupAddress;
				let newkey = Object.keys(arys).sort();
				let newObj = {}; //创建一个新的对象，用于存放排好序的键值对
				for(let i = 0; i < newkey.length; i++) {
					newObj[newkey[i]] = arys[newkey[i]];

				}
				return newObj;
			}
		})
	},
	methods:{
		toDetail(_id){
			let id = _id;
			localStorage.setItem('cityId',id);
			this.$router.push({
				name:'city',
				params:{
					id
				}
			})
		}
	}
}
</script>

<style scoped>
.city_current_title {
	width: calc(100% - 2px);
	height: 40px;
	border: #d9d9d9 1px solid;
	line-height: 40px;

}
.city_current_item{
	width: calc(100% - 2px);
	height: 35px;
	border: #d9d9d9 1px solid;
	line-height: 40px;
}
.city_title {
	width: calc(100% - 1px * 2);
	height: 40px;
	line-height: 40px;
	border: #d9d9d9 1px solid;
}

span {
	margin-left: 10px;
}

.city_ul_item {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
}

.city_item {
	width: calc(25% - 0.8px * 2);
	height: 45px;
	line-height: 45px;
	text-align: center;
	border: #d9d9d9 1px solid;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.city {
	background: #ffffff;
}

.city_hot {
	margin-top: 10px;

}
</style>
