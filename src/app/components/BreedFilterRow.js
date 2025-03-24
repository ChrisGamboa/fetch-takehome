export function BreedFilterRow({breed}) {
    return (
        <tr className="hover:bg-base-300">
            <td>
                <input type="checkbox" className="checkbox" id={breed.breedName} name={breed.breedName} value={breed.checked} />
            </td>
            <td>
                <label className="" htmlFor={breed.breedName}>{breed.breedName}</label>
            </td>
        </tr>
    )
}