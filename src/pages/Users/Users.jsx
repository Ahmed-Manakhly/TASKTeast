/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { Box , useTheme,Typography} from "@mui/material";
import { tokens } from "../../theme";
//---------- icons
// import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
// import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
// import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
//---------------------------------------test
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {Link} from 'react-router-dom';
import GroupIcon from '@mui/icons-material/Group';
import PasswordIcon from '@mui/icons-material/Password';
import {Switch} from '@mui/material';
//-------------------------- ui
import Header from '../../components/UI/Header' ;
import PageButton from '../../components/UI/PageButton' ;
import UsersTable from '../../components/Users/UsersTable' ;
import LoadingSpinner from "../../components/UI/LoadingSpinner";
//-------------------- api
import { toast } from "react-toastify";
import {useRouteLoaderData   ,defer , Await ,redirect , useSubmit}  from "react-router-dom";
import { Suspense } from 'react';


//---------------------------

const Users = ({liftData , searchedVal , searchedTitle}) => {
  //------------ test
  const {UsersList} = useRouteLoaderData('usersData') ;
    // const [pageTitle, setPageTile] = useState('Users');
    // const [pageSize, setPageSize] = useState(5);
  // const [deleteId, setDeleteId] = useState(-1);
  // const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  // useEffect(()=>{searchedTitle('Users')},[UsersList]) ;
  //------------------

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const submit = useSubmit() ;
  //----------------------------------
  // const [searchQuery, setSearchQuery] = useState('');

  //-------------------------
  function handleDelete(id) {
    const proceed = window.confirm('Are you sure, You want to delete this user?') ;
    if (proceed) {
      submit(null , {action : `/delete?id=${id}` , method : 'DELETE'}) ;
    }
  }
  //----------------------------------
  function handleDeactivate(id) {
    const proceed = window.confirm('Are you sure, You want to Deactivate this user?') ;
    if (proceed) {
      submit(null , {action : `/deactivate?id=${id}` , method : 'POST'}) ;
    }
  }
  //----------------------------------
  function handleActivate(id) {
    const proceed = window.confirm('Are you sure, You want to activate this user?') ;
    if (proceed) {
      submit(null , {action : `/activate?id=${id}` , method : 'POST'}) ;
    }
  }
  //------------------------- columns
  const columns = [
    {field: "id", headerName: "ID" ,flex: 0.5},
    {field: "displayName",headerName: "User", flex: 0.5,cellClassName: "name-column--cell"},
    {field: "email",headerName: "Email",flex: 0.5},
    {field: "phoneNumber",headerName: "Phone Number",flex: 0.5},
    {field: "isActive",headerName: "Activity",flex : 0.5 ,
    renderCell: (params) => {
      return (
          <Box>
            {(params.row.isActive) && (<Switch defaultChecked style={{color : '#ff822e'}} onClick={handleDeactivate.bind(null,params.row.id)}/>)}
            {(!params.row.isActive) && (<Switch style={{color : '#ffff'}} onClick={handleActivate.bind(null,params.row.id)} />)}
          </Box>)}},
    {field: "actions",headerName: "Actions",flex: 2,
    renderCell: (params) => {
      return (
        <Box width="60%" m="0 auto" p="5px" display="flex" justifyContent="space-around" backgroundColor={'#ff822e'} borderRadius="4px">
              <Link to={"/users/view/" + params.row?.userName} style={{textDecoration: "none"}}>
                  <VisibilityIcon style={{textDecoration: "none", color: colors.primary[400]}} />
              </Link>
              <Link to={"/users/edit/" + params.row.id} style={{textDecoration: "none"}}>
                  <BorderColorIcon style={{color: colors.primary[400]}} title="Delete"></BorderColorIcon>
              </Link>
              <div onClick={handleDelete.bind(null,params.row.id)}>
                  <DeleteIcon style={{color: colors.primary[400] , cursor:'pointer'}} title="Delete"></DeleteIcon>
              </div>
              <Link to={"/users/userGroups/" + params.row?.userName} state={params.row}
                    style={{textDecoration: "none"}}>
                  <GroupIcon style={{color: colors.primary[400]}} title="group"></GroupIcon>
              </Link>
              <Link to={"/sers/userBranchs/" + params.row?.userName} state={params.row}
                    style={{textDecoration: "none"}}>
                  <LocationOnIcon style={{color: colors.primary[400]}} title="Branchs"></LocationOnIcon>
              </Link>
              <Link to={"/users/changePassword/"+ params.row.id}style={{textDecoration: "none"}}>
                <PasswordIcon style={{color: colors.primary[400]}} title="password"></PasswordIcon>
              </Link>
            </Box>)}}
  ];
  //--------------------------------------------------

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="USERS" subtitle="Manage your Team Users" />
        <Link to="/users/new" style={{textDecoration: "none"}}>
          <PageButton btnIcon={<PersonAddAltIcon sx={{ mr: "10px" }} />} title='Add User' />
        </Link>
      </Box>
      {/* getting the table with data*/}
      <Suspense fallback={<span className='d-flex justify-content-center '><LoadingSpinner/></span>}>
        <Await resolve={UsersList}>{(users) => <UsersTable data={users} columns={columns} searchedVal={searchedVal} /> }</Await>
      </Suspense>
      {/*lifting data to app */}
      <Suspense fallback={<span className='d-flex justify-content-center '>
          <Typography variant="h2" color={colors.grey[700]} fontWeight="bold"sx={{ml: "5px"}}>Loading...</Typography>
          </span>}>
        <Await resolve={UsersList}>{(users) => <><>{liftData(users)}</><>{searchedTitle('Users')}</></>}</Await>
      </Suspense>
    </Box>
  );
};

