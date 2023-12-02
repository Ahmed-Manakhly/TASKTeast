/* eslint-disable react/prop-types */
import { Box ,useTheme} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import {useState }from 'react' ;

//---------------------------------

function PageTable({data,columns}) {
    const [pageSize, setPageSize] = useState(5);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    //-----------------------------------
    return (
        <Box m="40px 0 0 0" width="98%" sx={{
            "& .MuiDataGrid-root": {border: "none"},
            "& .MuiDataGrid-cell": {borderBottom: "none"},
            "& .name-column--cell": {color: '#FF770D' ,fontWeight :"bold"},
            "& .MuiDataGrid-columnHeaders": {backgroundColor: colors.primary[800],borderBottom: "none"},
            "& .MuiDataGrid-virtualScroller": {backgroundColor: colors.primary[400]},
            "& .MuiDataGrid-footerContainer": {borderTop: "none",backgroundColor: colors.primary[800]},
            "& .MuiCheckbox-root": {color: '#FF770D !important',fontWeight :"bold"},
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {color: `${colors.grey[100]} !important`,}}}>
            <DataGrid rows={data} columns={columns} components={{ Toolbar: GridToolbar }} getRowId={row=>row.id} 
                pageSize={pageSize}
                onPageSizeChange={(n)=>setPageSize(n)}
                rowsPerPageOptions={[10, 20, 30]}
                pagination/>
        </Box>
    )
}

export default PageTable ;