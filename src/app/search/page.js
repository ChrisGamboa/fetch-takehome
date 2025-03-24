"use client"

import { BreedFiltersMenu } from "@/components/BreedFiltersMenu";
import SearchBar from "@/components/SearchBar";
import Image from "next/image";
import dogPic from "./dog.jpg"
import SearchResultsTable from "@/components/SearchResultsTable";

const heroText = "Let's find you the purrrfect friend!"

export default function SearchPage() {
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
                <div className="flex-1 overflow-y-auto md:m-4 rounded-box">
                    <SearchResultsTable />
                </div>
            </div>
        </div>

    )
}