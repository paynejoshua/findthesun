import React, {useState, useEffect} from "react";
import axios from "axios";


function WeatherSearch(){
    // const[results, setResults] = useState()
    const[webApiKey, setWebApiKey] = useState("a4a8fbe7c144be93020e3a7f15b622db")
    const[lat, setLat] = useState()
    const[lon, setLon] = useState()


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
 


    return(
        <>
            {/* <input placeholder="City:" onChange={((e) => setCity(e.target.value))}></input>
            <input placeholder="State:" onChange={((e) => setState(e.target.value))}></input>
            <button onClick={(() => switchSearch())}>Search</button> */}

            <br />
            <button onClick={(() => getWeather())}>Find that Sun</button>
            
        </>
    )
}

export default WeatherSearch
