import { Box } from "@mui/material";
import { mockDataContacts } from "../testData/mockData";
import Header from '../components/UI/Header' ;
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import PageButton from '../components/UI/PageButton'
import PageTable from '../components/UI/PageTable'

//----------------------

const Groups = () => {
  //---------------------------------------- columns
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
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Groups" subtitle="Manage your Team Groups"/>
        <PageButton btnIcon={<PersonAddAltIcon sx={{ mr: "10px" }} />} title='Add Group' action={()=>{console.log('action')}}/>
      </Box>
      <PageTable data={mockDataContacts} columns={columns}/>
    </Box>
  );
};

export default Groups;
