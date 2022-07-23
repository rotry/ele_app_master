<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<script>
export default {
	mounted() {
		// 派发action 获取定位地址信息
		this.$store.dispatch('getGuessAddress');
		this.$store.dispatch('getHotAddress');
		this.$store.dispatch('getGroupAddress');


	}
}
</script>
<style>
#app {
	width: 100%;
	height: 100%;
	font-size: 14px;
	background: #f1f1f1;
}
</style>
