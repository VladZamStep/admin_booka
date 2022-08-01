import { useLocation, useNavigate } from 'react-router-dom'
import useFetch from '../../components/hooks/useFetch'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { Link } from 'react-router-dom'
import { API_URL } from '../../utils/config'
import './singleUserPage.scss'

const SingleUserPage = () => {
    const DEFAULT_NO_PHOTO = "https://i.pinimg.com/280x280_RS/2e/45/66/2e4566fd829bcf9eb11ccdb5f252b02f.jpg";
    const NO_INFO = "no information";

    const location = useLocation();
    const navigate = useNavigate();

    const id = location.pathname.split("/")[2]
    const { data } = useFetch(`${API_URL}/api/users/${id}`)

    const handleClick = () => {
        navigate("/users")
    }

    return (
        <div className='singleUserPage'>
            <Navbar />
            <div className="singleUserPageContainer">
                <Sidebar />
                <div className="singleUserPageWrapper">
                    <div className="singleUserItems">
                        <h1 className="infoTitle">Information</h1>
                        <Link to={`/users/${id}/updateUser`}>
                            <button className="editBtn">Edit</button>
                        </Link>
                        <div className="item">
                            <div className="photosInfo">
                                <img src={data.img || DEFAULT_NO_PHOTO}
                                    alt=""
                                    className='itemImg'
                                />
                            </div>
                            <div className="details">
                                <h1 className="itemTitle">{data.username}</h1>
                                <div className="delailItem">
                                    <span className="itemKey">Email:</span>
                                    <span className="itemValue">{data.email}</span>
                                </div>
                                <div className="delailItem">
                                    <span className="itemKey">Phone:</span>
                                    <span className="itemValue">{data.phone || NO_INFO}</span>
                                </div>
                                <div className="delailItem">
                                    <span className="itemKey">Country:</span>
                                    <span className="itemValue">{data.country || NO_INFO}</span>
                                </div>
                                <div className="delailItem">
                                    <span className="itemKey">City:</span>
                                    <span className="itemValue">{data.city || NO_INFO}</span>
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

export default SingleUserPage