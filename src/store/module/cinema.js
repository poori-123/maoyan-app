import Http from '../../api/http';
import axios from 'axios';
import { GETCINEMA_API,GETCINEMA_TYPE } from '../../api/url';
export default {
    namespaced: true,
    state: {
        cinemaType: {},
        cinemaList: '',
        isinit: false,
        isLoadMore: false
    },
    getters: {
        cityId(s1,g1,s2,g2){
            return s2.chooseCity.id;
        }
    },
    mutations: {
        initCinema(state,payload){
            state.cinemaType = payload.type;
            state.cinemaList = payload.list;
            state.isinit = true;
        },
        getMore(state,payload){
            state.cinemaList += payload;
        },
        toggleMore(state){
            state.isLoadMore = !state.isLoadMore;
        },
        resetCinema(state,payload){
            state.cinemaList = payload;
        }
    },
    actions: {
        async getInit(store){
            var { data } = await Http.get(GETCINEMA_TYPE,{ ci: store.getters.cityId });
            // var { data } = await axios.get('/ajax/filterCinemas');


            var date = new Date();
            var y = date.getFullYear();
            var m = date.getMonth()+1;
            var d = date.getDate();
            if( m < 10 ){
                m = '0' + m;
            }
            if( d < 10 ){
                d = '0' + d;
            }
            var datestr = y + '-' + m + '-' + d;
            var data2 = await Http.get(GETCINEMA_API, { 
                cityId: store.getters.cityId ,
                day: datestr
            });

            var str1 = data2.data;
            var str2 = str1.replace(/<a href="\/shows\/\d+">/g, (str)=>{
                var reg = /(\d+)/;
                reg.test(str);
                return '<div  class="cinema-list-item" cnid="' + RegExp.$1 + '">';
            } );
            var str3 = str2.replace(/<\/a>/g, '</div>');
            store.commit('initCinema',{
                type: data,
                list: str3
            })
        },
        async getMore(store,payload){
            store.commit('toggleMore');
            var date = new Date();
            var y = date.getFullYear();
            var m = date.getMonth()+1;
            var d = date.getDate();
            if( m < 10 ){
                m = '0' + m;
            }
            if( d < 10 ){
                d = '0' + d;
            }
            var datestr = y + '-' + m + '-' + d;
            var {data} = await Http.get(GETCINEMA_API, { 
                cityId: store.getters.cityId ,
                day: datestr,
                ...payload
            });
            var str1 = data.replace(/<a href="\/shows\/\d+">/g, (str)=>{
                var reg = /(\d+)/;
                reg.test(str);
                return '<div  class="cinema-list-item" cnid="' + RegExp.$1 + '">';
            } );
            var str2 = str1.replace(/<\/a>/g, '</div>');
            store.commit('getMore',str2);
            store.commit('toggleMore');
        },
        async chooseCinema( store, payload ){
            var date = new Date();
            var y = date.getFullYear();
            var m = date.getMonth()+1;
            var d = date.getDate();
            if( m < 10 ){
                m = '0' + m;
            }
            if( d < 10 ){
                d = '0' + d;
            }
            var datestr = y + '-' + m + '-' + d;
            var {data} = await Http.get(GETCINEMA_API, { 
                cityId: store.getters.cityId ,
                day: datestr,
                ...payload
            });
            var str1 = data.replace(/<a href="\/shows\/\d+">/g, (str)=>{
                var reg = /(\d+)/;
                reg.test(str);
                return '<div  class="cinema-list-item" cnid="' + RegExp.$1 + '">';
            } );
            var str2 = str1.replace(/<\/a>/g, '</div>');
            store.commit('resetCinema',str2);
        }
    }
}