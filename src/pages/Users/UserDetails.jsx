/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
// import { toast } from "react-toastify";
import { useNavigate , useParams  } from 'react-router-dom';
import { Box , useTheme  } from "@mui/material";
import { tokens } from "../../theme";
import Header from '../../components/UI/Header' ;
import PageButton from '../../components/UI/PageButton';
import Viewer from '../../components/UI/Viewer';
import { Row , Col  } from 'react-bootstrap' ;
// import {useState} from 'react' ;

const dumyGroups =['Group1','Group2','Group3'];
const dumyBranches =['Branche1','Branche2','Branche3'];






const UserDetails = ({getingData}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  //--------------------------
  const groups = <ul>{dumyGroups.map((g,i)=>(<li key={i}>{g}</li>))}</ul>
  const branches = <ul>{dumyBranches.map((b,i)=>(<li key={i}>{b}</li>))}</ul>

  //------------------------ get userName
    let thisUser 
    const { userName } = useParams();

  //------------------------------------------------------form valid
//   let formIsValid = false
//   if((name1 && name2 && mail && pass1&& phone)||userID ){
//       formIsValid = true;
//   }

  //----------------------------------
    if(getingData){
    thisUser = getingData?.find(a => a.userName === userName) 
    }else{
    thisUser = null
    }
  //------------------------------------------------
    const navigate = useNavigate();
  //---------------------------------------
//   const navigation = useNavigation();
//   const isSubmitting = navigation.state === 'submitting' ;
//   const data = useActionData() ;
  //-----------------------------------------
  function cancelHandler() {
    navigate('..');
  }
  //-----------------------------------
  return (
    <Box m="20px">
      <Header title={thisUser ? thisUser?.displayName : "No User Details"} subtitle={thisUser ?
      (thisUser?.isActive? (<PageButton title='Active USER' />): (<PageButton title='Inactive USER' />) )
      :<PageButton title='Go Back' type="button" action={cancelHandler} />} />

      <Box >
        <Row className='d-flex  justify-content-center m-5  align-items-center'
        style={{background : colors.primary[400],boxShadow: `-1px 5px 20px -3px ${colors.grey[100]}`,borderRadius : '10px'}} >
          <Row md={1} xs={1} lg={2} className={`g-5 p-5  justify-content-center `}>
            <Viewer  title='Display Name'   info={thisUser? thisUser.displayName : ''} />
            <Viewer  title='User Name'   info={thisUser? thisUser.userName : ''} />
            <Viewer  title='Email Address'   info={thisUser? thisUser.email : ''} />
            <Viewer  title='Phone Number'   info={thisUser? thisUser.phoneNumber : ''} />
            <Viewer  title='User Branches'   list={branches} />
            <Viewer  title='User Groups'   list={groups}  />
          </Row>
          <Row className={` d-flex align-items-center w-100 d-flex justify-content-evenly`} >
            <Col className={` d-flex flex-column align-items-center w-100`} >
              <PageButton title='Cancel' type="button" action={cancelHandler}   />
            </Col>
          </Row>
        </Row>      
      </Box>
    </Box>
  )
}

export default UserDetails
  //----------------------------------------------

//   export const action = async ({request , params})=>{

    // const displayName  =localStorage.getItem('DisplayName');
    // const userId  =localStorage.getItem('userId');
    //------------------------------------------
    // const data = await request.formData();
    //---------------------------------------
//     const userSchema ={
//       id: params.userID ? params.userID :0,
//       userName: data.get('userName'),
//       displayName: data.get('displayName'),
//       password: data.get('password'),
//       email: data.get('email'),
//       phoneNumber: data.get('phoneNumber'),
//       isActive: data.get('isActive') === "yes"?true:false
//     }
//     //--------------------------------------
//     const response = await fetch('https://neurevealpacs.ai/Neurveal/WebAdmin/User/AddUpdateUser',
//       {method : 'POST' , headers : {'Content-Type' : 'application/json'} , body : JSON.stringify(userSchema)})
//       console.log(response.json() )
//       if(!response.ok){return toast.error('Invalid Data!')}else{
//         toast.success(`User ${params.userID ?'updated' : 'created'} successfully`);
//       }
//     return redirect('/users');
//   } ;