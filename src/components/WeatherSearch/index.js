import React, {useState, useEffect} from "react";
import axios from "axios";


function WeatherSearch(){
    const[webApiKey] = useState("a4a8fbe7c144be93020e3a7f15b622db")
    const[lat, setLat] = useState()
    const[lon, setLon] = useState()
    const[sunny, setSunny] = useState()
    const[places, setPlaces] = useState([])
    const[placeLoading, setPlaceLoading] = useState(false)

    useEffect(() => {

        navigator.geolocation.getCurrentPosition(function(position){
            setLat(position.coords.latitude)
            setLon(position.coords.longitude)
        })

        getCurrentWeather()


        console.log(lat, lon)
        
    }, [lat, lon])

    function getCurrentWeather(){
        axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${webApiKey}&units=imperial`)
        .then(function(res){
            console.log(res)
            
            if(res.data.weather[0].icon == "01d" || res.data.weather[0].icon == "01n"){
                setSunny(true)
                console.log(sunny)
                console.log("It's sunny")
            } else {
                setSunny(false)
                console.log(sunny)
                console.log("It's not sunny")
            }
            
        }).catch(function (error) {
            console.log(error)
        })
    }

    function searchWeather(){
        let lonLeft = Math.trunc(lon)
        let latBottom = Math.trunc(lat)
        let lonRight = lonLeft + 5
        let latTop = latBottom + 5
        console.log(lonRight)
        axios.get(`http://api.openweathermap.org/data/2.5/box/city?bbox=${lonLeft},${latBottom},${lonRight},${latTop},10&appid=${webApiKey}&units=imperial`)
        .then(function(res){

            console.log("bbox", res)
            // You are here. 
            let boxRes = res.data.list
            console.log(boxRes)
            let sunnyPlaces = []
            
            for(let i=0;i<boxRes.length;i++){
                if(boxRes[i].weather[0].icon == "01d" || boxRes[i].weather[0].icon == "01n"){
                    console.log("It's sunny in:", boxRes[i].name)
                    sunnyPlaces.push(boxRes[i].name)
                    setPlaceLoading(true)
                    setPlaces(sunnyPlaces)
                    setPlaceLoading(false)
                } else{
                    console.log("No freaking sun anywhere")
                }
            }

            // Now loop through the results to see if any of the cities returned are currently "01d" || "01n"
            // If not then move the grid search. 
        })
        .catch(function(error){
            console.log(error)
        })
    }
 

    console.log(places)


    return(
        <>
            {/* <input placeholder="City:" onChange={((e) => setCity(e.target.value))}></input>
            <input placeholder="State:" onChange={((e) => setState(e.target.value))}></input>
            <button onClick={(() => switchSearch())}>Search</button> */}

        

        
            <button onClick={(() => searchWeather())}>{sunny ? "Where else is it sunny?" : "Find that sun!"}</button>
            
            

            <ul style={{ listStyleType: "none"}}>
                
                {places.map(item => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
            
            
         
        
            
            
            
        </>
    )
}

export default WeatherSearch
