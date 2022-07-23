import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import address from './address'
export default new Vuex.Store({
  modules:{
    address
  }
})
