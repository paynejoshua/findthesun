import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button"

function LocationModal(props){

    return(

        <>
            <Modal show={props.show} onHide={props.onHide}>
        
            <Modal.Header closeButton> Enter By Zip or City Name</Modal.Header>
            <Modal.Body>
                <input onChange={(e) => props.zip(e.target.value)} placeholder="Enter Current Zip Code"></input>
                <Button  onClick={props.onHide}>Set Location</Button>

        </Modal.Body>

  

    </Modal>
        </>
    )
}

export default LocationModal