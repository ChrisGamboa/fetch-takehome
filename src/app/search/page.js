import { BreedFiltersMenu } from "@/components/BreedFiltersMenu";

export default function SearchPage() {
    return (
        <div className="flex flex-row">
            <div className="col-span-1 overflow-x-auto h-dvh rounded-box border border-base-content/5 bg-base-100 w-xs sm:w-sm md:w-fit lg:m-4 ">
                <BreedFiltersMenu />
            </div>
            <div className="flex flex-row w-sm md:w-md lg:w-fit md:m-2 lg:m-4">
                <h1 className='text-3xl'>You made it to the search page!You made it to the search page!You made it to the search page!You made it to the search page!You made it to the search page!</h1>
            </div>
        </div>

    )
}