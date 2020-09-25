import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Home from '../views/Home.vue';
import Movie from '../components/home/movie.vue';

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    redirect: '/home/movie',
    children: [
      {
        path: 'movie',
        name: 'movie',
        component: Movie
      },
      {
        path: 'cinema',
        name: 'cinema',
        component: () => import(/* webpackChunkName:"cinema" */ '../components/home/cinema.vue'),
      },
      {
        path: 'willplay',
        name: 'willplay',
        component: () => import(/* webpackChunkName:"willplay" */ '../components/home/willplay.vue')
      },
      {
        path: 'classic',
        name: 'classic',
        component: () => import(/* webpackChunkName:"classic" */ '../components/home/classic.vue')
      },
      {
        path: 'city',
        name: 'city',
        component: () => import(/* webpackChunkName:"city" */ '../components/home/city.vue')
      },
      {
        path: 'md/:id',
        name: 'movieDetail',
        component: () => import(/* webpackChunkName:"movieDetail" */ '../components/home/movieDetail.vue')
      },
      {
        path: 'mc/:id',
        name: 'movieCinema',
        component: () => import(/* webpackChunkName:"movieCinema" */ '../components/home/movieCinema.vue')
      },
      {
        path: 'cd/:id',
        name: 'cinemaDetail',
        component: () => import(/* webpackChunkName:"cinemaDetail" */ '../components/home/cinemaDetail.vue')
      }
    ]
  },
  {
    path: '/video',
    name: 'video',
    component: () => import(/* webpackChunkName:"video" */ '../views/Video.vue'),
    children: [
      {
        path: 'vd/:query',
        name: 'videoDetail',
        component: () => import(/* webpackChunkName:"videoDetail" */ '../components/home/videoDetail.vue')
      }
    ]
  },
  {
    path: '/smallvideo',
    name: 'smallvideo',
    component: () => import(/* webpackChunkName:"smallvideo" */ '../views/SmallVideo.vue')
  },
  {
    path: '/mycenter',
    name: 'mycenter',
    component: () => import(/* webpackChunkName:"mycenter" */ '../views/MyCenter.vue')
  },
  {
    path: '/rank',
    name: 'rank',
    component: () => import(/* webpackChunkName:"rank" */ '../views/Rank.vue')
  },
  {
    path: '/hot',
    name: 'hot',
    component: () => import(/* webpackChunkName:"hot" */ '../views/Hot.vue')
  },
  {
    path: '/shop',
    name: 'shop',
    component: () => import(/* webpackChunkName:"shop" */ '../views/Shop.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
