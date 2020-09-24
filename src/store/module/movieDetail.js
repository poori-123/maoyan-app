import Http from '../../api/http';
import {GETMOVIEDETAIL_API} from '../../api/url';
import axios from 'axios';
export default {
    namespaced: true,
    state(){
        return {
            movieDetail: ''
        }
    },
    mutations: {
        setMovieDetail(state,payload){
            state.movieDetail = payload;
        }
    },
    actions: {
        async getMovieDetail(store,payload){
            // var { data: {detailMovie} } = await Http.get(GETMOVIEDETAIL_API,{movieId:payload});

            /* -------------------------- mock --------------------------------- */
            var { data: {detailMovie} } = await axios.get('/ajax/moviedetail');
            /* -------------------------- mock --------------------------------- */

            var detail = {
                backgroundColor: detailMovie.backgroundColor,
                cat: detailMovie.cat,
                dir: detailMovie.dir,
                distributions: detailMovie.distributions,
                dra: detailMovie.dra,
                dur: detailMovie.dur,
                enm: detailMovie.enm,
                globalReleased: detailMovie.globalReleased,
                id: detailMovie.id,
                img: detailMovie.img.replace('/w.h','') + '@300w_414h',
                nm: detailMovie.nm,
                photos: detailMovie.photos.map( item => {
                    var x = item.replace('/w.h', '');
                    var y = x.replace('@2500w_2500h_1l_0e', '');
                    y = y + '@420w_279h_1e_1c';
                    return y;
                } ),
                pubDesc: detailMovie.pubDesc,
                sc: detailMovie.sc,
                snum: detailMovie.snum,
                star: detailMovie.star,
                vd: detailMovie.vd,
                version: detailMovie.version,
                ver: detailMovie.ver,
                videoImg: detailMovie.videoImg,
                videoName: detailMovie.videoName,
                vnum: detailMovie.vnum,
                watched: detailMovie.watched,
                wish: detailMovie.wish
            };
            console.log(detail)   
            store.commit('setMovieDetail',detail);
        }
    }
}