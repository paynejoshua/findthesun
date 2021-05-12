import React, {useState} from "react";
import axios from "axios";

function CountryLookUp(props){
    const[country, setCountry] = useState()

    const options = {
        method: 'GET',
        url: 'https://geocodeapi.p.rapidapi.com/GetTimezone',
        params: {latitude: props.lat, longitude: props.lon},
        headers: {
          'x-rapidapi-key': '21acf3ee9cmsh43ea2bb31469b34p1aac81jsn732637b64531',
          'x-rapidapi-host': 'geocodeapi.p.rapidapi.com'
        }
      };
      
      axios.request(options).then(function (response) {
          console.log(response.data);
      }).catch(function (error) {
          console.error(error);
      });
    return(
        <>
            
        </>
    )
}

export default CountryLookUp