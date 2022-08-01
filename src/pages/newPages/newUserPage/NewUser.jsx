import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ImFolderUpload } from 'react-icons/im'
import Sidebar from '../../../components/sidebar/Sidebar'
import Navbar from '../../../components/navbar/Navbar'
import { userInputs } from '../../../formSource'
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'
import axios from 'axios'
import { API_URL } from '../../../utils/config'
import './newUser.scss'

const DEFAULT_NO_PHOTO = "https://i.pinimg.com/280x280_RS/2e/45/66/2e4566fd829bcf9eb11ccdb5f252b02f.jpg";

const NewUser = () => {

    const [file, setFile] = useState("");
    const [info, setInfo] = useState({});

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);

    const [formKey, setFormKey] = useState(1);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }))
    }

    const handleSend = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("file", file ? file : DEFAULT_NO_PHOTO);
        data.append("upload_preset", "uploadUsers");
        try {
            const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/zamnoise/image/upload", data)

            const { url } = uploadRes.data;
            const newUser = {
                ...info,
                img: url,
            };
            await axios.post(`${API_URL}/api/auth/register`, newUser);
            setOpenSuccess(true);
            setTimeout(() => {
                setOpenSuccess(false);
                setFormKey(formKey + 1);
                setFile("");
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
    console.log(info)
    return (
        <div className='newUserPage'>
            <Navbar />
            <div className="newUserPageContainer">
                <Sidebar />
                <div className="newUserPageWrapper">
                    <div className="top">
                        <h1 className="addNew">Add new user</h1>
                    </div>
                    <div className="bottom">
                        <div className="left">
                            <img
                                src={file
                                    ? URL.createObjectURL(file)
                                    : DEFAULT_NO_PHOTO}
                                alt=""
                            />
                            <form key={formKey}>
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
                            <form key={formKey}>
                                {userInputs.map((input) => (
                                    <div className="formInput" key={input.id}>
                                        <label>{input.label}</label>
                                        <input
                                            onChange={handleChange}
                                            type={input.type}
                                            placeholder={input.placeholder}
                                            id={input.id}
                                        />
                                    </div>
                                ))}
                            </form>
                        </div>
                        {openSuccess &&
                            <div className="messageContainer">
                                <div className="messageWrapper">
                                    <AiOutlineCheck className="messageTick" />
                                    <span className="messageInfo">
                                        You can add another user.
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
                        <button className="sendBtn" onClick={() => navigate("/users")}>Back</button>
                        <button className="sendBtn" onClick={handleSend}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewUser