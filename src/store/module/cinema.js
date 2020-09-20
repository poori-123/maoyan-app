import Http from '../../api/http';
import { GETCINEMA_API,GETCINEMA_TYPE } from '../../api/url';
export default {
    namespaced: true,
    state: {
        cinemaType: {},
        cinemaList: '',
    },
    mutations: {
        initCinema(state,payload){
            state.cinemaType = payload.type;
            state.cinemaList = payload.list;
        }
    },
    actions: {
        async getInit(store){
            var { data } = await Http.get(GETCINEMA_TYPE);
            var data2 = await Http.get(GETCINEMA_API);
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
        }
    }
}