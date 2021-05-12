import React, {useState, useEffect} from "react";
import axios from "axios";
import Jumbotron from "react-bootstrap/Jumbotron";
import {Moon} from "react-feather";
import {Sun} from "react-feather";
import {Cloud} from "react-feather";
import {Aperture} from "react-feather";
import LoadScreen from "../LoadScreen";
import CountryLookUp from "../CountryLookUp"


function WeatherSearch(props){
    const[webApiKey] = useState("a4a8fbe7c144be93020e3a7f15b622db")
    const[lat, setLat] = useState()
    const[lon, setLon] = useState()
    const[sunny, setSunny] = useState()
    const[night, setNight] = useState()
    const[cloudy, setCloudy] = useState()
    const[places, setPlaces] = useState([])
    const[icon, setIcon] = useState()
    const[loadingWeather, setLoadingWeather] = useState(false)
    const[currentLocation, setCurrentLocation] = useState()

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
            console.log(res)
            setIcon(res.data.weather[0].icon)
           
            setCurrentLocation(res.data.name)
            
            if(res.data.weather[0].icon === "01d"){
                setSunny(true)
                setNight(false)
                
            } else if (res.data.weather[0].icon === "01n" || res.data.weather[0].icon === "04n") {
                setNight(true)
                setSunny(false)
                setCloudy(false)
            }
            
            else if (res.data.weather[0].icon === "04d"){
                setSunny(false)
                setCloudy(true)
                setNight(false)
            } else {
                setSunny(false)
                setCloudy(false)
                setNight(false)
            }
            
            
        }).catch(function (error) {
            console.log(error)
        })

        setLoadingWeather(true)

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
            console.log(res)
            
            for(let i=0;i<boxRes.length;i++){
                if(boxRes[i].weather[0].icon === "01d" || boxRes[i].weather[0].icon === "01n"){
                    sunnyPlaces.push(boxRes[i].name)
                    setPlaces(sunnyPlaces)
                } 
            }
            setLoadingWeather(false)
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

            
            <Jumbotron>

            {
                night 
                ? <Moon />
                : sunny ? <Sun />
                : cloudy ? <Cloud />
                : <Aperture />
            }
            
            {
            sunny ? <h2>Congrats it's sunny in {currentLocation}!</h2>
            : cloudy ? <h2>Looks like it's cloudy but may be sunny in {currentLocation}</h2>
            : night ? <h2>Go to sleep, and good night, may the sun shine brightly tomorrow in {currentLocation}</h2>
            : <h2>Oh dear...it looks like it's not sunny in {currentLocation}</h2>
            }
                
            </Jumbotron>
            <br />
            <button onClick={(() => searchWeather())}>{sunny ? "Where else is it sunny?" : "Find that sun!"}</button>
            
         
            {
                loadingWeather
                ? <p>Just waiting on you to click on that button</p>
                : <p>It is currently sunny</p>
                }
                
            <ul style={{ listStyleType: "none"}}>
                
                {places.map(item => (
                    <li key={item}>Here -> {item}</li>
                ))}
            </ul>
            
             
        </>
    )
}

export default WeatherSearch
