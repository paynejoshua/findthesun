import React, {useState, useEffect} from "react"

function DistanceCalc(props){
    const[distance, setDistance] = useState();
    const[lat1, setLat1] = useState();
    const[lon1, setLon1] = useState();
    const[lat2, setLat2] = useState();
    const[lon2, setLon2] = useState();


    useEffect(() => {
        setLat1(props.currentLat)
        setLon1(props.currentLon)
        setLat2(props.destinationLat)
        setLon2(props.destinationLon)
        getDistance(lat1, lon1, lat2, lon2)
    }, [distance])


    function getDistance(lat1,lon1,lat2,lon2) {
        var R = 3958.8; // Radius of the earth in miles
        var dLat = deg2rad(lat2-lat1);  // deg2rad below
        var dLon = deg2rad(lon2-lon1); 
        var a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
          Math.sin(dLon/2) * Math.sin(dLon/2)
          ; 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in miles
        setDistance(Math.trunc(d) + 48);
      }
      
      function deg2rad(deg) {
        return deg * (Math.PI/180)


    }
    
      console.log("here", distance)
      return(
          <>
            <p>Around {distance} miles away!</p>
            <p>Should take about {Math.trunc(distance / 60)} hours</p>
          </>
      )
}

export default DistanceCalc