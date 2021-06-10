import axios from "axios";
import React from "react";
import Button from "react-bootstrap/Button"

function ChaseSun(props){
    
    function findSun(){
    let lonLeft = Math.trunc(props.currentLon)
    let latBottom = Math.trunc(props.currentLat)
    let lonRight = lonLeft + 5
    let latTop = latBottom + 5
    props.loadingWeather(true)
    axios.get(`https://api.openweathermap.org/data/2.5/box/city?bbox=${lonLeft},${latBottom},${lonRight},${latTop},10&appid=${props.webApiKey}&units=imperial`)
    .then(function(res){

        
        let boxRes = res.data.list
        let sunnyPlaces = []
        console.log(res)
        
        for(let i=0;i<boxRes.length;i++){
            if(boxRes[i].weather[0].icon === "01d" || boxRes[i].weather[0].icon === "01n"){
                sunnyPlaces[i] = {
                    name: boxRes[i].name,
                    lat: boxRes[i].coord.Lat,
                    lon: boxRes[i].coord.Lon,
                    weather: boxRes[i].weather[0].description.toUpperCase(),
                    icon: boxRes[i].weather[0].icon
                }
                props.places(sunnyPlaces)
            } 
        }
        props.loadingWeather(false)
        props.hasWeatherLoaded(true)
        
    })
    .catch(function(error){
        console.log(error)
        props.loadingWeather(false)
    })}

    return(
        <>
        <Button variant="warning" size="sm" className="dropShadow" onClick={findSun}>{props.sunny ? "Where else is it sunny?" : "Find that Sun!"}</Button>
        </>
    )
    
}

export default ChaseSun