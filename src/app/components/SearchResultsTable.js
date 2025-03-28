"use client"
import { useState, useEffect } from "react"
import SearchResultsRow from "./SearchResultsRow"

export default function SearchResultsTable({ dogIds, updateSelectedDogs, selectedDogs }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dogs, setDogs] = useState([]);

    // Fetch complete dog data based on dog IDs on component mount
    useEffect(() => {
        const fetchDogs = async () => {
            try {
                // Now use the fetched dogIds in the POST request payload to get full dog data.
                const postResponse = await fetch('https://frontend-take-home-service.fetch.com/dogs', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: "include",
                    body: JSON.stringify(dogIds)
                });
                if (!postResponse.ok) {
                    console.error('Error fetching dog data from dog ids: ', postResponse)
                    throw new Error(`Post error! status: ${postResponse.status}`);
                }
                const dogsData = await postResponse.json();
                setDogs(dogsData);
            } catch (err) {
                console.error('Error fetching dogs:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchDogs();
    }, [dogIds]); // Re-run when the search parameters change.

    if (loading) return <div className="skeleton"></div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="overflow-x-auto max-h-full rounded-box shadow-2xl shadow-primary-600">
            <table className="table">
                <thead className="sticky top-0 z-1">
                    <tr className="text-center bg-primary text-primary-content divider-x">
                        <td>Select</td>
                        <th className="">Image</th>
                        <th>Name</th>
                        <th>Breed</th>
                        <th>Age</th>
                        <th>Zip Code</th>
                    </tr>
                </thead>
                <tbody className="w-auto p-4 text-center">
                    {
                        // use a state variable with the array of dogs to pass the dog object into each row
                        dogs.map((dog) => (
                            <SearchResultsRow selectedDogs={selectedDogs} updateSelectedDogs={updateSelectedDogs} key={dog.id} dog={dog} />
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}