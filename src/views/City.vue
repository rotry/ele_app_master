<template>
	<div class="city">
		<Header :title="this.$route.meta.title"></Header>
		<div class="city_input">
			<el-input
				placeholder="请输入内容"
				v-model="input"
				clearable>
			</el-input>
			<el-button type="primary" @click="searchAddress">搜索</el-button>
		</div>
		<div class="city_content_history" v-show="isShow">
			<div class="city_content_title"><span>搜索历史</span><span @click="deleHistoryPlace">清空历史</span></div>
			<div class="city_content">
				<div class="city_content_item" @click="getAddress(item)" v-for="(item,index) in hisPlace" :key="index">
					<div class="address">{{item.name}}</div>
					<div class="detail">{{item.address}}</div>
				</div>
			</div>
		</div>
		<div class="city_content_search" v-show="!isShow">
			<div class="city_content">
				<div class="city_content_item" @click="getAddress(item)" v-for="(item,index) in searchList" :key="index">
					<div class="address">{{item.name}}</div>
					<div class="detail">{{item.address}}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Header from "../components/Header";
import fetch from "../utils/fetch";

export default {
	name: "City",
	data(){
		return{
			input:'',
			hisPlace:{},
			searchList:[],
			isShow: true
		}
	},
	methods:{
		deleHistoryPlace(){
			localStorage.removeItem('placeHistory');
			this.hisPlace = {};
		},
		searchAddress(){
			// 获取搜索的关键字
			let keyword = this.input;
			let city_id = this.$route.params.id;
			fetch('/v1/pois',{
				keyword,
				city_id,
				type:'search'
			},'GET').then(res => {
				if (res){
					this.searchList = res || [];
					this.isShow = false
				}

			})
		},
		getAddress(address){
			// 加入到历史记录中
			let his = JSON.parse(localStorage.getItem('placeHistory'));
			his.unshift(address);
			let deWeightThree = () => {
				let map = new Map();
				for (let item of his) {
					if (!map.has(item.name)) {
						map.set(item.name, item);
					}
				}
				return [...map.values()];
			}
			his = deWeightThree();
			localStorage.setItem('placeHistory',JSON.stringify(his));
		}
	},
	components:{
		Header
	},
	mounted() {
		this.hisPlace = JSON.parse(localStorage.getItem('placeHistory'));
	}
}
</script>

<style scoped>
.city_input{
	margin-top: 10px;
	width: 100%;
	display: flex;
	flex-direction: row;
}
.city_content_history{
	margin-top: 10px;
}
.city_content_title{
	font-size: 12px;
	color: #333;
	border-bottom: 1px silver solid;
	display: flex;
	justify-content: space-between;
}
.city_content{
	background-color: #f5f5f5 !important;
	margin-top: 2px;
}
.city_content_item{
	width: 100%;
	border-bottom: 1px silver solid;
}
.address{
	font-size: 16px;
	color: #333;
	margin-top: 6px;
	margin-left: 5px;
}
.detail{
	font-size: 12px;
	color: #999;
	margin-top: 6px;
	margin-bottom: 10px;
	margin-left: 5px;

}
</style>
