"use client"

import SearchBar from "@/components/SearchBar";
import Image from "next/image";
import dogPic from "./dog.jpg"
import SearchResultsTable from "@/components/SearchResultsTable";
import { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import MatchWithDogButton from "@/components/MatchWithDogButton";


const heroText = "Let's find you the purrrfect friend!"

// get list of breeds from the API and return list of breed objects with a checked property
async function fetchBreeds() {
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

    return breedsConstructor;
}

function sortBy(filter, order) {
    return `sort${filter}:${order}`;
}

// fetch dog ids from the api that match filters, by default fetches all dogs and sorts in asc order by breed
async function fetchDogIdsResponse(destination) {
    let searchUrl;
    if (destination) {
        // uses destination param to create url, which is endpoint with filters, pagination, and sorting args
        searchUrl = `https://frontend-take-home-service.fetch.com${destination}`
    } else {
        // default logic with no filters
        searchUrl = `https://frontend-take-home-service.fetch.com/dogs/search?&sort=breed:asc`;
    }

    // fetches dog ids from the api using the built url
    const searchResponse = await fetch(searchUrl, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include"
    });

    if (!searchResponse.ok) {
        throw new Error(`Search error! status: ${searchResponse.status}`);
    }

    const searchData = await searchResponse.json();

    // The GET returns { resultIds, total, next, prev }
    return searchData
}

export default function SearchPage() {
    const [dogIdsResponse, setDogIdsResponse] = useState({});
    const [breeds, setBreeds] = useState([]);
    const [selectedDogs, setSelectedDogs] = useState([]);

    // function to handle backwards pagination
    async function goPrev() {
        const newResponse = await fetchDogIdsResponse(dogIdsResponse.prev);
        setDogIdsResponse(newResponse);
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    // function to handle forwards pagination
    async function goNext() {
        const newResponse = await fetchDogIdsResponse(dogIdsResponse.next);
        setDogIdsResponse(newResponse);
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    // callback function for child components to update breed filter state
    async function updateBreedFilter(newBreedsData) {
        setBreeds(newBreedsData);
    }
    // callback function for child components to update list of selected dogs
    async function updateSelectedDogs(newSelectedDogs) {
        setSelectedDogs(newSelectedDogs);
    }

    // fetches dog ids and breeds on component mount
    useEffect(() => {
        const getDogIds = async () => {
            const fetchedDogIdsResponse = await fetchDogIdsResponse();
            setDogIdsResponse(fetchedDogIdsResponse)
        }

        const getBreeds = async () => {
            const breeds = await fetchBreeds();
            setBreeds(breeds);
        }

        // Fetch breeds list on component mount
        getBreeds();

        // Fetch dog IDs based on filterss parameters
        getDogIds();
    }, [])

    return (
        <div className="flex flex-rows min-h-dvh max-h-[calc(100%*2)] w-dvw">
            <div className="flex flex-col flex-1 items-center max-w-fit">
                <div className="sticky top-0 z-2 w-dvw">

                    <NavBar breeds={breeds} updateBreedFilter={updateBreedFilter} />
                </div>
                {/* Hero section */}
                <div className="">
                    <div className="m-4">
                        <Image src={dogPic}
                            className="rounded-full m-2 md:m-4 lg:m-8"
                            alt="dog picture"
                            sizes="w-xs h-xs"
                            style={{
                                width: 'auto',
                                height: '20dvh'
                            }}></Image>
                    </div>

                </div>

                <h1 className='text-sm m-4 md:text-lg lg:text-2xl lg:m-8 font-bold text-center'>
                    {heroText}
                </h1>
                {/* Button to match dog based on selected dogs */}
                <MatchWithDogButton selectedDogs={selectedDogs} />
                {/* Table with search results */}
                <div className="flex-1-1 overflow-x-visible w-dvw lg:w-[75%] text-xl ptb-4">
                    <SearchResultsTable selectedDogs={selectedDogs} updateSelectedDogs={updateSelectedDogs} dogIds={dogIdsResponse.resultIds} />
                </div>
                {/* Pagination buttons */}
                <div className="join m-auto p-4 md:p-4">
                    <button onClick={goPrev} className="join-item btn" disabled={!dogIdsResponse.prev} >« Previous</button>
                    <button onClick={goNext} className="join-item btn" disabled={!dogIdsResponse.next}>Next »</button>
                </div>
            </div>
        </div>

    )
}