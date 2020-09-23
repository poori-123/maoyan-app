import {mock} from 'mockjs'

mock('/ajax/movieOnInfoList', ()=>{
    return require('./hotRated.json');
});


mock('/ajax/filterCinemas', ()=>{
    return require('./filter.json');
});

mock('/ajax/moviedetail', ()=>{
    return require('./movieDetail2.json');
});