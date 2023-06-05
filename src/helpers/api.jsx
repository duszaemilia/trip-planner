export async function getAllTrips() {
    const response = await fetch('http://localhost:3000/trips');
    return response.json()
}