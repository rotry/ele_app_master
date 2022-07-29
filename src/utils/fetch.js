
/**
 * 封装fetch的请求
 * @param url 请求的地址
 * @param data 请求的参数
 * @param type 请求方式，目前只针对get和post
 */
const baseUrl = 'https://elm.cangdu.org'
export default async (url,data={},type) => {
	// 大写请求
	type = type.toUpperCase();
	// 拼接地址
	url = baseUrl + url;
	// get请求
	if (type === 'GET'){
		// 判断师父有参数
		let string = "";
		if (data){
			string = new URLSearchParams(data).toString();
		}
		if (string){
			url = `${url}?${string}`;
		}
		// 发送请求
		return new Promise(async (resolve, reject) => {
			try{
				let response = await fetch(url, {
					method: type
				});
				resolve(response.json());
			}catch (error){
				reject(error);
			}

		})

	}
	if (type==='POST'){

		return new Promise(async (resolve, reject) => {
			// 发送请求
			try {
				let response = await fetch(url,{
					method:type,
					headers: {
						"Content-Type":"application/json"
					},
					body:JSON.stringify(data)
				});
				resolve(response.json());
			}catch (error){
				reject(error);
			}
		})

	}
}
