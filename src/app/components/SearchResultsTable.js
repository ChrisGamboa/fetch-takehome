"use client"
import { useState, useEffect } from "react"
import SearchResultsRow from "./SearchResultsRow"
import PaginationBar from "./PaginationBar";

export default function SearchResultsTable({ dogIds }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dogs, setDogs] = useState([]);

    useEffect(() => {
        // Async function to perform both fetch calls in sequence.
        const fetchDogs = async () => {
            try {
                // Now use the fetched dogIds in the POST request to get full dog data.
                const postResponse = await fetch('https://frontend-take-home-service.fetch.com/dogs', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: "include",
                    body: JSON.stringify(dogIds)
                });
                if (!postResponse.ok) {
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
        <div className="overflow-x-auto rounded-box">
            <table className="table">
                <tbody>
                    {
                        // use a state variable withead the array of dogs to pass the dog object into component <SearchResultsRow />
                        dogs.map((dog) => (
                            <SearchResultsRow key={dog.id} dog={dog} />
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}