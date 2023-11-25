import { Box, Typography, useTheme , Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { mockDataTeam } from "../testData/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import Header from '../components/UI/Header' ;
import {useState} from 'react';
//---------------------------------------test
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {Link} from 'react-router-dom';
import GroupIcon from '@mui/icons-material/Group';
import PasswordIcon from '@mui/icons-material/Password';
import {Switch} from '@mui/material';

//---------------------------

const Users = () => {
  //------------ test
  const [deleteId, setDeleteId] = useState(-1);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  //------------------
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    {field: "id", headerName: "ID" ,flex: 0.5},
    {field: "user",headerName: "User", flex: 1,cellClassName: "name-column--cell"},
    {field: "email",headerName: "Email",flex: 1},
    {field: "phone",headerName: "Phone Number",flex: 1},
    {field: "active",headerName: "Active",
    renderCell: (params) => {
      return (
          <div>
              {(params.row.isActive) && (<Switch defaultChecked onChange={(e) => activeUser(e, params.row)}/>)}
              {(!params.row.isActive) && (<Switch onChange={(e) => activeUser(e, params.row)}/>)}
          </div>)}},
    {field: "actions",headerName: "Actions",flex: 1,
    renderCell: (params) => {
      return (
          <div className="cellAction">
              <Link to={"/users/view/" + params.row?.userName} state={params.row}
                    style={{textDecoration: "none", color: "green"}}>
                  <VisibilityIcon></VisibilityIcon>
              </Link>
              <Link to="/users/edit" state={params.row} style={{textDecoration: "none"}}>
                  <BorderColorIcon style={{color: 'blue'}} title="Delete"></BorderColorIcon>
              </Link>
              <div className="deleteButton" onClick={() => { setDeleteId(params.row.id) ;setOpenDeleteDialog(true);}}>
                  <DeleteIcon style={{color: 'red'}} title="Delete"></DeleteIcon>
              </div>
              <Link to={"/Users/UserGroups/" + params.row?.userName} state={params.row}
                    style={{textDecoration: "none"}}>
                  <GroupIcon style={{color: 'black'}} title="group"></GroupIcon>
              </Link>
              <Link to={"/Users/UserBranchs/" + params.row?.userName} state={params.row}
                    style={{textDecoration: "none"}}>
                  <LocationOnIcon style={{color: 'darkBlue'}} title="Branchs"></LocationOnIcon>
              </Link>
              <Link to="/users/changePassword" state={params.row} style={{textDecoration: "none"}}>
                <PasswordIcon style={{color: 'darkOrange'}} title="password"></PasswordIcon>
              </Link>
            </div>)}},
    {field: "accessLevel",headerName: "Access Level", flex: 1,
    renderCell: ({ row: { access } }) => {
        return (<Box width="60%" m="0 auto" p="5px" display="flex" justifyContent="center"
        backgroundColor={access === "admin"? '#ff822e': access === "manager"? '#ff7316': '#dc5800'} borderRadius="4px">
            {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {access === "manager" && <SecurityOutlinedIcon />}
            {access === "user" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>{access}</Typography>
          </Box>)}}
  ];
  //--------------------------------------------------
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="USERS" subtitle="Manage your Team Users" />
        <Box>
          <Button sx={{ boxShadow: `-1px 5px 20px -3px ${colors.grey[400]}`,borderRadius : '10px',backgroundColor: '#ff822e',
            color: '#fff',fontSize: "14px",fontWeight: "bold",padding: "10px 20px",
            '&:hover':{color: `${theme.palette.mode === 'dark'?'#ff9a57 !important':'#ab4400 !important'}`,
            border: `solid 1px ${theme.palette.mode === 'dark'?'#ff9a57 !important':'#ab4400 !important'}`}}}><PersonAddAltIcon sx={{ mr: "10px" }} />
            Add User
          </Button>
        </Box>
      </Box>
      <Box m="40px 0 0 0"width="98%"sx={{
          "& .MuiDataGrid-root": {border: "none"},
          "& .MuiDataGrid-cell": {borderBottom: "none"},
          "& .name-column--cell": {color: '#FF770D',fontWeight :"bold"},
          "& .MuiDataGrid-columnHeaders": {backgroundColor: colors.primary[800],borderBottom: "none"},
          "& .MuiDataGrid-virtualScroller": {backgroundColor: colors.primary[400]},
          "& .MuiDataGrid-footerContainer": {borderTop: "none",backgroundColor: colors.primary[800]},
          "& .MuiCheckbox-root": {color: `#FF770D !important`,fontWeight :"bold"}}}>
        <DataGrid checkboxSelection rows={mockDataTeam} columns={columns} />
      </Box>
    </Box>
  );
};

export default Users;