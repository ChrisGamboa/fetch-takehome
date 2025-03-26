"use client"

import { BreedFiltersMenu } from "@/components/BreedFiltersMenu";
import SearchBar from "@/components/SearchBar";
import Image from "next/image";
import dogPic from "./dog.jpg"
import SearchResultsTable from "@/components/SearchResultsTable";
import PaginationBar from "@/components/PaginationBar";
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
        <div className="flex flex-row min-h-screen max-h-screen">
            <div className="col-span-1 overflow-x-auto h-dvh rounded-box border border-base-content/5 bg-base-100 w-xs sm:w-sm md:w-fit lg:m-4">
                <BreedFiltersMenu />
            </div>
            <div className="flex flex-col w-xs md:w-full md:m-2 lg:m-4 items-center">
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
                <SearchBar className="" />
                <div className="flex-1 w-fit mt-4">
                    <table className="table table-pin-rows">
                        <thead className="stick top-0">
                            <tr className="">
                                <th>Select</th>
                                <th className="w-24s">Image</th>
                                <th>Name</th>
                                <th>Breed</th>
                                <th>Age</th>
                                <th>Zip Code</th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div className="overflow-y-auto w-auto m-4">
                    <SearchResultsTable dogIds={dogIdsResponse.resultIds} />
                </div>
                <div className="join">
                    <button onClick={goPrev} className="join-item btn" disabled={!dogIdsResponse.prev} >« Previous</button>
                    <button onClick={goNext} className="join-item btn" disabled={!dogIdsResponse.next}>Next »</button>
                </div>
            </div>
        </div>

    )
}