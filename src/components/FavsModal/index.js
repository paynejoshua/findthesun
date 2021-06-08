import React from "react"
import axios from "axios"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"

function FavsModal(props){

    return(
        <>
        <Modal show={props.show} onHide={props.onHide}>
        
            <Modal.Header closeButton> Enter By Zip or City Name</Modal.Header>
            <Modal.Body>
                <input placeholder="Enter Zip or City Name"></input>
                <Button>Add</Button>
            </Modal.Body>

      

        </Modal>
       
        </>
    )
}

export default FavsModal

// Getting Weather for new Favorite input
// Need a function to check if input is zip code or city name
// have a callback prop that passes back zip or city property to Favorites component
// on Favorites component have a state that sets zip or city 
// Create a function that makes a get request to openweathermap based on zip or city
// get request will then need to pass information back to Favorites component to display
    // new favorites info.

// Eventually this will need to be set in LocalStorage for Favorites component to get info from.