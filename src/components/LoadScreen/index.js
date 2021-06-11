import React, {useState} from "react"
import BouncingPin from "../../assets/jumping_pin.gif";
import LocationModal from "../LocationModal"


function LoadScreen(props){
    const[isLocationModalVisible, setIsLocationModalVisible] = useState(false)
    const[locationZip, setLocationZip] = useState()
  
    function zipSet(){
        setIsLocationModalVisible(false)
        props.getWeather(locationZip)
    }

    function showLocationModal(){
        setIsLocationModalVisible(true)
    }

    return(

        <>
        { props.locationPermission 

        ? <LocationModal 
        callCurrentWeather={props.getWeather} 
        show={() => setIsLocationModalVisible(true)} 
        onHide={zipSet}
        zip={setLocationZip}
        />
        : <h1><span><img src={BouncingPin} style={{width: "3rem", height: "3rem", borderRadius: "50%", zoom: "100%"}}></img></span> Hold On while we locate you</h1>        
            
    }
        </>
    )
}

export default LoadScreen