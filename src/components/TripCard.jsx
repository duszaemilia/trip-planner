import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";

function TripCard(props) {
    const [trip, setTripID] = useState({});
    const {tripId} = useParams();

    useEffect(()=>{
        getTripNote(tripId).then((trip) => setTripID(trip));
    },[])
    async function getTripNote(tripId) {
        const response = await fetch(`http://localhost:3000/notes/${tripId}`);
        return await response.json()
    }

    return (
        <div> Trip details {tripId}</div>
    );
}

export default TripCard;