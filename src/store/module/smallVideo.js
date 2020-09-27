import Http from '../../api/http';
import {GETSMALLVIDEO_API, GETMORECOMINE_API} from '../../api/url';
export default {
    namespaced: true,
    state: {
        videoList: '',
        loading: false,
        isLoadMore: false,
        isMax: false
    },
    mutations: {
        setInit(state,payload){
            state.videoList = payload;
            state.loading = true;
        },
        setMore(state,payload){
            state.videoList.push(...payload);
        },
        togLoad(state){
            state.isLoadMore = !state.isLoadMore;
        },
        getMax(state){
            state.isMax = true;
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
            store.commit('setInit',list);
        },
        async getMore(store,payload){
            store.commit('togLoad');
            var d = Date.now();
            var { data: {data: {feeds,paging} } } = await Http.get(GETSMALLVIDEO_API,{offset:payload,timestamp:d});
            var list = feeds.map( item => ({
                id: item.id,
                images: item.images,
                title: item.title,
                upCount: item.upCount,
                user: item.user,
                video: item.video
            }) );
            store.commit('setMore',list);
            store.commit('togLoad');
            if(!paging.hasMore){
                store.commit('getMax');
            }
        }
    }
}