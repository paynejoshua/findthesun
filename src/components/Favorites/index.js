import React, {useState, useEffect, } from "react";
import axios from "axios";
import FavLocals from "../FavLocals"
import DelayFunction from "../../utils/delayFunction"

function Favorites(props){
const[favoriteWeather, setFavoriteWeather] = useState([])

useEffect(() =>{
    getFavorites()
})

function getFavorites(){
    console.log("here now")
// axios.get(`api.openweathermap.org/data/2.5/weather?zip=${FavLocals.kirkland},us&appid=${props.webAPIKey}&units=imperial`)
axios.get(`api.openweathermap.org/data/2.5/weather?q=Seattle&appid=7ee56ea8ee780cf9e916b75d51c2cea5&units=imperial`)
.then(function(res){
    console.log("favoriteWeather", res.data)
}).catch(function(err){
    console.log("err", err)
})
    console.log("now here")
}

    return(
        <>
            <div> Favorites: </div>
        </>
    )
}

export default Favorites