import Vue from 'vue'
import Vuex from 'vuex'

import movie from './module/movie';
import classic from './module/classic';
import willplay from './module/willplay';
import cinema from './module/cinema';
import city from './module/city';
import movieCinema from './module/movieCinema';
import movieDetail from './module/movieDetail';
import video from './module/video';
import smallVideo from './module/smallVideo';
import cinemaDetail from './module/cinemaDetail';
import chooseSeats from './module/chooseSeats';

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
    movie,
    classic,
    willplay,
    cinema,
    city,
    movieCinema,
    movieDetail,
    video,
    smallVideo,
    cinemaDetail,
    chooseSeats
  }
})
