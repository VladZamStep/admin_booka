import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useFetch from '../../../components/hooks/useFetch'
import axios from 'axios'
import Sidebar from '../../../components/sidebar/Sidebar'
import Navbar from '../../../components/navbar/Navbar'
import { roomInputs } from '../../../formSource'
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'
import { API_URL } from '../../../utils/config'
import './newRoom.scss'

const NewRoom = () => {

    const [info, setInfo] = useState({});
    const [hotelId, setHotelId] = useState(undefined);
    const [rooms, setRooms] = useState([]);

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);

    const [formKey, setFormKey] = useState(1);

    const navigate = useNavigate();

    const { data, loading } = useFetch(`${API_URL}/api/hotels`);

    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }))
    }

    const handleSend = async (e) => {
        e.preventDefault();
        const roomNumbers = rooms?.split(",").map((room) => ({ number: room }));
        try {
            await axios.post(`${API_URL}/api/rooms/${hotelId}`, { ...info, roomNumbers })
            setOpenSuccess(true);
            setTimeout(() => {
                setOpenSuccess(false);
                setFormKey(formKey + 1);
                setHotelId(undefined);
                setRooms("");
                setInfo("");
            }, 2000)
        } catch (err) {
            console.log(err)
            setOpenError(true);
            setTimeout(() => {
                setOpenError(false);
            }, 2000)
        }
    }

    return (
        <div className='newRoomPage'>
            <Navbar />
            <div className="newRoomPageContainer">
                <Sidebar />
                <div className="newRoomPageWrapper">
                    <div className="top">
                        <h1 className="addNew">Add new room</h1>
                    </div>
                    <div className="bottom">
                        <div className="bottomWrapper">
                            <form key={formKey}>
                                {roomInputs.map((input) => (
                                    <div className="formInput" key={input.id}>
                                        <label>{input.label}</label>
                                        <input
                                            id={input.id}
                                            type={input.type}
                                            placeholder={input.placeholder}
                                            onChange={handleChange}
                                        />
                                    </div>
                                ))}
                                <div className="roomsArea">
                                    <label>Rooms</label>
                                    <textarea
                                        rows="1"
                                        placeholder='101, 102, 103'
                                        onChange={(e) => setRooms(e.target.value)}
                                    />
                                </div>
                                <div className="selectOption">
                                    <label>Choose a hotel</label>
                                    <select id="hotelId" onChange={(e) => setHotelId(e.target.value)}>
                                        {loading ? "loading" : data && data.map(hotel => (
                                            <option
                                                key={hotel._id}
                                                value={hotel._id}
                                            >
                                                {hotel.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </form>
                        </div>
                        {openSuccess &&
                            <div className="messageContainer">
                                <div className="messageWrapper">
                                    <AiOutlineCheck className="messageTick" />
                                    <span className="messageInfo">
                                        You can add another room.
                                    </span>
                                </div>
                            </div>}
                        {openError &&
                            <div className="messageContainer">
                                <div className="messageWrapper">
                                    <AiOutlineClose className="messageTick" />
                                    <span className="messageInfo">
                                        Change the description according to the example.
                                    </span>
                                </div>
                            </div>}
                    </div>
                    <div className="btns">
                        <button className="sendBtn" onClick={() => navigate("/rooms")}>Back</button>
                        <button className="sendBtn" onClick={handleSend}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewRoom