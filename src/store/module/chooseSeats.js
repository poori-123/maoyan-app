import Http from '../../api/http';
import {GETSEATS_API} from '../../api/url';
import axios from 'axios';
export default {
    namespaced: true,
    state: {
        baseInfo: '',
        seatImg: '',
        seatArr: '',
        loading: false
    },
    getters: {
        cityId(s1,g1,s2,g2){
            return s2.chooseCity.id;
        }
    },
    mutations: {
        setSeats(state,payload){
            state.baseInfo = payload.data,
            state.seatImg = payload.seatImage,
            state.seatArr = payload.seatArr,
            state.loading = true
        }
    },
    actions: {
        async getSeats(store,payload){
            var data = await Http.post(GETSEATS_API,{
                timestamp: Date.now(),
                cityId: store.getters.cityId,
                ci: store.getters.cityId,
                seqNo: payload,
                optimus_uuid: 'CCC26410FBDC11EA9A7CE3A05A716C497D2DBA55BF63435AB9FB2BE848032E9C',
                optimus_risk_level: 71,
                optimus_code: 10
            });

            /* -------------------------- mock --------------------------------- */
            // var {data:{seatData} } = await axios.get('/ajax/chooseSeats');
            /* -------------------------- mock --------------------------------- */
            
            var data = {
                cinema: seatData.cinema,
                hall: seatData.hall,
                movie: seatData.movie,
                price: seatData.price['1'].seatsPrice['1'].totalPrice,
                notice: seatData.reminder.notice,
                show: seatData.show
            };
            var seatImage = {
                seatLegends: seatData.seat.image.seatLegends,
                selectedImages: seatData.seat.image.selectedImages
            };
            var seatArr = seatData.seat.regions[0];
            store.commit('setSeats',{
                data,
                seatImage,
                seatArr
            });
        }
    }
}