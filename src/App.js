import './App.css';
import React, {useState, useEffect} from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherSearch from "./components/WeatherSearch"
import 'bootstrap/dist/css/bootstrap.min.css';
import LoadingScreen from "./components/LoadScreen"
 


function App() {
  const[pageLoad, setPageLoad] = useState(true)
  
  useEffect(() =>{
    setTimeout(() => setPageLoad(false), 6000)
  })

 

return (
    <>
    {pageLoad 
    
    ? <LoadingScreen />
    
    : <div className="App">
    <WeatherSearch />
  </div>
    
    }
    </>
  );
}

export default App;
