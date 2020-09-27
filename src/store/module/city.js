import Http from '../../api/http';
import axios from 'axios';
import {GETCITIES_API} from '../../api/url';

export default {
    namespaced: true,
    state: {    
        cities: '',
        nearCities:[
            {
                id: 30,
                nm: "深圳",
                py: "shenzhen"
            }
        ] 
    },
    mutations: {
        setCities( state, payload ){
            state.cities = payload;
        },
        setChoose( state, payload ){
            var flag = false;
            state.nearCities.forEach( item =>{
                if(item.id == payload.id){
                    flag = true;
                }
            } )
            if(!flag){
                state.nearCities.push(payload);
            }
            if(state.nearCities.length > 3){
                state.nearCities.splice(0,1);
            }
        }
    },
    actions: {
        async getCities(store){
            // var { data: {cts} } = await Http.get(GETCITIES_API);

            /* -------------------------- mock --------------------------------- */
            var { data: {cts} } = await axios.get('/ajax/cities');
            /* -------------------------- mock --------------------------------- */
            
            var data = {};

            cts.forEach( item => {
                var str = item.py[0];
                if(!data[str]){
                    data[str] = [item];
                }else{
                    data[str] = [...data[str], item];
                }
                
            } );
            store.commit('setCities',data)
        }
    }
}