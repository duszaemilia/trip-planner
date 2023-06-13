import  {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {Container} from '@mui/material';
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack';


export default function AllNotes() {
    const [notes, setNotes] = useState([]);
    const {tripId} = useParams();
    const [trip, setTrip] = useState(null);
    const [editNoteId, setEditNoteId] = useState(null);
    const [editedNote, setEditedNote] = useState('');

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


    const handleDeleteNote = async (noteId) => {
        const confirmed = window.confirm("Are you sure you want to delete this note?");

        if (confirmed) {
            const response = await fetch(`http://localhost:3000/notes/${noteId}`, {
                method: 'DELETE',

            })
            setNotes(notes.filter((note) => note.id !== noteId));
            return response.json();
        }
    };

    const handleEditNote = (noteId) => {
        const noteToEdit = notes.find((note) => note.id === noteId);
        if (noteToEdit) {
            setEditNoteId(noteId);
            setEditedNote(noteToEdit.note);
        }
    };

    const handleSaveNote = async () => {
        if (editedNote.trim() === "") {
            return;
        }

        const response = await fetch(`http://localhost:3000/notes/${editNoteId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ note: editedNote }),
        });

        if (response.ok) {
            const updatedNote = await response.json();
            setNotes(notes.map((note) => {
                if (note.id === updatedNote.id) {
                    return { ...note, note: updatedNote.note };
                }
                return note;
            }));
            setEditNoteId(null);
            setEditedNote('');
        }
    };

    const handleCancelEdit = () => {
        setEditNoteId(null);
        setEditedNote('');
    };


    return (
        <Container maxWidth="md">
            <form>
                <Typography variant="h3" component="h3">
                    {trip && `Notes for trip ${trip.title} (${trip.startDate} - ${trip.endDate})`}
                </Typography>
                <List>
                    {notes.map((note) => (
                        <ListItemButton key={note.id}>
                            {editNoteId === note.id ? (
                                <>
                                    <input
                                        type="text"
                                        value={editedNote}
                                        onChange={(event) => setEditedNote(event.target.value)}
                                    />
                                    <Stack spacing={1} gap={1} direction="row">
                                        <Button variant="outlined" onClick={handleSaveNote}>
                                            Save
                                        </Button>
                                        <Button variant="outlined" onClick={handleCancelEdit}>
                                            Cancel
                                        </Button>
                                    </Stack>
                                </>
                            ) : (
                                <>
                                    <ListItemText primary={note.note} />
                                    <Stack spacing={1} gap={1} direction="row">
                                        <Button
                                            variant="outlined"
                                            onClick={() => handleEditNote(note.id)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            onClick={() => handleDeleteNote(note.id)}
                                        >
                                            Delete
                                        </Button>
                                    </Stack>
                                </>
                            )}
                        </ListItemButton>
                    ))}
                </List>
            </form>
        </Container>
    );
}
