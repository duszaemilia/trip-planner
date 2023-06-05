import './App.css'
import {useEffect, useState} from "react";
import {getAllTrips} from "./helpers/api.jsx";
import {sendTripData} from "./helpers/api.jsx";

function App() {

    const [trips, setTrips] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        getAllTrips()
            .then((data) => {
                setTrips(data)
            })
            .catch(console.error)
    }, [])


    async function handleSubmit(event) {
        event.preventDefault();
        const result = await sendTripData({
            title, description, status:"open", startDate, endDate
        });
        setTitle("");
        setDescription("");
        setStartDate("");
        setEndDate("");
        setTrips([...trips,result])
    }

    return (
        <>
            <form onSubmit={handleSubmit}>

                <div>
                    <label htmlFor="title">Trip title</label>
                    <input
                        value={title}
                        type="text"
                        id="title"
                        name="title"
                        onChange={(event) => setTitle(event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="title">Trip description</label>
                    <textarea
                        value={description}
                        id="desc"
                        name="desc"
                        onChange={(event) => setDescription(event.target.value)}
                    />
                </div>
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
                <button type="submit">Save trip</button>
            </form>

            <section>
                {trips.map((trip) => (
<div key={trip.id}>
    <span>{trip.title}</span> - <span>{trip.description}</span>
    <button>Add note</button>
    <button>Finish</button>
    <button>Delete</button>
</div>
                ))}
            </section>

        </>
    )
}

export default App
