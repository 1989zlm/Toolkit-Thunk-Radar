export const options = {
    method: 'GET',
    url: 'https://flight-radar1.p.rapidapi.com/flights/list-in-boundary',
    params: {
        bl_lat: '34.48065',
        bl_lng: '25.73472',
        tr_lat: '42.527912',
        tr_lng: '44.865926',
        limit: '300'
    },
    headers: {
        'X-RapidAPI-Key': '6a6d16ebdcmsh2bf92f946ce6374p150410jsnbc1064200a56',
        'X-RapidAPI-Host': 'flight-radar1.p.rapidapi.com'
    }
};
export const headerOpt = {
    headers: {
        'X-RapidAPI-Key': '6a6d16ebdcmsh2bf92f946ce6374p150410jsnbc1064200a56',
        'X-RapidAPI-Host': 'flight-radar1.p.rapidapi.com'
    }
};





//!eski api
// const options = {
//     method: 'GET',
//     url: 'https://flight-radar1.p.rapidapi.com/flights/list-in-boundary',
//     params: {
//         bl_lat: '34.480658',
//         bl_lng: '25.73472',
//         tr_lat: '42.527912',
//         tr_lng: '44.865926',
//         limit: '300'
//     },
//     headers: {
//         'X-RapidAPI-Key': 'ef5dea0fdcmshad8336cc79568ffp1f078ajsn12be6bd18e63',
//         'X-RapidAPI-Host': 'flight-radar1.p.rapidapi.com'
//     }
// };

// const headerOpt = {
//     headers: {
//         "X-RapidAPI-Key": "ef5dea0fdcmshad8336cc79568ffp1f078ajsn12be6bd18e63",
//         "X-RapidAPI-Host": "flight-radar1.p.rapidapi.com",
//     },
