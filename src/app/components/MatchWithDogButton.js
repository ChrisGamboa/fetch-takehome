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

export default function MatchWithDogButton({ selectedDogs }) {
    async function handleClick() {
        const matchedDog = await getMatched(selectedDogs);
        if (matchedDog === 'nodogs') {
            const modal = document.getElementById("my_modal_1");
            modal.showModal();
            return;
        }
        console.log("Matched dog: ", matchedDog);
    }

    return (
        <div className="m-2 md:m-4 lg:m-8">
            <button onClick={handleClick} className="btn btn-primary">Match with a dog</button>
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Life's ruff...</h3>
                    <p className="py-4">You need to select least one dog!</p>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-error">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}