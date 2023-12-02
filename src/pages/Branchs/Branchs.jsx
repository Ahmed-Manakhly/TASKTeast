/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { Box , useTheme,Typography} from "@mui/material";
import { tokens } from "../../theme";
//---------- icons
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BorderColorIcon from '@mui/icons-material/BorderColor';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
import {Link} from 'react-router-dom';
//-------------------------- ui
import Header from '../../components/UI/Header' ;
import PageButton from '../../components/UI/PageButton' ;
import BranchsTable from '../../components/Branchs/BranchsTable' ;
import LoadingSpinner from "../../components/UI/LoadingSpinner";
//-------------------- api
import { toast } from "react-toastify";
import {useRouteLoaderData   ,defer , Await ,redirect , useSubmit}  from "react-router-dom";
import {Suspense } from 'react';


//---------------------------

const Branchs = ({liftData , searchedVal , searchedTitle}) => {
  const {BranchList} = useRouteLoaderData('branchsData') ;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const submit = useSubmit() ;
  //----------------------------------
  function handleDelete(id) {
    const proceed = window.confirm('Are you sure, You want to delete this Branch?') ;
    if (proceed) {
      submit(null , {action : `/deleteBranch?id=${id}` , method : 'DELETE'}) ;
    }
  }
  //------------------------- columns
  const columns = [
    {field: "id", headerName: "ID" ,flex: 0.5},
    {field: "code",headerName: "Code", flex: 0.5},
    {field: "name",headerName: "Name",flex: 1.5},
    {field: "actions",headerName: "Actions",flex: 2,
    renderCell: (params) => {
      return (
        <Box width="60%" m="0 auto" p="5px" display="flex" justifyContent="space-around" backgroundColor={'#ff822e'} borderRadius="4px">
              <Link to={"/branchs/view/" + params.row?.id} style={{textDecoration: "none"}}>
                  <VisibilityIcon style={{textDecoration: "none", color: colors.primary[400]}} />
              </Link>
              <Link to={"/branchs/edit/" + params.row.id} style={{textDecoration: "none"}}>
                  <BorderColorIcon style={{color: colors.primary[400]}} title="Delete"></BorderColorIcon>
              </Link>
              <div onClick={handleDelete.bind(null,params.row.id)}>
                  <DeleteIcon style={{color: colors.primary[400] , cursor:'pointer'}} title="Delete"></DeleteIcon>
              </div>
            </Box>)}}
  ];
  //--------------------------------------------------

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Branchs" subtitle="Manage your Branchs" />
        <Link to="/branchs/new" style={{textDecoration: "none"}}>
          <PageButton btnIcon={<PersonAddAltIcon sx={{ mr: "10px" }} />} title='Add Branch' />
        </Link>
      </Box>
      {/* getting the table with data*/}
      <Suspense fallback={<span className='d-flex justify-content-center '><LoadingSpinner/></span>}>
        <Await resolve={BranchList}>{(branchs) => <BranchsTable data={branchs} columns={columns} searchedVal={searchedVal} /> }</Await>
      </Suspense>
      {/*lifting data to app */}
      <Suspense fallback={<span className='d-flex justify-content-center '>
                            <Typography variant="h2" color={colors.grey[700]} fontWeight="bold"sx={{ml: "5px"}}>Loading...</Typography>
                          </span>} >
        <Await resolve={BranchList}>{(branchs) => <><>{liftData(branchs)}</><>{searchedTitle('Branchs')}</></>}</Await>
      </Suspense>
    </Box>
  );
};

export default Branchs;

//------------------------ loader


const dataURL = `https://neurevealpacs.ai/Neurveal/WebAdmin/Branch/GetBranchs` ;

async function getBranchList() {
  const response = await fetch(dataURL);
  if (!response.ok) {
    return toast.error('Could Not Get List Of Branch!')
  } else {
      const resData = await response.json() ;
      const BranchList = resData
      return BranchList ;
  }
}
//======
export  function loader() {
  return defer({BranchList : getBranchList()}) ;
} 
//--------------------------------- DELETE Branch
export const action = async ({params , request})=>{
  const searchParams = new URL(request.url).searchParams ;
  const id = searchParams.get('id') ;
  const response = await fetch(`https://neurevealpacs.ai/Neurveal/WebAdmin/Branch/DeleteBranch?branchId=`+id,{method : 'DELETE' })
  if (!response.ok) {
      return toast.error('could not delete this branch!');
  } else {
    toast.success(`branch removed successfully`);
      return redirect('/branchs') ;
  }
} ;