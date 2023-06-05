export async function getAllTrips() {
    const response = await fetch('http://localhost:3000/trips');
    return response.json()
}


export  async function sendTripData(data) {
    const response = await fetch(
        'http://localhost:3000/trips',
        {
            headers:{
                "Content-Type": "application/json"
            },
            method: "POST",
            body:JSON.stringify(data)
        }
    )
    return response.json()
}