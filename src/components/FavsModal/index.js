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
                <input onChange={(e) => props.locationInput(e.target.value)} placeholder="Enter Zip or City Name"></input>
                <Button  onClick={props.stringVerification}>Add</Button>
            </Modal.Body>

      

        </Modal>
       
        </>
    )
}

export default FavsModal


 

// Eventually this will need to be set in LocalStorage for Favorites component to get info from.