<template>
	<div class="text_group">
		<!--组件结构-->
<!--		组件容器-->
		<div class="input_group" :class="{'is-invalid':error}">
			<input :type="type" :value="value"
			       :placeholder="placeholder"
			       :name="name"
			       @input="$emit('input',$event.target.value)">
<!--		输入框后面的按钮-->
			<img v-if="imgCode" :src="imgCode" alt="" @click="$emit('btnClick')">

		</div>
		<!--		错误提醒-->
		<div v-if="error" class="invalid_feedback">{{error}}</div>
	</div>
</template>

<script >
export default {
	name: "InputGroup",
	props: {
		type: {
			type: String,
			default:"text"
		},
		value:String,
		placeholder: String,
		name:String,
		imgCode:String,
		error:String
	}
}
</script>

<style scoped>
.input_group {
	border: 1px solid #ccc;
	border-radius: 4px;
	padding: 10px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.input_group input {
	height: 100%;
	width: 60%;
	outline: none;
}
.input_group button {
	border: none;
	outline: none;
	background: #fff;
}
.input_group button[disabled] {
	color: #aaa;
}
.is-invalid {
	border: 1px solid red;
}
.invalid_feedback {
	color: red;
	padding-top: 5px;
}
img{
	height: 16px;
}
</style>