export default Users;

//------------------------ loader


const dataURL = `https://neurevealpacs.ai/Neurveal/WebAdmin/User/GetUsers` ;

async function getUsersList() {
  const response = await fetch(dataURL);
  if (!response.ok) {
    return toast.error('Could Not Get List Of Users!')
  } else {
      const resData = await response.json() ;
      const UsersList = resData
      return UsersList ;
  }
}
//----------------------------------------------
export  function loader() {
  return defer({UsersList : getUsersList()}) ;
} 
//------------------------------------unnecessary field  for now
// {field: "accessLevel",headerName: "Access Level", flex: 1,
// renderCell: ({ row: { access } }) => {
//     return (<Box width="60%" m="0 auto" p="5px" display="flex" justifyContent="center" 
//backgroundColor={access === "admin"? '#ff822e': access === "manager"? '#ff7316': '#dc5800'} borderRadius="4px">
//         {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
//         {access === "manager" && <SecurityOutlinedIcon />}
//         {access === "user" && <LockOpenOutlinedIcon />}
//         <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>{access}</Typography>
//       </Box>)}}
//-------------------------------------

// eslint-disable-next-line no-unused-vars
export const action = async ({params , request})=>{
  const searchParams = new URL(request.url).searchParams ;
  const id = searchParams.get('id') ;
  const response = await fetch(`https://neurevealpacs.ai/Neurveal/WebAdmin/User/DeleteUser?userId=`+id,{method : 'DELETE' })
  if (!response.ok) {
      return toast.error('could not delete this user!');
  } else {
    toast.success(`user removed successfully`);
      return redirect('/users') ;
  }
} ;

export const deActivateaction = async ({params , request})=>{
  const searchParams = new URL(request.url).searchParams ;
  const id = searchParams.get('id') ;
  const response = await fetch(`https://neurevealpacs.ai/Neurveal/WebAdmin/User/ActivateUser?userId=${+id}&isActive=false`,{method : 'POST' })
  if (!response.ok) {
      return toast.error('could not deactivate this user!');
  } else {
    toast.success(`user deactivated successfully`);
      return redirect('/users') ;
  }
} ;

export const activateaction = async ({params , request})=>{
  const searchParams = new URL(request.url).searchParams ;
  const id = searchParams.get('id') ;
  const response = await fetch(`https://neurevealpacs.ai/Neurveal/WebAdmin/User/ActivateUser?userId=${+id}&isActive=true`,{method : 'POST' })
  if (!response.ok) {
      return toast.error('could not activate this user!it!');
  } else {
    toast.success(`user activated successfully`);
      return redirect('/users') ;
  }
} ;