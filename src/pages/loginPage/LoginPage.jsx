import axios from 'axios'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../components/context/AuthContext'
import { API_URL } from '../../utils/config'
import './loginPage.scss'

const LoginPage = () => {

    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
    })

    const { loading, error, dispatch } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post(`${API_URL}/api/auth/login`, credentials, { withCredentials: true });
            if (res.data.isAdmin) {
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: res.data.details
                });
                navigate("/")
            }
            else {
                dispatch({
                    type: "LOGIN_FAILED",
                    payload: { message: "You are not allowed!" }
                })
            }
        } catch (err) {
            dispatch({
                type: "LOGIN_FAILED",
                payload: { message: "Wrong password or username!" },
            })
        }
    }

    return (
        <div className='loginPage'>
            <div className="loginContainer">
                <h1 className="bookaTitle">Booka_Admin</h1>
                <input
                    type="text"
                    id='username'
                    placeholder='username'
                    onChange={handleChange}
                />
                <input
                    type="password"
                    id='password'
                    placeholder='password'
                    onChange={handleChange}
                />
                <button disabled={loading} className="submitBtn" onClick={handleClick}>Login</button>
                {error && <span>{error.message}</span>}
            </div>
        </div>
    )
}

export default LoginPage