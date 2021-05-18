import React from "react"
import BouncingPin from "../../assets/jumping_pin.gif"


function LoadScreen(){

    return(

        <>
        <h1><span><img src={BouncingPin} style={{width: "3rem", height: "3rem", borderRadius: "50%", zoom: "100%"}}></img></span> Hold On while we locate you</h1>        
        </>
    )
}

export default LoadScreen