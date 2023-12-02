/* eslint-disable react/prop-types */
import PageTable from '../UI/PageTable' ;

//---------------------------------

function BranchsTable({data,searchedVal , columns}) {
    let filteredRows = data;

    if (searchedVal) {
        filteredRows = filteredRows.filter(row => {
                if(row.name){
                    return row?.name.toLowerCase().includes(searchedVal.toLowerCase()) ||
                    row?.code.toLowerCase().includes(searchedVal.toLowerCase()) 
                }
        })
    }
    //------------------------------------------------
    return (
        <PageTable data={filteredRows} columns={columns} />
    )
}

export default BranchsTable ;