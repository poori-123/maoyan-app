import Http from '../../api/http';
import axios from 'axios';
import { GETMOVIEDETAIL_API, GETMOVIECINEMA_API, GETFILTER_API } from '../../api/url';
export default {
    namespaced: true,
    state: {
        movieDetail: {},
        filter: {},
        cinemaList: [],
        dates:[]
    },
    getters: {
        cityId(s1,g1,s2,g2){
            return s2.chooseCity.id;
        }
    },
    mutations: {
        setMovie(state,payload){
            state.movieDetail = payload;
        },
        setCinema(state,payload){
            state.filter = payload.filter;
            state.cinemaList = payload.cinemaList;
            state.dates = payload.dates;
        },
        resetCinema(state,payload){
            state.cinemaList = payload;
        }
    },
    actions: {
        async initMovie(store,payload){
            // var { data:{ detailMovie } } = await Http.get( GETMOVIEDETAIL_API, { movieId: payload } );

            /* -------------------------- mock --------------------------------- */
            var { data: {detailMovie} } = await axios.get('/ajax/moviedetail');
            /* -------------------------- mock --------------------------------- */

            var data = {
                backgroundColor: detailMovie.backgroundColor,
                cat: detailMovie.cat,
                dur: detailMovie.dur,
                enm: detailMovie.enm,
                id: detailMovie.id,
                img: detailMovie.img.replace('/w.h','/148.208'),
                bgimg: detailMovie.img.replace('/w.h','/70.100'),
                nm: detailMovie.nm,
                pubDesc: detailMovie.pubDesc,
                sc: detailMovie.sc,
                snum: detailMovie.snum,
                version: detailMovie.version,
                src: detailMovie.src,
                globalReleased: detailMovie.globalReleased,
                wish: detailMovie.wish,
                rt: detailMovie.rt,
            };
            store.commit('setMovie',data);
        },
        async initCinema(store,payload){
            // var {data} = await Http.get(GETFILTER_API,{
            //     movieId: payload.id,
            //     day: payload.date
            // });

            /* -------------------------- mock --------------------------------- */
            var {data} = await axios.get('/ajax/myFilter');
            /* -------------------------- mock --------------------------------- */

            // var {data: { cinemas, showDays: {dates} }} = await Http.post(GETMOVIECINEMA_API,{
            //     ...payload.query,
            //     movieId: payload.id,
            //     day: payload.date,
            //     offset: 0,
            //     limit: 20,
            //     updateShowDay: true,
            //     reqId: 1600770457343,
            //     cityId: store.getters.cityId,
            //     optimus_uuid: 'CCC26410FBDC11EA9A7CE3A05A716C497D2DBA55BF63435AB9FB2BE848032E9C',
            //     optimus_risk_level: 71,
            //     optimus_code: 10
            // });

            /* -------------------------- mock --------------------------------- */
            var {data: { cinemas, showDays: {dates} }} = await axios.get('/ajax/mvCinema');
            /* -------------------------- mock --------------------------------- */

            store.commit('setCinema',{
                filter: data,
                cinemaList: cinemas,
                dates: dates
            })
        },
        async chooseCinema(store,payload){
            // var {data: { cinemas }} = await Http.post(GETMOVIECINEMA_API,{
            //     ...payload.query,
            //     movieId: payload.id,
            //     day: payload.date,
            //     offset: 0,
            //     limit: 20,
            //     updateShowDay: true,
            //     reqId: 1600770457343,
            //     cityId: store.getters.cityId,
            //     optimus_uuid: 'CCC26410FBDC11EA9A7CE3A05A716C497D2DBA55BF63435AB9FB2BE848032E9C',
            //     optimus_risk_level: 71,
            //     optimus_code: 10
            // });

            /* -------------------------- mock --------------------------------- */
            var {data: { cinemas }} = await axios.get('/ajax/mvCinema');
            /* -------------------------- mock --------------------------------- */

            store.commit('resetCinema',cinemas);
        }
    }
}