import React, {useState, useEffect} from "react";
import axios from "axios";


function WeatherSearch(){
    const[webApiKey] = useState("a4a8fbe7c144be93020e3a7f15b622db")
    const[lat, setLat] = useState()
    const[lon, setLon] = useState()
    const[sunny, setSunny] = useState()
    const[places, setPlaces] = useState([])
    const[icon, setIcon] = useState()
    const[loading, setLoading] = useState(false)

    useEffect(() => {

        navigator.geolocation.getCurrentPosition(function(position){
            setLat(position.coords.latitude)
            setLon(position.coords.longitude)
        })

        getCurrentWeather()        
    }, [lat, lon])

    function getCurrentWeather(){
        axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${webApiKey}&units=imperial`)
        .then(function(res){
            setIcon(res.data.weather[0].icon)
            
            if(res.data.weather[0].icon === "01d" || res.data.weather[0].icon === "01n"){
                setSunny(true)
                
            } else {
                setSunny(false)
            }
            
        }).catch(function (error) {
            console.log(error)
        })

        setLoading(true)

    }

    function searchWeather(){
        let lonLeft = Math.trunc(lon)
        let latBottom = Math.trunc(lat)
        let lonRight = lonLeft + 5
        let latTop = latBottom + 5
        axios.get(`http://api.openweathermap.org/data/2.5/box/city?bbox=${lonLeft},${latBottom},${lonRight},${latTop},10&appid=${webApiKey}&units=imperial`)
        .then(function(res){

            
            let boxRes = res.data.list
            let sunnyPlaces = []
            
            for(let i=0;i<boxRes.length;i++){
                if(boxRes[i].weather[0].icon === "01d" || boxRes[i].weather[0].icon === "01n"){
                    sunnyPlaces.push(boxRes[i].name)
                    setPlaces(sunnyPlaces)
                } 
            }
            setLoading(false)
        })
        .catch(function(error){
            console.log(error)
        })
    }

    return(
        <>
            {/* <input placeholder="City:" onChange={((e) => setCity(e.target.value))}></input>
            <input placeholder="State:" onChange={((e) => setState(e.target.value))}></input>
            <button onClick={(() => switchSearch())}>Search</button> */}

        
            
            <img src={`http://openweathermap.org/img/w/${icon}.png`} style={{width: "5rem"}}/>
            <br />
            <button onClick={(() => searchWeather())}>{sunny ? "Where else is it sunny?" : "Find that sun!"}</button>
            
            
            {
                loading
                ? <p>Just waiting on you to click on that button</p>
                : <p>It is currently sunny at the following locations:</p>
                }
            <ul style={{ listStyleType: "none"}}>
                
                {places.map(item => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
            
            
         
        
            
            
            
        </>
    )
}

export default WeatherSearch
