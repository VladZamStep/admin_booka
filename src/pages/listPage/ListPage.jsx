import Datatable from '../../components/datatable/Datatable'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import './listPage.scss'

const ListPage = ({ columns }) => {
    return (
        <div className='listPage'>
            <Navbar />
            <div className="listPageContainer">
                <Sidebar />
                <div className="dataWrapper">
                    <Datatable columns={columns} />
                </div>
            </div>
        </div>
    )
}

export default ListPage