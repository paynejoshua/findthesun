import React, {useState, useEffect, } from "react";
import FavLocals from "../FavLocals";
import DelayFunction from "../../utils/delayFunction";
import axios from "axios";
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Button from "react-bootstrap/Button";
import FavsModal from "../FavsModal"


function Favorites(props){
    const[favsList, setFavsList] = useState([]);
    const[isFavsListLoaded, setIsFavsListLoaded] = useState(true);
    const[isFavsModalVisible, setIsFavsModalVisible] = useState(false);
    const[locationInputState, setLocationInputState] = useState();
    const[localStorageArray, setLocalStorageArray] = useState([]);
    const[isLocalStorageEmpty, setIsLocalStorageEmpty] = useState()
    const[reload, setReload] = useState(false)


    useEffect(() =>{
            let favsArray = []
            let promises =  []
            
            const getFavoritesArray = JSON.parse(localStorage.getItem("favoriteLocations") || '0')


            if(!getFavoritesArray){
                console.log("no favorites in LS")
                setIsLocalStorageEmpty(true)
                setReload(false)
            } 
            else {
            setIsLocalStorageEmpty(false)
            console.log("ls GET", getFavoritesArray)
            setReload(false)
            
            setLocalStorageArray(getFavoritesArray)

            for(let i=0; i<getFavoritesArray.length; i++){
                console.log("localStorageValues", getFavoritesArray[i])
                
                if(/^[a-zA-Z _]+$/.test(getFavoritesArray[i])){
                let promise = axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${getFavoritesArray[i]}&appid=${props.webAPIKey}&units=imperial`)
                promises.push(promise)

                promise.then(function(res){
                    let object = {
                        city: res.data.name,
                        currentTemp: Math.ceil(res.data.main.temp),
                        highTemp: Math.ceil(res.data.main.temp_max),
                        lowTemp: Math.ceil(res.data.main.temp_min),
                        icon: res.data.weather[0].icon,
                        weatherDescription: res.data.weather[0].description
                    }
                    favsArray.push(object)                    
                    
                })
                .catch(function(err){
                console.log("error:", err)
                })
                }
                else if(isNaN(getFavoritesArray[i]) == false){
                    let promise = axios.get(`http://api.openweathermap.org/data/2.5/weather?zip=${getFavoritesArray[i]}&appid=${props.webAPIKey}&units=imperial`)
                promises.push(promise)

                promise.then(function(res){
                    let object = {
                        city: res.data.name,
                        currentTemp: Math.ceil(res.data.main.temp),
                        highTemp: Math.ceil(res.data.main.temp_max),
                        lowTemp: Math.ceil(res.data.main.temp_min),
                        icon: res.data.weather[0].icon,
                        weatherDescription: res.data.weather[0].description
                    }
                    favsArray.push(object)                    
                    
                })
                .catch(function(err){
                console.log("error:", err)
                })
                }


            }
            
            Promise.all(promises).then(() => {
                setIsFavsListLoaded(true)
                setFavsList(favsArray)
            })
                }
            
        
        

    }, [reload])

    console.log(locationInputState)

    function openFavModal(){
        setIsFavsModalVisible(true)
    }

    function locationStringVerification(){
        if(/^[a-zA-Z _]+$/.test(locationInputState)){
            setIsFavsModalVisible(false)
            console.log("this is a city")

            let currentFavArray = localStorageArray

            currentFavArray.push(locationInputState)

            setLocalStorageArray(currentFavArray)
            
            localStorage.setItem(`favoriteLocations`, JSON.stringify(currentFavArray))  
            setIsLocalStorageEmpty(false) 
            setReload(true)                
            axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${locationInputState}&appid=${props.webAPIKey}&units=imperial`)
            .then(function(res){
                console.log(res.data)
            })
            .catch(function(err){
                console.log(err)
            })
        } else if(isNaN(locationInputState) == false && locationInputState.length == 5){
            setIsFavsModalVisible(false)

            console.log("this is a zip")

            let currentFavArray = localStorageArray

            currentFavArray.push(locationInputState)

            setLocalStorageArray(currentFavArray)
            
            localStorage.setItem(`favoriteLocations`, JSON.stringify(currentFavArray))
            setIsLocalStorageEmpty(false)
            setReload(true)
            axios.get(`http://api.openweathermap.org/data/2.5/weather?zip=${locationInputState}&appid=${props.webAPIKey}&units=imperial`)
            .then(function(res){
                console.log(res.data)
            })
            .catch(function(err){
                console.log(err)
            })
        } else {
            console.log("Incorrect input given. Please provide a valid City or 5 digit Zip code")
        }

    }

    
    return(
        <>
        <FavsModal 
        locationInput={setLocationInputState} 
        show={isFavsModalVisible} onHide={() => setIsFavsModalVisible(false)}
        stringVerification={locationStringVerification}></FavsModal>
        <Container fluid>
        
           
       
       
     
            {isFavsListLoaded
            ? <Row>
                <Col sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Button className="dropShadow" variant="warning" size="sm" onClick={openFavModal}>Add A Favorite</Button>
                <div style={{ marginTop: "1rem"}}>{isLocalStorageEmpty ? "No Favorites Added Yet" : "Favorites:" }</div>
                </Col>
               
            {favsList.map(item => (
                <Col key={item.city}>
                    <Card style={{width: "18rem"}} className="dropShadow mt-3 mb-3">
                        <Card.Body>
                        <Card.Title>City: {item.city}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Current Temperature: {item.currentTemp}°</Card.Subtitle>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem>Current Weather Conditions: {item.weatherDescription}</ListGroupItem>
                            <ListGroupItem>High: {item.highTemp}°</ListGroupItem>
                            <ListGroupItem>Low: {item.lowTemp}°</ListGroupItem>

                        </ListGroup>
                    </Card>
                </Col>
            ))}
            </Row>
            
            : <div> Favorites Loading...</div>
                
        }
        </Container>
            
        </>
    )
}

export default Favorites

// For local storage
    // Since LS has to be a unique key. You could set the value to be an object
    // that gets updated when a new favorite location is added. 

// This article explains setting favorite items in LS:
    // https://medium.com/wesionary-team/creating-favorites-list-using-localstorage-in-react-part-i-22692bc0f153