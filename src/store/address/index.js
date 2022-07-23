import fetch from "../../utils/fetch";

const state = () => ({
    guessAddress: {},
    hotAddress: {},
    groupAddress: {}
});
const actions = {
    /**
     * 获取定位城市
     * @param context
     * @param value
     */
    getGuessAddress(context, value) {
        // 网络请求
        fetch('/v1/cities', {
            type: 'guess'
        }, 'GET').then(res => {
            value = res;
            context.commit("GETGUESSADDRESS", value);
        })
    },
    getGroupAddress(content, value) {
        // 获取网络
        fetch('/v1/cities',{
            type:'group'
        },'GET').then(res => {
            content.commit('GETGROUPADDRESS',res);
        })
    },
    getHotAddress(content, value) {
        // 获取网络
        fetch('/v1/cities',{
            type:'hot'
        },'GET').then(res => {
            content.commit('GETHOTADDRESS',res);
        })
    }
};
const mutations = {
    GETGUESSADDRESS(state, value) {
        state.guessAddress = value;
        console.log('定位城市有：',state.guessAddress);
    },
    GETHOTADDRESS(state, value) {
        state.hotAddress = value;
        console.log('热门城市有：',state.hotAddress);
    },
    GETGROUPADDRESS(state, value) {
        state.groupAddress = value;
        console.log('全部城市有：',state.groupAddress);
    }

};
const getters = {

};
export default {
    state,
    actions,
    mutations,
    getters
}
