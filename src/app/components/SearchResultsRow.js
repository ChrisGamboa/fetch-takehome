export default function SearchResultsRow({dog, selectedDogs, updateSelectedDogs}) {
    // update the selected dogs state in the SearchPage component.
    function handleDogSelection() {
        const dogId = dog.id;
        const isSelected = selectedDogs.includes(dogId);
        let newSelectedDogs;

        if (isSelected) {
            newSelectedDogs = (selectedDogs.filter(id => id !== dogId));
        } else {
            newSelectedDogs = ([...selectedDogs, dogId]);
        }

        // Update the selected dogs state in the parent component
        console.log("Selected dogs: ", newSelectedDogs);
        updateSelectedDogs(newSelectedDogs);
    }

    return (
        <tr className="hover:bg-base-300 md:text-md lg:text-lg font-medium">
            <td>
                <input onClick={handleDogSelection} type="checkbox" className="checkbox" />
            </td>
            <td>
                <img src={dog.img} alt="pic of dog" className="avatar rounded-full"/>
            </td>
            <td>
                {dog.name}
            </td>
            <td>
                {dog.breed}
            </td>
            <td>
                {dog.age}
            </td>
            <td>
                {dog.zip_code}
            </td>
        </tr>
    )
}