import React, {useState, useEffect} from "react";
import axios from "axios";
import Jumbotron from "react-bootstrap/Jumbotron";
import {Moon} from "react-feather";
import {Sun} from "react-feather";
import {Cloud} from "react-feather";
import LoadScreen from "../LoadScreen";
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import DistanceCalc from "../DistanceCalculator";
import DelayFunction from "../../utils/delayFunction";
import ChaseSun from "../ChaseSun";
import Favorites from "../Favorites";


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
    const[hasWeatherLoaded, setHasWeatherLoaded] = useState(false)
    const[currentLocation, setCurrentLocation] = useState()
    const[isLoadingUserLocation, setIsLoadingUserLocation] = useState(true)
    const[geoLocation, setGeoLocation] = useState(false)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function(position){
            setGeoLocation(true)
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
            console.log("local weather", res)
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
            
            {
            isLoadingUserLocation
            ? <>Please Hold...</>
            
            :   <Container fluid>
                <Row>
          
                  

                    <Col sm={12} md={6} lg={6} xl={6} style={{borderStyle: "solid"}}>
        
                        <ChaseSun 
                            checkSun={sunny}
                            currentLat={currentLat} 
                            currentLon={currentLon}
                            webApiKey={webApiKey} 
                            loadingWeather={(bool) => setLoadingWeather(bool)}
                            hasWeatherLoaded={(bool) => setHasWeatherLoaded(bool)}
                            places={(places) => setPlaces(places)}>
                                
                        </ChaseSun>

                        {
                            hasWeatherLoaded 
                            ? <p style={{ marginTop: "1rem"}}>It is currently sunny here: </p>
                          
                            : <p style={{ marginTop: "1rem"}}>Just waiting on you to click on that button</p>
                            
                        }

                        {places.map(item => (
                            <Col key={item.name}>
                                <Card style={{width: '18rem'}} className="sunny mt-5 dropShadow">
                                        <Sun style={{fill: "orange"}} />
                                        <Card.Title>{item.name}</Card.Title>
                                        <Card.Body className="sunny">
                                    {item.weather}
                                        <DistanceCalc currentLat={currentLat} currentLon={currentLon} 
                                        destinationLat={item.lat} destinationLon={item.lon}/>
                                        </Card.Body>

                                </Card>
                            </Col>
                  
                        ))} 



                        
                    </Col>
                

                    <Col sm={12} md={6} lg={6} xl={6} style={{ borderStyle: "solid"}}>
                    <Favorites webAPIKey={webApiKey}/>
            
                    </Col>
            </Row>
           
                </Container>   
            }

             
        </>
    )
}

export default WeatherSearch
