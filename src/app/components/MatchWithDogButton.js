async function getMatched(dogs) {
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

        if(!dogMatch.ok) {
            throw new Error(`Dog match error! status: ${dogMatch.status}`);
        }

        const dogMatchData = await dogMatch.json();
        console.log("Dog match data: ", dogMatchData);
        return dogMatchData;
    } catch (error) {
        console.error('Error fetching dog match:', error);
    }
}

export default function MatchWithDogButton({ selectedDogs }) {
    async function handleClick() {
        const matchedDog = await getMatched(selectedDogs);
        console.log("Matched dog: ", matchedDog);
    }

    return (
        <div className="m-2 md:m-4 lg:m-8">
            <button onClick={handleClick} className="btn btn-primary">Match with a dog</button>
        </div>
    )
}