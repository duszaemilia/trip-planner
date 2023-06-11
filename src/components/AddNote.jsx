import React, {useState} from "react";
import {sendDataAPI} from "../helpers/api.jsx";
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack';
import TextField from "@mui/material/TextField";

function AddNote({tripId,setNoteId}) {
    const [note, setNote] = useState("");

    async function handleAddNote() {
        if (note.trim() !== "") {
            const data = await sendDataAPI({
                note: note,
                tripId
            }, "notes");
            setNote("");
            setNoteId(null);
        }

    }

    return (
        <>
            <Stack spacing={7} direction="row">
            <TextField
                label="Additional note"
                variant="outlined"
                type="text"
                value={note}
                onChange={event => setNote(event.target.value)}
                placeholder="Additional note"
            />
            <Button onClick={handleAddNote} variant="contained">Confirm</Button>
            </Stack>
        </>
    );
}

export default AddNote;