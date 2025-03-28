
'use client'
import { useState } from "react";

// This function fetches the matched dog ID from the API
async function getMatched(dogs) {
    if (!dogs || dogs.length === 0) {
        console.warn('No dogs selected for matching.');
        return 'nodogs'
    }

    try {
        const dogMatch = await fetch('https://frontend-take-home-service.fetch.com/dogs/match',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include",
                body: JSON.stringify(dogs)
            }
        )

        if (!dogMatch.ok) {
            throw new Error(`Dog match error! status: ${dogMatch.status}`);
        }

        const dogMatchData = await dogMatch.json();
        console.log("Dog match data: ", dogMatchData);
        return dogMatchData;
    } catch (error) {
        console.error('Error fetching dog match:', error);
    }
}


// This function fetches the dog data for the matched dog
async function getMatchDogData({ match }) {
    if (!match || Object.keys(match).length === 0) {
        console.warn('No match data available.');
        return 'nomatch'
    }

    const matchId = match.match

    try {
        const dogData = await fetch('https://frontend-take-home-service.fetch.com/dogs',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include",
                body: JSON.stringify([matchId])
            }
        )

        if (!dogData.ok) {
            throw new Error(`Dog data error! status: ${dogData.status}`);
        }

        const dogDataResponse = await dogData.json();
        return dogDataResponse;
    } catch (error) {
        console.error('Error fetching matched dog data:', error);
    }
}

export default function MatchWithDogButton({ selectedDogs }) {
    const [matchedDog, setMatchedDog] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isNoDogsModalOpen, setIsNoDogsModalOpen] = useState(false);

    // Function to handle the button click to orchestrate fetch matched dog and its data
    async function handleClick() {
        const matchedDogId = await getMatched(selectedDogs);
        if (matchedDogId === 'nodogs') {
            setIsNoDogsModalOpen(true);
            return;
        }
        const matchedDogData = await getMatchDogData({ match: matchedDogId });
       
        // If API returns an array, take the first element
        const dog = Array.isArray(matchedDogData) ? matchedDogData[0] : matchedDogData;
        setMatchedDog(dog);
        setIsModalOpen(true);
    }

    function closeNoDogsModal() {
        setIsNoDogsModalOpen(false);
    }

    function closeMatchedDogModal() {
        setIsModalOpen(false);
    }


    return (
        <div className="m-2 md:m-4 lg:m-8">
            <button onClick={handleClick} className="btn btn-primary">Match with a dog</button>
            {/* No Dogs Modal */}
            {isNoDogsModalOpen && (
                <dialog open className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">{`Life's ruff...`}</h3>
                        <p className="py-4">You need to select at least one dog!</p>
                        <div className="modal-action">
                            <button onClick={closeNoDogsModal} className="btn btn-error">Close</button>
                        </div>
                    </div>
                </dialog>
            )}

            {/* Matched Dog Modal */}
            {isModalOpen && matchedDog && (
                <dialog open className="modal">
                    <div className="modal-box bg-primary text-center">
                        <h3 className="font-semibold text-lg text-primary-content">You matched with...</h3>
                        <h1 className="font-bold text-4xl text-center text-primary-content border-dotted p-4">{matchedDog.name}!</h1>
                        <img src={matchedDog.img} alt="pic of dog" className="avatar rounded-full p-4" />
                        <h3 className="py-4 font-semibold text-lg text-center text-primary-content">Age: {matchedDog.age}</h3>
                        <h3 className="py-4 font-semibold text-lg text-center text-primary-content">Breed: {matchedDog.breed}</h3>
                        <h3 className="py-4 font-semibold text-lg text-center text-primary-content">Location: {matchedDog.zip_code}</h3>
                        <div className="modal-action">
                            <button onClick={closeMatchedDogModal} className="btn btn-neutral-content">Close</button>
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    )
}