const yargs = require('yargs');
const axios = require('axios');

var argv = yargs
    .options({
        a: {
            alias: 'address',
            descibe: 'Address to fetch weather far',
            string: true
        },
        h:{
            alias: 'help',
            describe: 'Help option'
        }
    })
    .argv;

var encodedAddress = encodeURIComponent(argv.a);
var geocodeUrl = 'http://maps.google.com/maps/api/geocode/json?address=${encodedAddress}';

axios.get(geocodeUrl).then((response)=>{
    console.log(JSON.stringify(response.data.results[0].geometry.location.lng));
    var lat=response.data.results[0].geometry.location.lat;
    var lng=response.data.results[0].geometry.location.lng;
    console.log(lng);
    var weatherURL=`https://api.darksky.net/forecast/b613784da2b3bedf9407daf7b1193f06/${lat},${lng}`;
    return axios.get(weatherURL);
}).then((response)=>{
    console.log(response.data.currently.temperature);
}).catch((e)=>{
    console.log(e.message);
});
