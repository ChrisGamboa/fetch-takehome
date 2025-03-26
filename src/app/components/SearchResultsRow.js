export default function SearchResultsRow({dog}) {
    return (
        <tr className="hover:bg-base-300">
            <td>
                <input type="checkbox" className="checkbox" />
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