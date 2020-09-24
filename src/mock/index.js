import {mock} from 'mockjs'

mock('/ajax/movieOnInfoList', ()=>{
    return require('./hotRated.json');
});
mock('/ajax/toprated', ()=>{
    return require('./topratedlist.js');
});


mock('/ajax/filterCinemas', ()=>{
    return require('./filter.json');
});
mock('/ajax/cinemas', ()=>{
    return require('./cinemas');
});

mock('/ajax/moviedetail', ()=>{
    return require('./movieDetail2.json');
});

mock('/ajax/myFilter', ()=>{
    return require('./mv-filter.json');
});
mock('/ajax/mvCinema', ()=>{
    return require('./mv-cinema.json');
});

mock('/ajax/mostExpected', ()=>{
    return require('./mostExpected.json');
});
mock('/ajax/comingList', ()=>{
    return require('./comineList.json');
});

mock('/ajax/classicList', ()=>{
    return require('./classicList');
});

mock('/ajax/cities', ()=>{
    return require('./cities.json');
});

mock('/ajax/cinemaDetail', ()=>{
    return require('./cinemaDetail.json');
});