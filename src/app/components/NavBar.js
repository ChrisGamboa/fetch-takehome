'use client'
import { useState, useEffect } from "react";

function BreedItem({breedObject, updateBreedFilter, breeds}) {

    // update the breed filter state in the SearchPage component.
    async function handleBreedClick() {
        const tempBreeds = [...breeds]
        let newBreedObject = {...breedObject}
        newBreedObject.checked = !newBreedObject.checked;

        tempBreeds.map((breed) => {
            if (breed.breedName === newBreedObject.breedName) {
                breed.checked = newBreedObject.checked;
            }
        }
        )
        console.log("New breeds object", tempBreeds)
        updateBreedFilter(tempBreeds)    
    }

    return (
        <li>
            <label onClick={handleBreedClick}>
                <input type="checkbox" className="checkbox" />
                {breedObject.breedName}
            </label>
        </li>
    )
}

export default function NavBar({breeds, updateBreedFilter}) {
    return (
        <div className="navbar bg-primary shadow-sm z-2 sticky top-0 pr-4 lg:pr-8">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <h2>Filters</h2>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu  dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2">
                        <li>
                        <details className="rounded-box">
                            <summary>Breeds</summary>
                            <ul className="p-2 max-h-[50dvh] overflow-y-auto rounded-box shadow-xl">
                                {
                                    breeds.map((breed, index) => (
                                        <BreedItem key={index} breedObject={breed} breeds={breeds} updateBreedFilter={updateBreedFilter} />
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
                <ul className="menu menu-horizontal px-1 ">
                    <li>
                        <details>
                            <summary>Breeds</summary>
                            <ul className="p-2 max-h-[50dvh] overflow-y-auto shadow-xl">
                                {
                                    breeds.map((breed, index) => (
                                        <BreedItem key={index} breedObject={breed} breeds={breeds} updateBreedFilter={updateBreedFilter} />
                                    ))
                                }
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
            <div className="navbar-end">
                <a className="btn bg-neutral-content">Logout</a>
            </div>
        </div>
    )
}