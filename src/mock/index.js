import {mock} from 'mockjs'

mock('/ajax/movieOnInfoList', ()=>{
    return require('./hotRated.json');
});


mock('/ajax/filterCinemas', ()=>{
    return require('./filter.json');
})