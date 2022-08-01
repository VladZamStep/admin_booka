import { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import { Box } from '@mui/material'
import useFetch from '../../../components/hooks/useFetch'
import './emailDatatable.scss'
import { API_URL } from '../../../utils/config'

const EmailDatatable = ({ columns }) => {

    const [filteredData, setFilteredData] = useState([]);

    const { data } = useFetch(`${API_URL}/api/subscribedEmails`)
    console.log(data)
    useEffect(() => {
        setFilteredData(data)
    }, [data])

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/api/subscribedEmails/${id}`)
            setFilteredData(filteredData.filter(item => item._id !== id))
        } catch (err) {
            console.log(err)
        }
    }

    const actionColumn = [{
        field: "action",
        headerName: "Action",
        width: 160,
        renderCell: (params) => {
            return (
                <div className='cellAction'>
                    <div className="deleteBtn"
                        onClick={() => handleDelete(params.row._id)}>Unsubcribe Email</div>
                </div>
            )
        }
    }]

    return (
        <div className='emailDatatable'>
            <div className="emailDatatableTitle">
                Subscribed Emails
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

export default EmailDatatable