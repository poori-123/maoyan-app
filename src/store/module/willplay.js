import Http from '../../api/http';
import axios from 'axios';
import { GETEXPECTEDMOVIE_API, GETCOMINEMOVIE_API, GETMORECOMINE_API} from '../../api/url';
export default {
    namespaced: true,
    state: {
        mostExpectedList: [],
        isExpectedMax: false,
        comingMovieList: [],
        movieIDs:[],
        isLoadMore: false,
        isComingMax: false,
        isInitE: false,
        isInitC: false
    },
    getters: {
        isInit(state){
            if( state.isInitE && state.isInitC){
                return true;
            }else{ 
                return false
            }
        },
        cityId(s1,g1,s2,g2){
            return s2.chooseCity.id;
        }
    },
    mutations: {
        initMostExpectedList(state,payload){
            state.mostExpectedList = payload;
            state.isInitE = true;
        },
        setMostExpectedList(state,payload){
            state.mostExpectedList.push(...payload);
        },
        setIsExpectedMax(state){
            state.isExpectedMax = true;
        },
        initComingMovieList(state,payload){
            state.comingMovieList = payload.list2;
            state.movieIDs = payload.movieIds;
            state.isInitC = true;
        },
        setMoreMovie(state,payload){
            state.comingMovieList = payload;
        },
        togIsLoadMore(state){
            state.isLoadMore = !state.isLoadMore;
        },
        getMost(state){
            state.isComingMax = true;
        }
    },
    actions: {
        async getMostExpectedList(store,payload){
            var { data:{ coming, paging } } = await Http.get(GETEXPECTEDMOVIE_API,{ ...payload, ci: store.getters.cityId });

            /* -------------------------- mock --------------------------------- */
            // var { data:{ coming, paging } } = await axios.get('/ajax/mostExpected');
            /* -------------------------- mock --------------------------------- */

            var datalist = coming.map( item => ({
                ...item,
                img: item.img.replace('/w.h','') + '@1l_1e_1c_170w_230h'
            }) )
            var hasMore = paging.hasMore;
            if(!payload){
                store.commit('initMostExpectedList',datalist);
            }else{
                store.commit('setMostExpectedList',datalist);
            }
            if(!hasMore){
                store.commit('setIsExpectedMax');
            }
        },
        async getComingMovieList(store){
            var { data: {coming,movieIds}  } = await Http.get(GETCOMINEMOVIE_API, { ci: store.getters.cityId });

            /* -------------------------- mock --------------------------------- */
            // var { data: {coming,movieIds}  } = await axios.get('/ajax/comingList');
            /* -------------------------- mock --------------------------------- */

            var list = coming.map( item => ({
                ...item,
                img: item.img.replace('/w.h','') + '@1l_1e_1c_170w_230h'
            }) );
            var length = list.length;
            movieIds.splice(0,length);
            var list2 = [];
            list.forEach( item => {
                if(list2.length == 0){
                    list2.push( { date: item.comingTitle , list: [item] } );
                }else if( list2[list2.length - 1].date == item.comingTitle ) {
                    list2[list2.length - 1].list.push(item);
                }else if( list2[list2.length - 1].date != item.comingTitle  ){
                    list2.push( { date: item.comingTitle , list: [item] } );
                }
            } );
            store.commit('initComingMovieList',{
                list2,
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
            var { data: {coming} } = await Http.get(GETMORECOMINE_API,{ movieIds: str, ci: store.getters.cityId  });

            /* -------------------------- mock --------------------------------- */
            // var { data: {coming}  } = await axios.get('/ajax/comingList');
            /* -------------------------- mock --------------------------------- */

            var list = coming.map( item => ({
                ...item,
                img: item.img.replace('/w.h','') + '@1l_1e_1c_170w_230h'
            }) );
            var list2 = JSON.parse(JSON.stringify(store.state.comingMovieList));
            list.forEach( item => {
                if( list2[list2.length - 1].date == item.comingTitle ) {
                    list2[list2.length - 1].list.push(item);
                }else if( list2[list2.length - 1].date != item.comingTitle  ){
                    list2.push( { date: item.comingTitle , list: [item] } );
                }
            } );
            store.commit('setMoreMovie', list2);
            store.commit('togIsLoadMore');
        }
    }
}