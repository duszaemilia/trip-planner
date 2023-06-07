import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function AllNotes() {
    const [notes, setNotes] = useState([]);
    const { tripId } = useParams();

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

    return (
        <div>
            <h1>Notes for Trip {tripId}</h1>
            <ul>
                {notes.map((note) => (
                    <li key={note.id}>{note.note}</li>
                ))}
            </ul>
        </div>
    );
}