import React, {useState, useEffect} from "react";
import axios from "axios";
import Jumbotron from "react-bootstrap/Jumbotron";
import {Moon} from "react-feather";
import {Sun} from "react-feather";
import {Cloud} from "react-feather";
import {Aperture} from "react-feather";
import LoadScreen from "../LoadScreen";
import CountryLookUp from "../CountryLookUp";
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import DistanceCalc from "../DistanceCalculator";
import DelayFunction from "../../utils/delayFunction";


function WeatherSearch(props){
    const[webApiKey] = useState("a4a8fbe7c144be93020e3a7f15b622db")
    const[currentLat, setCurrentLat] = useState()
    const[currentLon, setCurrentLon] = useState()
    const[sunny, setSunny] = useState()
    const[night, setNight] = useState()
    const[cloudy, setCloudy] = useState()
    const[places, setPlaces] = useState([])
    const[icon, setIcon] = useState()
    const[loadingWeather, setLoadingWeather] = useState(false)
    const[hasWeatherLoaded, setHasWeatherLodaed] = useState(false)
    const[currentLocation, setCurrentLocation] = useState()
    const[sunIcon, setSunIcon] = useState(Sun)
    const[isLoadingUserLocation, setIsLoadingUserLocation] = useState(true)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function(position){
            setCurrentLat(position.coords.latitude)
            setCurrentLon(position.coords.longitude)
            getCurrentWeather(position.coords.latitude, position.coords.longitude) 
        })

               
    }, [currentLat, currentLon])

    function getCurrentWeather(lat, lon){
        setIsLoadingUserLocation(true)
        console.log("start")
        DelayFunction(axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${webApiKey}&units=imperial`),0)
        .then(function(res){
            console.log(res)
            setIcon(res.data.weather[0].icon)
           
            setCurrentLocation(res.data.name)
            
            if(res.data.clouds.all <= 10){
                setSunny(true)
                setNight(false)
                setCloudy(false)
                
            } else if (res.data.weather[0].icon === "01n" || res.data.weather[0].icon === "04n") {
                setNight(true)
                setSunny(false)
                setCloudy(false)
            }
            
            else if (res.data.clouds.all > 10){
                setSunny(false)
                setCloudy(true)
                setNight(false)
            } else {
                setSunny(false)
                setCloudy(false)
                setNight(false)
            }


            setIsLoadingUserLocation(false)
            console.log("end")
            
        }).catch(function (error) {
            console.log(error)
            setIsLoadingUserLocation(false)

        })

    }

    function searchWeather(){
        
        let lonLeft = Math.trunc(currentLon)
        let latBottom = Math.trunc(currentLat)
        let lonRight = lonLeft + 5
        let latTop = latBottom + 5
        setLoadingWeather(true)
        axios.get(`http://api.openweathermap.org/data/2.5/box/city?bbox=${lonLeft},${latBottom},${lonRight},${latTop},10&appid=${webApiKey}&units=imperial`)
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
                        weather: boxRes[i].weather[0].description,
                        icon: boxRes[i].weather[0].icon
                    }
                    setPlaces(sunnyPlaces)
                } 
            }
            setLoadingWeather(false)
            setHasWeatherLodaed(true)
            
        })
        .catch(function(error){
            console.log(error)
            setLoadingWeather(false)
        })
    }

    console.log("here boo", places)

    console.log(currentLat, currentLon)

    return(
        <>
            {/* <input placeholder="City:" onChange={((e) => setCity(e.target.value))}></input>
            <input placeholder="State:" onChange={((e) => setState(e.target.value))}></input>
            <button onClick={(() => switchSearch())}>Search</button> */}

            
            <Jumbotron className={cloudy ? "cloudy" : ""} style={ 
                sunny ? {background: "linear-gradient(180deg,#b8a9af,#FFDF00)"} 
                    : night ? {background: "black"} 
                        : {}}>

            {
                night 
                ? <Moon style={{fill: "white"}} />
                    : sunny ? <Sun />
                        : cloudy ? <Cloud style={{color: "white"}}/>
                            : <div/>
            }
            
            {
            isLoadingUserLocation 
            ? 
            
            <LoadScreen />
                : sunny ? <h2>Congrats it's sunny in {currentLocation}!</h2>
                    : cloudy ? <h2 style={{color: "white"}}>Looks like it's cloudy in {currentLocation}</h2>
                        : night ? <h2 style={{color: "white"}}>Go to sleep, and good night, may the sun shine brightly tomorrow in {currentLocation}</h2>
                            : <h2>Oh dear...it looks like it's not sunny in {currentLocation}</h2>
            }
                
            </Jumbotron>
            <br />
            <div style={{ display: "flex", justifyContent: "center"}}>

            <button  onClick={(() => searchWeather())}>{sunny ? "Where else is it sunny?" : "Find that sun!"}</button>
            </div>
            
         
            {
                hasWeatherLoaded 
                ? <p style={{ display: "flex", justifyContent: "center"}}>It is currently sunny here: </p>
                : <p style={{ display: "flex", justifyContent: "center"}}>Just waiting on you to click on that button</p>
                }    

            <Container fluid >
                <Row md={3} lg={6} className="justify-content-center">
                
                
                {places.map(item => (
                    <Col lg={{ span: 4, offset: 2}} md={6} sm={12} className="onHover mb-4" key={item.name}>
                        <Card style={{width: '18rem'}} className="sunny">
                                <Sun style={{fill: "orange"}} />
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Body className="sunny">
                               {item.weather}
                                <DistanceCalc currentLat={currentLat} currentLon={currentLon} destinationLat={item.lat} destinationLon={item.lon}/>
                                </Card.Body>

                      
                     
                        </Card>
                    </Col>
                ))} 
    
                </Row>
            </Container>

            
            
             
        </>
    )
}

export default WeatherSearch
