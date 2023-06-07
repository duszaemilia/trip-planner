import React from 'react';
import {useParams} from "react-router-dom";

function TripCard(props) {
    const {tripId} = useParams();

    return (
        <div> Trip details {tripId}</div>
    );
}

export default TripCard;