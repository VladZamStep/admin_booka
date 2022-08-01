import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ImFolderUpload } from 'react-icons/im'
import { AiOutlineCheck } from 'react-icons/ai'
import axios from 'axios'
import Sidebar from '../../../components/sidebar/Sidebar'
import Navbar from '../../../components/navbar/Navbar'
import useFetch from '../../../components/hooks/useFetch'
import { API_URL } from '../../../utils/config'
import './updateUserPage.scss'

const UpdateUserPage = () => {

    const location = useLocation();
    const id = location.pathname.split("/")[2]
    const { data } = useFetch(`${API_URL}/api/users/${id}`)
    const navigate = useNavigate();

    const [file, setFile] = useState("");
    const [newUsername, setNewUsername] = useState({});
    const [newEmail, setNewEmail] = useState({});
    const [newPhone, setNewPhone] = useState({});
    const [newCountry, setNewCountry] = useState({});
    const [newCity, setNewCity] = useState({});

    const [openSuccess, setOpenSuccess] = useState(false);

    useEffect(() => {
        setNewUsername(data.username)
    }, [data.username])

    useEffect(() => {
        setNewEmail(data.email)
    }, [data.email])

    useEffect(() => {
        setNewPhone(data.phone)
    }, [data.phone])

    useEffect(() => {
        setNewCountry(data.country)
    }, [data.country])

    useEffect(() => {
        setNewCity(data.city)
    }, [data.city])

    const prevImageData = data.img;

    const handleUpdate = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("file", file ? file : prevImageData);
        data.append("upload_preset", "uploadZam");
        try {
            const uploadRes = await axios.put("https://api.cloudinary.com/v1_1/zamnoise/image/upload", data)
            const { url } = uploadRes.data;
            const updatedUser = {
                username: newUsername,
                email: newEmail,
                phone: newPhone,
                country: newCountry,
                city: newCity,
                img: url,
            };
            await axios.put(`${API_URL}/api/users/${id}`, updatedUser);
            setOpenSuccess(true)
            setTimeout(() => {
                setOpenSuccess(false)
            }, 2000);
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='updateUserPage'>
            <Navbar />
            <div className="updateUserPageContainer">
                <Sidebar />
                <div className="updateUserPageWrapper">
                    <div className="top">
                        <h1 className="addNew">Edit User Information</h1>
                    </div>
                    <div className="bottom">
                        <div className="left">
                            <img
                                src={file
                                    ? URL.createObjectURL(file)
                                    : data.img}
                                alt=""
                            />
                            <form>
                                <div className="formInput">
                                    <label htmlFor='file'>
                                        Image: <ImFolderUpload className="icon" />
                                    </label>
                                    <input
                                        type="file"
                                        id='file'
                                        onChange={e => setFile(e.target.files[0])}
                                        style={{ display: "none" }} />
                                </div>
                            </form>
                        </div>
                        <div className="right">
                            <form>
                                <div className="formInput">
                                    <label>Username</label>
                                    <input
                                        onChange={(e) => setNewUsername(e.target.value)}
                                        type="text"
                                        id="username"
                                        value={newUsername}
                                    />
                                </div>
                                <div className="formInput">
                                    <label>Email</label>
                                    <input
                                        onChange={(e) => setNewEmail(e.target.value)}
                                        type="email"
                                        id="email"
                                        value={newEmail}
                                    />
                                </div>
                                <div className="formInput">
                                    <label>Phone</label>
                                    <input
                                        onChange={(e) => setNewPhone(e.target.value)}
                                        type="text"
                                        id="phone"
                                        value={newPhone}
                                    />
                                </div>
                                <div className="formInput">
                                    <label>Country</label>
                                    <input
                                        onChange={(e) => setNewCountry(e.target.value)}
                                        type="text"
                                        id="country"
                                        value={newCountry}
                                    />
                                </div>
                                <div className="formInput">
                                    <label>City</label>
                                    <input
                                        onChange={(e) => setNewCity(e.target.value)}
                                        type="text"
                                        id="city"
                                        value={newCity}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="btns">
                        <button className="sendBtn" onClick={() => navigate(`/users/${id}`)}>Back</button>
                        <button className="sendBtn" onClick={handleUpdate}>Update</button>
                    </div>
                    {openSuccess &&
                        <div className="successContainer">
                            <div className="successWrapper">
                                <AiOutlineCheck className="successTick" />
                                <span className="successInfo">
                                    You can change more or go back.
                                </span>
                            </div>
                        </div>}
                </div>
            </div>
        </div>
    )
}

export default UpdateUserPage;