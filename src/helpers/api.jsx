export async function getAllTrips() {
    const response = await fetch('http://localhost:3000/trips');
    return response.json()
}


export  async function sendDataAPI(data,endpoint) {
    const response = await fetch(
        `http://localhost:3000/${endpoint}`,
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

export     async function deleteTripAPI(id){
    const response = await fetch (`http://localhost:3000/trips/${id}`, {method:'DELETE'})
    return response.json();
}