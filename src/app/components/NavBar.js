'use client'
import { useState, useEffect } from "react";

function BreedItem({breedObject}) {
    return (
        <li>
            <label>
                <input type="checkbox" className="checkbox" />
                {breedObject.breedName}
            </label>
        </li>
    )
}

export default function NavBar() {
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
        <div className="navbar shadow-sm z-2">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <h2>Filters</h2>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                        <details>
                            <summary>Breeds</summary>
                            <ul className="p-2 max-h-[50dvh] overflow-y-auto">
                                {
                                    breeds.map((breed, index) => (
                                        <BreedItem key={index} breedObject={breed} />
                                    ))
                                }
                            </ul>
                        </details>
                    </li>
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">Fetch</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <h2 className="font-bold">Filters:</h2>
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <details>
                            <summary>Breeds</summary>
                            <ul className="p-2 max-h-[50dvh] overflow-y-auto">
                                {
                                    breeds.map((breed, index) => (
                                        <BreedItem key={index} breedObject={breed} />
                                    ))
                                }
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
            <div className="navbar-end">
                <a className="btn bg-secondary">Logout</a>
            </div>
        </div>
    )
}