import Http from '../../api/http';
import axios from 'axios';
import { GOODREPUTATION_API, TOPRATED_API, GETMORE_API } from '../../api/url';
export default {
    namespaced: true,
    state:{
        hotReputation: '',
        hotMovieList: [],
        movieIDs:[],
        isGetTop: true, //数据获取不到临时
        isLoadMore: false,
        isMore: true 
    },
    mutations: {
        setGoodReputation(state,payload){
            state.hotReputation = payload;
        },
        initHotMovieList(state,payload){
            state.hotMovieList = payload.list;
            state.movieIDs = payload.movieIds;
            state.isGetTop = true;
        },
        setMoreMovie(state,payload){
            state.hotMovieList.push(...payload);
        },
        togIsLoadMore(state){
            state.isLoadMore = !state.isLoadMore;
        },
        getMost(state){
            state.isMore = false;
        }
    },
    actions: {
        async getGoodReputation(store){
            var {data} = await Http.get(GOODREPUTATION_API);

            /* -------------------------- mock --------------------------------- */
            // var res = await axios.get('/ajax/toprated');
            // var data = res.data.default;
            /* -------------------------- mock --------------------------------- */

            // var reg = /data-id=(\d+)/g;
            // var newDate = data.replace( reg , (str)=>{
            //     var reg2 = /(\d+)/g;
            //     reg2.exec(str);
            //     var id = RegExp.$1;
            //     return `@click="movieDetail(${id})"`;
            // } );
            store.commit('setGoodReputation',data);
        },
        async getHotMovieList(store){
            var { data : { movieIds , movieList } } = await Http.get(TOPRATED_API);

            /* -------------------------- mock --------------------------------- */
            // var { data : { movieIds , movieList } } = await axios.get('/ajax/movieOnInfoList');
            /* ----------------------------------------------------------------- */

            var list = movieList.map( item => ({
                ...item,
                img: item.img.replace('/w.h','/120.180')
            }) );
            var length = list.length;
            movieIds.splice(0,length);
            store.commit('initHotMovieList',{
                list,
                movieIds
            });
        },
        async getMoreMovie(store){
            if(store.state.movieIDs.length == 0){
                store.commit('getMost');
                return;
            }
            store.commit('togIsLoadMore');
            var arr = store.state.movieIDs.splice(0,10);
            var str = arr.join(',');
            var { data: {coming} } = await Http.get(GETMORE_API,{ movieIds: str });

            /* -------------------------- mock --------------------------------- */
            // var { data : { movieList } } = await axios.get('/ajax/movieOnInfoList');
            // var coming = movieList;
            /* ----------------------------------------------------------------- */

            var list = coming.map( item => ({
                ...item,
                img: item.img.replace('/w.h','/120.180')
            }) );
            store.commit('setMoreMovie', list);
            store.commit('togIsLoadMore');
        }
    }
}