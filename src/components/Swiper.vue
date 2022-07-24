<template>
	<div class="swiper">
		<el-carousel arrow="never" :autoplay="true" :interval="5000" height="150px">
			<el-carousel-item>
				<ul class="category">
					<li v-for="item in list1" class="category_item">
						<div class="item_img">
							<img :src="'https://fuss10.elemecdn.com' + item.image_url" alt="">

						</div>
						<div class="item_title">{{ item.title }}</div>
					</li>
				</ul>
			</el-carousel-item>
			<el-carousel-item>
				<ul class="category">
					<li v-for="item in list2" class="category_item">
						<div class="item_img">
							<img :src="'https://fuss10.elemecdn.com' + item.image_url" alt="">

						</div>
						<div class="item_title">{{ item.title }}</div>
					</li>
				</ul>
			</el-carousel-item>
		</el-carousel>
	</div>
</template>

<script>
export default {
	name: "Swiper",
	props: {
		catagoryList: Array
	},
	computed: {
		list1() {
			let list1 = []
			for (let i = 0; i < this.catagoryList.length / 2; i++) {
				list1.push(this.catagoryList[i]);
			}
			return list1;

		},
		list2() {
			let list2 = []
			for (let i = this.catagoryList.length / 2; i < this.catagoryList.length; i++) {
				list2.push(this.catagoryList[i]);
			}
			return list2;
		}
	}
}
</script>

<style scoped>
.swiper{
	background: #ffffff;
}
.category {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
}

.item_img img {
	width: 42px;
	height: 42px;
}

.item_title {
	color: #666;
	margin-top: 5px;
	font-size: 13px;
}

.category_item {
	width: 25%;
	align-items: center;
	justify-content: center;
	display: flex;
	flex-direction: column;
}
</style>
