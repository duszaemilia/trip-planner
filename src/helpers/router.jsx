import {createBrowserRouter} from "react-router-dom";
import App from "../App.jsx";
import TripDetails from "../components/TripDetails.jsx";
// import TripDetail from "../components/TripDetails.jsx";
import TripCard from "../components/AllNotes.jsx";
import Layout from "../components/Layout.jsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <App/>,
            },
            {
                path: "/trip-details",
                element: <TripDetails/>,
            },

            {
                path: "/trip-card/:tripId/notes",
                element: <TripCard/>,
            },

        ]
    },


]);