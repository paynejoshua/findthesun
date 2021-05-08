import axios from "axios";

const BASEURL = "https://community-open-weather-map.p.rapidapi.com/weather";

export default {
    getLocation: function(){
        return axios.get(BASEURL)
    }
} 