import React, {useEffect, useState} from "react";
import {deleteTripAPI, getAllTrips, sendDataAPI} from "./helpers/api.jsx";
// import * as PropTypes from "prop-types";
import PropTypes from "prop-types";

// import {TripDetail} from "./components/TripDetail.jsx";
import TripDetails from "./components/TripDetails.jsx";
import AllNotes from "./components/AllNotes.jsx";


import {Container, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import List from '@mui/material/List';
import InboxIcon from '@mui/icons-material/MoveToInbox';

import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import Typography from "@mui/material/Typography";


TripDetails.propTypes = {
    trip: PropTypes.any,
    noteId: PropTypes.any,
    onClick: PropTypes.func,
    onClick1: PropTypes.func
};

function App() {

    const [trips, setTrips] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [noteId, setNoteId] = useState(null);
    const [titleError, setTitleError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);


    useEffect(() => {
        getAllTrips()
            .then((data) => {
                setTrips(data)
            })
            .catch(console.error)
    }, [])


    async function handleSubmit(event) {
        event.preventDefault();

        if (title.trim() === "") {
            setTitleError(true);
        } else if (description.trim() === "") {
            setDescriptionError(true);
        } else {
            setTitleError(false);
            setDescriptionError(false);

            const result = await sendDataAPI({
                title, description, startDate, endDate
            }, "trips");
            setTitle("");
            setDescription("");
            setStartDate("");
            setEndDate("");
            setTrips([...trips, result]);
            alert("Plan trip has been written!");
        }
    }

    function handleTitleChange(event) {
        setTitle(event.target.value);
        if (titleError && event.target.value.trim() !== "") {
            setTitleError(false);
        }
    }

    function handleDescriptionChange(event) {
        setDescription(event.target.value);
        if (descriptionError && event.target.value.trim() !== "") {
            setDescriptionError(false);
        }
    }

    async function handleDeleteTrip(event) {
        const id = +event.target.dataset.id
        const confirmed = window.confirm("Are you sure you want to delete this plan trip?");

        if (confirmed) {
            await deleteTripAPI(id);
            setTrips(trips.filter((trip) => trip.id !== id));
        }
    }


    return (
        <Container maxWidth="md">
            <h1>Trip Planner</h1>
            <form onSubmit={handleSubmit}>


                <Stack spacing={2} direction="column">
                    <TextField
                        label="Trip title"
                        variant="outlined"
                        value={title}
                        type="text"
                        id="title"
                        name="title"
                        onChange={handleTitleChange}
                        error={titleError}
                    />
                    {titleError && (
                        <Typography variant="caption" color="error">
                            Please enter a title.
                        </Typography>
                    )}

                    <TextField
                        label="Trip description"
                        variant="outlined"
                        value={description}
                        id="desc"
                        name="desc"
                        onChange={handleDescriptionChange}
                        error={descriptionError}
                    />

                    {descriptionError && (
                        <Typography variant="caption" color="error">
                            Please enter a description.
                        </Typography>
                    )}

                    <div>

                        <label htmlFor="startDate">Start Date</label>

                        <input
                            value={startDate}
                            type="date"
                            id="startDate"
                            name="startDate"
                            onChange={(event) => setStartDate(event.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="endDate">End Date</label>
                        <input
                            value={endDate}
                            type="date"
                            id="endDate"
                            name="endDate"
                            onChange={(event) => setEndDate(event.target.value)}
                        />
                    </div>
                    <Button variant="contained" type="submit">Save trip</Button>
                </Stack>
            </form>


            <Grid spacing={2} gap={2} style={{marginTop: '20px'}}>

                {trips.map((trip) => (

                    <TripDetails
                        key={trip.id}
                        trip={trip}
                        noteId={noteId}
                        setNoteId={setNoteId}
                        onClick={() => setNoteId(trip.id)}
                        onClick1={handleDeleteTrip}/>

                ))}
            </Grid>

        </Container>
    )
}

export default App