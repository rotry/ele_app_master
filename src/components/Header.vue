<template>
	<div class="header">
		<div class="header_icon">
			<i class="el-icon-plus icon" @click="$router.push('/cities')" v-if="toPath === '/home' || $route.path==='/home'"></i>
			<i class="el-icon-arrow-left  icon" @click="$router.push('/home')" v-else></i>
		</div>
		<div class="header_title">{{title}}</div>
		<div class="header_iconme">
			<i class="el-icon-user icon" @click="$router.push('/me')"></i>
		</div>
	</div>
</template>

<script>
export default {
	name: "Header",
	data(){
		return{
			toPath:''
		}
	},

	props:{
		routePath:String,
		title:String
	},
	watch:{
		$route: {
			handler: function(to, from){
				this.toPath = to.path;
			},
			// 深度观察监听
			deep: true
		}
	}
}
</script>

<style scoped>
	.header{
		width: 100%;
		height: 50px;
		background: #009eef;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
	}
	.header_title{
		width: 210px;
		font-size: 18px;
		color: #ffffff;
		text-align: center;
	}
	.icon{
		font-size: 24px;
		color: #ffffff;
	}

</style>
