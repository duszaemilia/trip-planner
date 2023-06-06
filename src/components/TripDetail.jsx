import AddNote from "./AddNote.jsx";

export function TripDetail(props) {
    return <div>
        <span>{props.trip.title}</span> - <span>{props.trip.description}</span>
        {props.noteId === props.trip.id ? (<AddNote tripId={props.trip.id}/>) : (
            <button onClick={props.onClick}>
                Add note
            </button>)}
        <button>Finish</button>
        <button onClick={props.onClick1} data-id={props.trip.id}>Delete</button>
    </div>;
}