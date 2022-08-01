import { useLocation, useNavigate } from 'react-router-dom'
import useFetch from '../../components/hooks/useFetch'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { API_URL } from '../../utils/config'
import './singleRoomPage.scss'

const SingleRoomPage = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const id = location.pathname.split("/")[2]
    const { data } = useFetch(`${API_URL}/api/rooms/${id}`)

    const handleClick = () => {
        navigate("/rooms")
    }

    return (
        <div className='singleRoomPage'>
            <Navbar />
            <div className="singleRoomPageContainer">
                <Sidebar />
                <div className="singleRoomPageWrapper">
                    <div className="singleRoomItems">
                        <h1 className="infoTitle">Information</h1>
                        <div className="details">
                            <h1 className="itemTitle">{data.title}</h1>
                            <div className="delailItem">
                                <span className="itemKey">Description:</span>
                                <span className="itemValue">{data.description}</span>
                            </div>
                            <div className="delailItem">
                                <span className="itemKey">Price:</span>
                                <span className="itemValue">{data.price} $</span>
                            </div>
                            <div className="delailItem">
                                <span className="itemKey">Max People:</span>
                                <span className="itemValue">{data.maxPeople}</span>
                            </div>
                            <div className="delailItem">
                                <span className="itemKey">Room numbers:</span>
                                {data.roomNumbers?.map((roomNumber) => (
                                    <span className="itemValue roomNumberSpacing"
                                        key={roomNumber._id}>
                                        {roomNumber.number}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <button onClick={handleClick} className="sendBtn">Back</button>
                </div>
            </div>
        </ div>
    )
}

export default SingleRoomPage