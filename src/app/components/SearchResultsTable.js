"use client"
import { useState, useEffect } from "react"
import SearchResultsRow from "./SearchResultsRow"

export default function SearchResultsTable({ searchParams }) {
    const [dogs, setDogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    // Helper function to build query string for the search endpoint.
    const buildQueryString = (params) => {
      const query = new URLSearchParams();
  
      if (params) {
        if (params.breeds && Array.isArray(params.breeds)) {
          params.breeds.forEach(breed => query.append('breeds', breed));
        }
        if (params.zipCodes && Array.isArray(params.zipCodes)) {
          params.zipCodes.forEach(zip => query.append('zipCodes', zip));
        }
        if (params.ageMin != null) {
          query.append('ageMin', params.ageMin);
        }
        if (params.ageMax != null) {
          query.append('ageMax', params.ageMax);
        }
        if (params.size != null) {
          query.append('size', params.size);
        }
        if (params.from) {
          query.append('from', params.from);
        }
        if (params.sort) {
          query.append('sort', params.sort);
        }
      }
  
      return query.toString();
    };
  
    useEffect(() => {
      // Async function to perform both fetch calls in sequence.
      const fetchDogs = async () => {
        try {
          // Build the URL with query parameters for the GET request.
          const queryString = buildQueryString(searchParams);
          const searchUrl = `https://frontend-take-home-service.fetch.com/dogs/search?${queryString}`;
  
          const searchResponse = await fetch(searchUrl, {
            method: "GET",
            headers: { "Content-Type" : "application/json"},
            credentials: "include"
          });
          if (!searchResponse.ok) {
            throw new Error(`Search error! status: ${searchResponse.status}`);
          }
          const searchData = await searchResponse.json();
          const dogIds = searchData.resultIds; // The GET returns { resultIds, total, next, prev }
  
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
    }, [searchParams]); // Re-run when the search parameters change.
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="overflow-x-auto overflow-y-scroll h-dvh">
            <table className="table">
                <thead>
                    <tr>
                        <th>Yes/No</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Breed</th>
                        <th>Age</th>
                        <th>Zip Code</th>
                    </tr>
                </thead>
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