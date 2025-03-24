import { BreedFilterRow } from "./BreedFilterRow"
import { useState, useEffect } from "react";

export function BreedFiltersMenu() {
    const [breeds, setBreeds] = useState([]);
    
        useEffect(() => {
            async function fetchData() {
                const tempBreeds = await fetch("https://frontend-take-home-service.fetch.com/dogs/breeds", {
                    method: "GET",
                    credentials: "include"
                })
    
                const parsedBreeds = await tempBreeds.json()
                const breedsConstructor = []
    
                parsedBreeds.forEach(breed => {
                    breedsConstructor.push(
                        {
                            checked: false,
                            breedName: breed
                        }
                    )
                })
    
                console.log("Breeds constructor: ", breedsConstructor)
    
                setBreeds(breedsConstructor);
            }
    
            fetchData();
        }, [])

    return (
        <table className="table table-pin-rows rounded-box">
            <thead>
                <tr className="bg-primary">
                    <th className="">
                        <label>
                            <input type="checkbox" className="checkbox" />
                        </label>
                    </th>
                    <th className="">Breed Name</th>
                </tr>
            </thead>
            <tbody>
                {
                    breeds.map((breed, index) => (
                        <BreedFilterRow key={index} breed={breed} />
                    ))
                }
            </tbody>
        </table>
    )
}