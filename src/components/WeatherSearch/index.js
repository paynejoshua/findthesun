import React, {useState, useEffect} from "react";
import axios from "axios";


function WeatherSearch(){
    const[results, setResults] = useState()
    const[city, setCity] = useState("")
    const[state, setState] = useState("")
    const[search, setSearch] = useState(false)

    useEffect(() =>{
        const options = {
            method: 'GET',
            url: 'https://community-open-weather-map.p.rapidapi.com/weather',
            params: {
              q: `${city},${state},us`,
              lat: '0',
              lon: '0',
              callback: 'test',
              id: '2172797',
              lang: 'null',
              units: '"metric" or "imperial"',
              mode: 'xml, html'
            },
            headers: {
              'x-rapidapi-key': '21acf3ee9cmsh43ea2bb31469b34p1aac81jsn732637b64531',
              'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com'
            }
          };
          
          axios.request(options).then(function (response) {
            console.log(response.data)  
            setResults(response.data);
          }).catch(function (error) {
              console.error(error);
          });

    }, [search])

    function switchSearch(){
        if(search == false){
            setSearch(true)
        } else{
            setSearch(false)
        }
    }

    console.log(search)

    return(
        <>
            <input placeholder="City:" onChange={((e) => setCity(e.target.value))}></input>
            <input placeholder="State:" onChange={((e) => setState(e.target.value))}></input>
            <button onClick={(() => switchSearch())}>Search</button>
            <p>{results}</p>
        </>
    )
}

export default WeatherSearch
