import Vue from 'vue'
import Vuex from 'vuex'

import movie from './module/movie';
import classic from './module/classic';
import willplay from './module/willplay';
import cinema from './module/cinema';
import city from './module/city';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    chooseCity: {
      id: 30,
      nm: "深圳",
      py: "shenzhen"
    }
  },
  mutations: {
    setCity(state,payload){
      state.chooseCity = payload;
    }
  },
  actions: {
  },
  modules: {
    // movie,
    // classic,
    // willplay,
    cinema,
    city
  }
})
