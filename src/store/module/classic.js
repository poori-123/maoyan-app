import Http from '../../api/http';
import axios from 'axios';
import {GETCLASSICMOVIE_API} from '../../api/url';

export default {
    namespaced: true,
    state: {
        classicMovieList: '',
        isLoadMore: false,  //是否在进行加载  用于加载更多判断
        isFirstLoad: false, //是否完成第一次加载 页面加载loading
        isMax: false //是否达到最大数据
    },
    mutations: {
        setClassocMovie(state,payload){
            state.classicMovieList += payload ;
            if(!state.isFirstLoad){
                state.isFirstLoad = true;
            }
        },
        togIsLoadMore(state){
            state.isLoadMore = !state.isLoadMore;
        }
    },
    actions: {
        async getClassicMovie(store,payload){
            store.commit('togIsLoadMore');
            var {data} = await Http.get(GETCLASSICMOVIE_API,payload);

            /* -------------------------- mock --------------------------------- */
            // var dd = await axios.get('/ajax/classicList');
            // var data = dd.data.default;
            /* -------------------------- mock --------------------------------- */
            
            var str1 = data.replace(/<a href="\/movie\/\d+">/g, (str)=>{
                var reg = /(\d+)/;
                reg.test(str);
                return '<div  class="movie-list-item" mvid="' + RegExp.$1 + '">';
            } );
            var str2 = str1.replace(/<\/a>/g, '</div>');
            store.commit('setClassocMovie',str2);
            store.commit('togIsLoadMore');
        }
    }
}