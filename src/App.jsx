import {useEffect, useState} from "react";
import {deleteTripAPI, getAllTrips, sendDataAPI} from "./helpers/api.jsx";
import * as PropTypes from "prop-types";
import {TripDetail} from "./components/TripDetail.jsx";
import {Container} from "@mui/material";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';


TripDetail.propTypes = {
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

    useEffect(() => {
        getAllTrips()
            .then((data) => {
                setTrips(data)
            })
            .catch(console.error)
    }, [])


    async function handleSubmit(event) {
        event.preventDefault();
        const result = await sendDataAPI({
            title, description, status: "open", startDate, endDate
        }, "trips");
        setTitle("");
        setDescription("");
        setStartDate("");
        setEndDate("");
        setTrips([...trips, result])
    }


    async function handleDeleteTrip(event) {
        const id = +event.target.dataset.id
        await deleteTripAPI(id);
        setTrips(trips.filter((trip) => trip.id !== id));
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
                        onChange={(event) => setTitle(event.target.value)}
                    />


                    <TextField
                        label="Trip description"
                        variant="outlined"
                        value={description}
                        id="desc"
                        name="desc"
                        onChange={(event) => setDescription(event.target.value)}/>

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


            <Grid container spacing={2} gap={2} style={{marginTop:'20px'}}>

                {trips.map((trip) => (
                    <TripDetail key={trip.id} trip={trip} noteId={noteId} onClick={() => setNoteId(trip.id)}
                                onClick1={handleDeleteTrip}/>
                ))}
            </Grid>

        </Container>
    )
}

export default App