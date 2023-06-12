import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {Container} from '@mui/material';

export default function AllNotes({trips}) {
    const [notes, setNotes] = useState([]);
    const {tripId} = useParams();
    const [trip, setTrip] = useState(null);

    async function getNote() {
        const response = await fetch(`http://localhost:3000/notes?tripId=${tripId}`);
        return await response.json();
    }

    useEffect(() => {
        const getNotes = async () => {
            const data = await getNote();
            if (data) {
                setNotes(data);
            }
        };

        getNotes();
    }, [tripId]);

    useEffect(() => {
        const getTrip = async () => {
            const response = await fetch(`http://localhost:3000/trips/${tripId}`);
            const data = await response.json();
            setTrip(data);
        };

        getTrip();
    }, [tripId]);

    return (
        <Container maxWidth="md">
            <form>
                <Typography variant="h3" component="h3">
                    {trip && `Notes for trip ${trip.title} (${trip.startDate} - ${trip.endDate})`}
                </Typography>
                <List>
                    {notes.map((note) => (
                        <ListItemButton key={note.id}>
                            <ListItemText primary={note.note}/>
                        </ListItemButton>
                    ))}
                </List>
            </form>
        </Container>
    );
}
