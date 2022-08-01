import '../newHotel.scss'

const TypeArea = (props) => {

    return (
        <div className="selectOption">
            <label>Type</label>
            <select id="type" onChange={props.handleChange}>
                <option value="hotels">Hotel</option>
                <option value="apartments">Apartment</option>
                <option value="resorts">Resort</option>
                <option value="villas">Villa</option>
                <option value="motels">Motel</option>
                <option value="hostels">Hostel</option>
            </select>
        </div>

    )
}

export default TypeArea