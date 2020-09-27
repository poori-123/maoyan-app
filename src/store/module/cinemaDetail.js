import Http from '../../api/http';
import {GETCINEMADETAIL_API} from '../../api/url';
import axios from 'axios';

export default {
    namespaced: true,
    state: {
        cinemaData: '',
        moviesList: '',
        isload: false
    },
    mutations: {
        setDetail(state,payload){
            state.cinemaData = payload.cinemaData;
            state.moviesList = payload.movies;
            state.isload = true;
        }
    },
    actions: {
        async initDetail(store,payload){
            var { data: { cinemaData, showData } } = await Http.get(GETCINEMADETAIL_API,{
                cinemaId: payload
            });

            /* -------------------------- mock --------------------------------- */
            // var { data: { cinemaData, showData } } = await axios.get('/ajax/cinemaDetail');
            /* -------------------------- mock --------------------------------- */
            
            var movies = showData.movies;
            movies = movies.map( item => ({
                ...item,
                img: item.img.replace('/w.h','/148.208'),
                shows: item.shows.map( item => ({
                    dateShow: item.dateShow,
                    hasShow: item.hasShow,
                    showDate: item.showDate,
                    plist: item.plist.map( pl => ({
                        dt: pl.dt,
                        lang: pl.lang,
                        seqNo: pl.seqNo,
                        th: pl.th,
                        tm: pl.tm,
                        tp: pl.tp,
                        vipPrice: pl.vipPrice,
                        pr: (pl.vipPrice ? Number(pl.vipPrice)+5 : 40),
                        vipPriceName: pl.vipPriceName
                    }) )
                }) )
            }) );

            store.commit('setDetail',{
                cinemaData,
                movies
            })
        }
    }
}