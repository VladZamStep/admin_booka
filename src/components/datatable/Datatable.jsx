import { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Link, useLocation } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import axios from 'axios'
import { Box } from '@mui/material'
import { API_URL } from '../../utils/config'
import './datatable.scss'

const Datatable = ({ columns }) => {

    const location = useLocation();
    const path = location.pathname.split("/")[1];
    const [filteredData, setFilteredData] = useState([]);

    const { data } = useFetch(`${API_URL}/api/${path}`)
    useEffect(() => {
        setFilteredData(data)
    }, [data])

    const handleDelete = async (id) => {

        try {
            await axios.delete(`${API_URL}/api/${path}/${id}`)
            setFilteredData(filteredData.filter(item => item._id !== id))
        } catch (err) {
        }
    }

    const actionColumn = [{
        field: "action",
        headerName: "Action",
        width: 150,
        renderCell: (params) => {
            return (
                <div className='cellAction'>
                    <Link to={`/${path}/${params.row._id}`}>
                        <div className="viewBtn">View</div>
                    </Link>
                    <div className="deleteBtn"
                        onClick={() => handleDelete(params.row._id)}>Delete</div>
                </div>
            )
        }
    }]

    return (
        <div className='datatable'>
            <div className="datatableTitle">
                {path}
                <Link to={`/${path}/new`} className='link'>
                    Add New
                </Link>
            </div>
            <Box sx={{ height: '90%', width: '100%' }}>
                <DataGrid
                    className="dataGrid"
                    rows={filteredData}
                    columns={columns.concat(actionColumn)}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    checkboxSelection
                    getRowId={row => row._id}
                />
            </Box>
        </div>
    )
}

export default Datatable