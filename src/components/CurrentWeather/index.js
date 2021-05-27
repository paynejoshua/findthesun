import axios from "axios";
import DelayFunction from "../../utils/delayFunction";

function CurrentWeather(lat, lon){
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

export default CurrentWeather