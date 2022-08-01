import { useLocation, useNavigate } from 'react-router-dom'
import useFetch from '../../components/hooks/useFetch'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { API_URL } from '../../utils/config'
import './singleHotelPage.scss'

const SingleHotelPage = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const id = location.pathname.split("/")[2]
    const { data } = useFetch(`${API_URL}/api/hotels/find/${id}`)

    const handleClick = () => {
        navigate("/hotels")
    }

    return (
        <div className='singleHotelPage'>
            <Navbar />
            <div className="singleHotelPageContainer">
                <Sidebar />
                <div className="singleHotelPageWrapper">
                    <div className="singleHotelItems">
                        <h1 className="infoTitle">Information</h1>
                        <div className="item">
                            <div className="photosInfo">
                                {data.photos?.map((photo, index) => (
                                    <img
                                        key={index}
                                        src={photo}
                                        alt=""
                                        className='itemImg'
                                    />
                                ))}
                            </div>
                            <div className="details">
                                <h1 className="itemTitle">{data.name}</h1>
                                <div className="delailItem">
                                    <span className="itemKey">City:</span>
                                    <span className="itemValue">{data.city}</span>
                                </div>
                                <div className="delailItem">
                                    <span className="itemKey">Type:</span>
                                    <span className="itemValue">{data.type}</span>
                                </div>
                                <div className="delailItem">
                                    <span className="itemKey">Address:</span>
                                    <span className="itemValue">{data.address}</span>
                                </div>
                                <div className="delailItem">
                                    <span className="itemKey">Title:</span>
                                    <span className="itemValue">{data.title}</span>
                                </div>
                                <div className="delailItem">
                                    <span className="itemKey">Distance from center:</span>
                                    <span className="itemValue">{data.distance} m</span>
                                </div>
                                <div className="delailItem">
                                    <span className="itemKey">Short description:</span>
                                    <span className="itemValue">{data.shortDescription} m</span>
                                </div>
                                <div className="delailItem">
                                    <span className="itemKey">Rating:</span>
                                    <span className="itemValue">{data.textRating}, </span>
                                    <span className="itemValue">{data.rating}</span>
                                </div>
                                <div className="delailItem">
                                    <span className="itemKey">Price:</span>
                                    <span className="itemValue">{data.cheapestPrice} $</span>
                                </div>
                                <div className="delailItem">
                                    <span className="itemKey">Description:</span>
                                    <span className="itemValue">{data.description}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button onClick={handleClick} className="sendBtn">Back</button>
                </div>
            </div>
        </ div>
    )
}

export default SingleHotelPage