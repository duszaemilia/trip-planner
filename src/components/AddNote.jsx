import {useState} from "react";
import {sendDataAPI} from "../helpers/api.jsx";

function AddNote({tripId}) {
    const [note, setNote] = useState("");

    async function handleAddNote() {
        if (note.trim() !== "") {
            const data = await sendDataAPI({
                note: note,
                tripId
            }, "notes");

        }

    }

    return (
        <>
            <input type="text"
                   value={note}
                   onChange={event => setNote(event.target.value)}
                   placeholder="Additional note"
            />
            <button onClick={handleAddNote}>Confirm</button>
        </>
    );
}

export default AddNote;