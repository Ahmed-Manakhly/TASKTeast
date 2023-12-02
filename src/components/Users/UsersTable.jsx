/* eslint-disable react/prop-types */
import PageTable from '../UI/PageTable' ;

//---------------------------------

function UsersTable({data,searchedVal , columns}) {
    let filteredRows = data;

    if (searchedVal) {
        filteredRows = filteredRows.filter(row => {
            if (row.userName && row.email) {
                return row.userName.toLowerCase().includes(searchedVal.toLowerCase()) ||
                    row.email.toLowerCase().includes(searchedVal.toLowerCase()) ||
                    row.displayName.toLowerCase().includes(searchedVal.toLowerCase()) ||
                    row.phoneNumber.toLowerCase().includes(searchedVal.toLowerCase())
            }
            else
                return row.name.toLowerCase().includes(searchedVal.toLowerCase())
        })
    }

    //------------------------------------------------
    return (
        <PageTable data={filteredRows} columns={columns} />
    )
}

export default UsersTable ;