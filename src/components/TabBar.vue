<template>
	<div class="tabbar">
		<router-link class="tab_item"
		             :to="item.path"
		             v-for="(item,index) in data"
		             :key="index"
		             active-class="is_selected">
			<div class="tab_item_icon">
				<i :class="item.icon"></i>
			</div>
			<div class="tab_item_label">{{item.title}}</div>
		</router-link>
	</div>
</template>

<script>
export default {
	name: "TabBar",
	props:{
		data:Array
	}
}
</script>

<style scoped>
.tabbar {
	height: 45px;
	box-sizing: border-box;
	width: 100%;
	position: fixed;
	bottom: 0;
	background-image: linear-gradient(
		180deg,
		#d9d9d9,
		#d9d9d9 50%,
		transparent 0
	);
	background-size: 100% 1px;
	background-repeat: no-repeat;
	background-position: 0 0;
	background-color: #fafafa;
	display: flex;
	text-align: center;
}
.tab_item {
	display: block;
	padding: 3px 0;
	flex: 1;
}
.tab_item_icon {
	width: 20px;
	height: 20px;
	margin: 0 auto 5px;
}
.tab_item_icon i {
	font-size: 16px;
}
.tab_item_label {
	color: inherit;
	font-size: 10px;
	line-height: 1;
}
a {
	text-decoration: none;
	color: #999;
}
.is_selected {
	color: #009eef;
}
</style>
