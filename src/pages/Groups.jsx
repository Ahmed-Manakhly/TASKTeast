import { Box,Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { mockDataContacts } from "../testData/mockData";
import Header from '../components/UI/Header' ;
import { useTheme } from "@mui/material";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
//----------------------

const Groups = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  //----------------------------------------
  const columns = [
    {field: "id", headerName: "ID", flex: 0.5 },
    {field: "registrarId", headerName: "Registrar ID"},
    {field: "name", headerName: "Name",flex: 1,cellClassName: "name-column--cell",},
    {field: "age",headerName: "Age",type: "number",headerAlign: "left", align: "left" },
    {field: "phone",headerName: "Phone Number",flex: 1},
    {field: "email",headerName: "Email",flex: 1},
    {field: "address", headerName: "Address",flex: 1},
    {field: "city",headerName: "City", flex: 1},
    { field: "zipCode", headerName: "Zip Code", flex: 1}
  ];
  //----------------------------------------
  return (
    
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Groups" subtitle="Manage your Team Groups"/>
        <Box>
          <Button sx={{ boxShadow: `-1px 5px 20px -3px ${colors.grey[400]}`,borderRadius : '10px',backgroundColor: '#ff822e',
            color: '#fff',fontSize: "14px",fontWeight: "bold",padding: "10px 20px",
            '&:hover':{color: `${theme.palette.mode === 'dark'?'#ff9a57 !important':'#ab4400 !important'}`,
            border: `solid 1px ${theme.palette.mode === 'dark'?'#ff9a57 !important':'#ab4400 !important'}`}}}><PersonAddAltIcon sx={{ mr: "10px" }} />
            Add Group
          </Button>
        </Box>
      </Box>
      <Box m="40px 0 0 0" width="98%" sx={{
          "& .MuiDataGrid-root": {border: "none"},
          "& .MuiDataGrid-cell": {borderBottom: "none"},
          "& .name-column--cell": {color: '#FF770D' ,fontWeight :"bold"},
          "& .MuiDataGrid-columnHeaders": {backgroundColor: colors.primary[800],borderBottom: "none"},
          "& .MuiDataGrid-virtualScroller": {backgroundColor: colors.primary[400]},
          "& .MuiDataGrid-footerContainer": {borderTop: "none",backgroundColor: colors.primary[800]},
          "& .MuiCheckbox-root": {color: '#FF770D !important',fontWeight :"bold"},
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {color: `${colors.grey[100]} !important`,}}}>
        <DataGrid rows={mockDataContacts} columns={columns} components={{ Toolbar: GridToolbar }} />
      </Box>
    </Box>
  );
};

export default Groups;
