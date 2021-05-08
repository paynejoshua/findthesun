import React, {useState, useEffect} from "react";
import axios from "axios";


function WeatherSearch(){
    // const[results, setResults] = useState()
    const[city, setCity] = useState("")
    const[state, setState] = useState("")
    const[search, setSearch] = useState(false)
    const[rapidApiKey, setRapidApiKey] = useState("21acf3ee9cmsh43ea2bb31469b34p1aac81jsn732637b64531")
    const[webApiKey, setWebApiKey] = useState("a4a8fbe7c144be93020e3a7f15b622db")
    const[searchLat, setSearchLat] = useState()
    const[searchLong, setSearchLong] = useState()
    const[lat, setLat] = useState()
    const[lon, setLon] = useState()

    // useEffect(() =>{
    //     const options = {
    //         method: 'GET',
    //         url: 'https://community-open-weather-map.p.rapidapi.com/weather',
    //         params: {
    //           q: `${city},${state},us`,
    //           lat: '0',
    //           lon: '0',
    //           id: '2172797',
    //           lang: 'null',
    //           units: '"metric" or "imperial"',
    //           mode: 'xml, html'
    //         },
    //         headers: {
    //           'x-rapidapi-key': rapidApiKey,
    //           'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com'
    //         }
    //       };
          
    //       axios.request(options).then(function (response) {
    //         setResults(response.data.weather[0].icon);

    //         if(results !== "01d"){
    //             console.log("It's Cloudy")
    //             setSearchLat(response.data.coord.lat)
    //             setSearchLong(response.data.coord.long)
    //             citySearch()
                
    //         }

    //         console.log("It's currently sunny here", response.data)  


    //       }).catch(function (error) {
    //           console.error(error);
    //       });

    // }, [search])

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function(position){
            setLat(position.coords.latitude)
            setLon(position.coords.longitude)
        })

        console.log(lat, lon)
        
    })

    function getWeather(){
        axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${webApiKey}&units=imperial`)
        .then(function(res){
            console.log(res)
            
            if(res.data.weather[0].icon !== "01d"){
                console.log("It's not sunny")
            } else {
                
                console.log("It's sunny")
            }
            
        }).catch(function (error) {
            console.log(error)
        })
    }
    
    function citySearch(){
        console.log( "Well hello there")
    }

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

            <br />
            <button onClick={(() => getWeather())}>Find that Sun</button>
            
        </>
    )
}

export default WeatherSearch
