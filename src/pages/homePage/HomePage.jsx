import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import './homePage.scss'

const TITLE = "Welcome to Administration Booka.com Page!";
const WELCOME_INFO_1 = "This is the place where you can see, make changes and update users, hotels and rooms.";
const WELCOME_INFO_2 = "Database used in this project is for educational purposes only.";
const WELCOME_INFO_3 = "Let’s get started!";

const HomePage = () => {
    return (
        <div className='homePage'>
            <Navbar />
            <div className="homeContainer">
                <Sidebar />
                <div className="welcome">
                    <h1 className="welcomeTitle">{TITLE}</h1>
                    <p className="welcomeInfo">{WELCOME_INFO_1}</p>
                    <p className="welcomeInfo">{WELCOME_INFO_2}</p>
                    <p className="welcomeInfo">{WELCOME_INFO_3}</p>
                </div>

            </div>
        </div>
    )
}

export default HomePage