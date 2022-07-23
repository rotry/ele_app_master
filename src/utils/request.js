// 引入axios
import axios from "axios";
//创建对象
const service = axios.create({
    baseURL:'http://elm.cangdu.org',
    timeout:5000
})
// 封装请求
const request = {
    get(url,params){
        return new Promise((resolve, reject) => {
            service.get(url,{params:params}).then(
                res => {
                    resolve(res.data);
                }
            ).catch(
                error => {
                    reject(error.data);
                }
            )
        });
    },
    post(url,data){
        return new Promise((resolve, reject) => {
            service.post(url,data).then(
                res => {
                    resolve(res.data);
                }
            ).catch(
                error => {
                    reject(error.data);
                }
            )
        });
    }
};
export default request;
