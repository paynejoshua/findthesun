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
    const[isFavsListLoaded, setIsFavsListLoaded] = useState(false);
    const[isFavsModalVisible, setIsFavsModalVisible] = useState(false)


    useEffect(() =>{
        let favsArray = []
        
            let promises =  []
            Object.values(FavLocals).map(function(values){
                
                
                let promise = axios.get(`http://api.openweathermap.org/data/2.5/weather?zip=${values}&appid=${props.webAPIKey}&units=imperial`)
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
            })
            
            Promise.all(promises).then(() => {
                setIsFavsListLoaded(true)
                setFavsList(favsArray)
            })
            
        
        

    }, [])

    function addFavorite(){
        setIsFavsModalVisible(true)
    }
    
    return(
        <>
        <FavsModal show={isFavsModalVisible} onHide={() => setIsFavsModalVisible(false)}></FavsModal>
        <Container fluid>
        
           
       
       
     
            {isFavsListLoaded
            ? <Row>
                <Col sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Button className="dropShadow" variant="warning" size="sm" onClick={addFavorite}>Add A Favorite</Button>
                <div style={{ marginTop: "1rem"}}> Favorites: </div>
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

