import axios from 'axios'
import {BASE} from './url'

class HTTP{
    constructor(base_url){
        this.base_url = base_url
    };
    request(url, method = 'GET', data = {}){
        var options ={
            url,
            method,
            baseURL: this.base_url
        };
        if(method === 'GET'){
            options = {
                ...options,
                params: data
            };
        }else if(method === 'POST'){
            options = {
                ...options,
                data 
            }
        };
        var instance = axios.create();
        return instance.request(options);
    };
    get(url, data = {}){
        return this.request(url, 'GET', data);
    };
    post(url, data = {}){
        return this.request(url, 'POST', data);
    }
}

export default new HTTP(BASE);