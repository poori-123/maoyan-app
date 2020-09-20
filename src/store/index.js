import Vue from 'vue'
import Vuex from 'vuex'

import movie from './module/movie';
import classic from './module/classic';
import willplay from './module/willplay';
import cinema from './module/cinema';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    movie,
    classic,
    willplay,
    cinema
  }
})
