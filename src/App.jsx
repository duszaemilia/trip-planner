import './App.css'
import {useEffect, useState} from "react";
import {getAllTrips} from "./helpers/api.jsx";

function App() {

    const [trips,setTrips] = useState([]);

useEffect(() =>{
    getAllTrips()
        .then((data) => {
        setTrips(data)
    })
        .catch(console.error)
},[])


    return (
        <>

        </>
    )
}

export default App
