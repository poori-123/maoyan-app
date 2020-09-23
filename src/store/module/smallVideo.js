import Http from '../../api/http';
import {GETSMALLVIDEO_API} from '../../api/url';
export default {
    namespaced: true,
    state: {
        videoList: ''
    },
    mutations: {
        setInit(state,payload){
            state.videoList = payload;
        }
    },
    actions: {
        async getInit(store){
            var d = Date.now();
            var { data: {data: {feeds} } } = await Http.get(GETSMALLVIDEO_API,{offset:0,timestamp:d});
            var list = feeds.map( item => ({
                id: item.id,
                images: item.images,
                title: item.title,
                upCount: item.upCount,
                user: item.user,
                video: item.video
            }) );
            console.log(list)
            store.commit('setInit',list);
        }
    }
}