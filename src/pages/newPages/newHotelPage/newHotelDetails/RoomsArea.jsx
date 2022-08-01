import useFetch from '../../../../components/hooks/useFetch';
import { API_URL } from '../../../../utils/config';
import '../newHotel.scss'

const RoomsArea = (props) => {

    const { data, loading } = useFetch(`${API_URL}/api/rooms`);

    return (
        <div className="selectRooms">
            <label>Rooms</label>
            <select id="rooms" multiple onChange={props.handleSelect}>
                {loading ? "loading" : data && data.map(room => (
                    <option
                        key={room._id}
                        value={room._id}
                    >
                        {room.title}
                    </option>
                ))}
            </select>
        </div>

    )
}

export default RoomsArea