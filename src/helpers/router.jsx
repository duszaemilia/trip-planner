import {createBrowserRouter} from "react-router-dom";
import App from "../App.jsx";
import TripDetails from "../components/TripDetails.jsx";
import TripDetail from "../components/TripDetails.jsx";
import TripCard from "../components/TripCard.jsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
    },

    {
        path: "/trip-details",
        element: <TripDetail/>,
    },

    {
        path: "/trip-card/:tripId/notes",
        element: <TripCard/>,
    },
            ]);