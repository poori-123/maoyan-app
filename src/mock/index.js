import {mock} from 'mockjs'

mock('/ajax/movieOnInfoList', ()=>{
    return require('./hotRated.json');
})