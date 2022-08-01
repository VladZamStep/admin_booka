import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import EmailDatatable from './emailDatatable/EmailDatatable'
import './subscribedEmailsPage.scss'

const SubscribedEmailsPage = ({ columns }) => {
    return (
        <div className='listPage'>
            <Navbar />
            <div className="listPageContainer">
                <Sidebar />
                <div className="dataWrapper">
                    <EmailDatatable columns={columns} />
                </div>
            </div>
        </div>
    )
}

export default SubscribedEmailsPage