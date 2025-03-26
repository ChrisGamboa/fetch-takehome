"use client"

import SearchBar from "@/components/SearchBar";
import Image from "next/image";
import dogPic from "./dog.jpg"
import SearchResultsTable from "@/components/SearchResultsTable";
import { useState, useEffect } from "react";


const heroText = "Let's find you the purrrfect friend!"



export default function SearchPage() {
    const [searchParams, setSearchParams] = useState();
    const [dogIdsResponse, setDogIdsResponse] = useState({});

    async function goPrev() {
        await fetchDogIdsResponse(dogIdsResponse.prev)
    }

    async function goNext() {
        await fetchDogIdsResponse(dogIdsResponse.next)
    }

    // Helper function to build query string for the search endpoint.
    function buildQueryString(params) {
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


    async function fetchDogIdsResponse(destination) {
        let searchUrl;
        if (destination) {
            searchUrl = `https://frontend-take-home-service.fetch.com${destination}`
        } else {
            // Build the URL with query parameters for the GET request.
            const queryString = buildQueryString(searchParams);
            searchUrl = `https://frontend-take-home-service.fetch.com/dogs/search?${queryString}`;
        }

        const searchResponse = await fetch(searchUrl, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        });

        if (!searchResponse.ok) {
            throw new Error(`Search error! status: ${searchResponse.status}`);
        }
        const searchData = await searchResponse.json();
        setDogIdsResponse(searchData); // The GET returns { resultIds, total, next, prev }
    }

    useEffect(() => {
        const getDogIds = async () => {
            await fetchDogIdsResponse();
            //setDogIdsResponse(response)
        }
        getDogIds();
    }, [searchParams])

    return (
        <div className="flex flex-row min-h-screen max-h-dvh">
            <div className="flex flex-col flex-1 w-xs md:w-full lg:m-4 items-center">
                {/* Hero section */}
                <div className="">
                    <div className="">
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

                <h1 className='text-sm m-2 md:text-lg lg:text-2xl lg:mb-8 font-bold text-center'>
                    {heroText}
                </h1>
                <div className="m-2 md:m-4 lg:m-8">
                    <SearchBar />
                </div>
                <div className="flex-1-1 overflow-y-auto overflow-x-auto lg:w-[75%] text-xl">
                    <SearchResultsTable dogIds={dogIdsResponse.resultIds} />
                </div>
                <div className="join mt-2">
                    <button onClick={goPrev} className="join-item btn" disabled={!dogIdsResponse.prev} >« Previous</button>
                    <button onClick={goNext} className="join-item btn" disabled={!dogIdsResponse.next}>Next »</button>
                </div>
            </div>
        </div>

    )
}