import Http from '../../api/http';
import {GETVIDEO_API} from '../../api/url';
export default {
    namespaced: true,
    state: {
        videoList: [],
        isload: false,
        isloadMore: false,
        isMax : false
    },
    mutations: {
        setVideo(state,payload){
            state.videoList = payload;
            state.isload = true;
        },
        moreVideo(state,payload){
            state.videoList.push(...payload)
        },
        togMore(state){
            state.isloadMore = !state.isloadMore;
        },
        maxNum(state,payload){
            state.isMax = payload;
        }
    },
    actions:{
        async getVideo(store,payload){
            var {data: {data: {feeds,paging}}} = await Http.get(GETVIDEO_API,{
                feedChannelId: payload,
                offset: 0
            });
            var videoList = feeds.map( item => {
                return {
                    id: item.id,
                    images: item.images,
                    shareCount: item.shareCount,
                    title: item.title,
                    upCount: item.upCount,
                    commentCount: item.commentCount,
                    video: item.video,
                    user: item.user
                }
            } );
            store.commit('setVideo',videoList);
            var hasMore = paging.hasMore;
            if(!hasMore){
                store.commit('maxNum',true);
            }else{
                store.commit('maxNum',false);
            }
        },
        async loadMore(store,payload){
            store.commit('togMore');
            var {data: {data: {feeds,paging}}} = await Http.get(GETVIDEO_API,payload);
            var videoList = feeds.map( item => {
                return {
                    id: item.id,
                    images: item.images,
                    shareCount: item.shareCount,
                    title: item.title,
                    upCount: item.upCount,
                    commentCount: item.commentCount,
                    video: item.video,
                    user: item.user
                }
            } );
            var hasMore = paging.hasMore;
            store.commit('moreVideo',videoList);
            store.commit('togMore');
            if(!hasMore){
                store.commit('maxNum',true);
            }else{
                store.commit('maxNum',false);
            }
        }
    }
}