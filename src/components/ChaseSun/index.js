import React, {useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button"

function ChaseSun(props){

    const maxBBOXSize = 5

    const [isFindSunBtnClicked, setIsFindSunBtnClicked] = useState(false)
    const [isSearched, setIsSearched] = useState(false)
    

    function findSun(bboxSize){
    let lonLeft = Math.trunc(props.currentLon) - bboxSize / 2
    let latBottom = Math.trunc(props.currentLat) - bboxSize / 2
    let lonRight = Math.trunc(props.currentLon) + bboxSize / 2
    let latTop = Math.trunc(props.currentLat) + bboxSize / 2
    props.loadingWeather(true)
    axios.get(`https://api.openweathermap.org/data/2.5/box/city?bbox=${lonLeft},${latBottom},${lonRight},${latTop},10&appid=${props.webApiKey}&units=imperial`)
    .then(function(res){

        
        let boxRes = res.data.list
        let sunnyPlaces = []
        console.log(res)
        
        for(let i=0;i<boxRes.length && sunnyPlaces.length <= 5; i++){
            if(boxRes[i].weather[0].icon === "01d" || boxRes[i].weather[0].icon === "01n"){
                sunnyPlaces.push(

                        {
                            name: boxRes[i].name,
                            lat: boxRes[i].coord.Lat,
                            lon: boxRes[i].coord.Lon,
                            weather: boxRes[i].weather[0].description.toUpperCase(),
                            icon: boxRes[i].weather[0].icon
                        }
                    ) 
            }
        }

        if(sunnyPlaces.length == 0 && bboxSize !== maxBBOXSize){
            findSun(bboxSize + 1)
        } else {
            console.log("max bbox limit reached")
            props.places(sunnyPlaces)
            props.loadingWeather(false)
            props.hasWeatherLoaded(true)
    }
        
    })
    .catch(function(error){
        console.log(error)
        props.loadingWeather(false)
    })
}
    
  

    return(
        <>
        <Button variant="warning" size="sm" className="dropShadow mt-5" onClick={() => findSun(1)}>{isFindSunBtnClicked ? "Search Again" : "Find that Sun!"}</Button>
        </>
    )
    
}

export default ChaseSun