/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { toast } from "react-toastify";
import { useNavigate , Form ,useNavigation , useActionData  , redirect , useParams } from 'react-router-dom';
import { Box , useTheme  } from "@mui/material";
import useInput from '../../hooks/Use-Input';
import { tokens } from "../../theme";
import Header from '../../components/UI/Header' ;
import PageButton from '../../components/UI/PageButton';
import PageInput from '../../components/UI/PageInput';
import { Row , Col  } from 'react-bootstrap' ;
// import {useState} from 'react' ;






const AddEditUser = ({getingData}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  //------------------------------------ init validation
  const {hasError : nameInputIsInvalid , valueIsValid : name1,
      valueChangeHandler : nameInputChangeHandler , inputBlurHandler : nameInputBlurHandler } = useInput(value => value.trim() !=='') ;
  const {hasError : lNameInputIsInvalid ,valueIsValid : name2,
      valueChangeHandler : LnameInputChangeHandler , inputBlurHandler : LnameInputBlurHandler  } = useInput(value => value.trim() !=='') ;
      //------------------------
  const {hasError : emailInputIsInvalid , valueIsValid : mail,
      valueChangeHandler : emailInputChangeHandler , inputBlurHandler : emailInputBlurHandler  } = useInput(value => value.includes('@')) ;
  const {hasError : passInputIsInvalid , valueIsValid : pass1,
          valueChangeHandler : passInputChangeHandler , inputBlurHandler : passInputBlurHandler } = useInput(value => value.trim().length >= 8) ;
  const {hasError : phoneInputIsInvalid , valueIsValid : phone,
          valueChangeHandler : phoneInputChangeHandler , inputBlurHandler : phoneInputBlurHandler } = useInput(value => value.trim().length >= 8) ;

  //------------------------ get user id
  let thisUser 
  const { userID } = useParams();
  //------------------------------------------------------form valid
  let formIsValid = false
  if((name1 && name2 && mail && pass1&& phone)||userID ){
      formIsValid = true;
  }

  //----------------------------------
  if(getingData){
    thisUser = getingData?.find(a => +a.id === +userID) 
  }else{
    thisUser = null
  }
  //------------------------------------------------
  const navigate = useNavigate();
  //---------------------------------------
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting' ;
  const data = useActionData() ;
  //-----------------------------------------
  function cancelHandler() {
    navigate('..');
  }
  //-----------------------------------
  return (
    <Box m="20px">
      <Header title={thisUser ? "Update User" : "Create User"} subtitle="Manage your Team Users" />
      
      <Form method='post' >
        <Row className='d-flex  justify-content-center m-5 p-4 align-items-center'
        style={{background : colors.primary[400],boxShadow: `-1px 5px 20px -3px ${colors.grey[100]}`,borderRadius : '10px'}} >
          {data && data.errors && (<ul>{Object.values(data.errors).map(err => <li key={err}>{err}</li>)}</ul>)}
          <Row>
            <PageInput htmlFor='userName' labelTitle='User Name' type="text" placeholder="User Name"name="userName" required  
            defaultValue={thisUser? thisUser.userName : ''} id='userName' onChange={nameInputChangeHandler} onBlur={(nameInputBlurHandler)}
            error='User Name must not be empty' invalid={nameInputIsInvalid && !userID} />
            <PageInput htmlFor='displayName' labelTitle='Display Name' type="text" placeholder="Display Name" name="displayName" required 
            defaultValue={thisUser? thisUser.displayName : ''} id='displayName' onChange={LnameInputChangeHandler} onBlur={LnameInputBlurHandler}
            error='Display Name must not be empty' invalid={lNameInputIsInvalid && !userID} />
          </Row>
          {/*========================================== */}
          <Row>
            <PageInput htmlFor='email' labelTitle='Email Address' type="email" placeholder="Email Address"name="email" required 
            defaultValue={thisUser? thisUser.email : ''}id='email' onChange={emailInputChangeHandler} onBlur={emailInputBlurHandler}
            error='Email Address must not be empty' invalid={emailInputIsInvalid && !userID} />

            <PageInput htmlFor='password' labelTitle='Password'  type="password" placeholder="Password"name="password" required
            defaultValue={thisUser? thisUser.password : ''}id='password' onChange={passInputChangeHandler} onBlur={passInputBlurHandler}
            error='Password must be greater than or equal 8 character' invalid={passInputIsInvalid && !userID} />
          </Row>
          {/*============================================ */}
          <Row>

          <PageInput  htmlFor='phoneNumber' labelTitle='Phone Number' type="text" placeholder="Phone Number"name="phoneNumber" required
          defaultValue={thisUser? thisUser.phoneNumber : ''} id='phoneNumber' onChange={phoneInputChangeHandler} onBlur={phoneInputBlurHandler}
            error='Please enter a valid phone number!' invalid={phoneInputIsInvalid && !userID} />

            <Col className={`d-flex flex-column  align-items-center `} >
              <Row>
                <label htmlFor='phoneNumber' style={{
                  fontWeight: 'bolder',
                  marginBottom: '5px' ,
                  color: 'rgb(133, 114, 114)',
                }}>User Activity</label>
              </Row>
              <Row className={`d-flex align-items-center`}>
                <Col className={`d-flex align-items-center `}>
                  <input type="radio" value="yes" name="isActive" required id='active' className='me-3' style={{cursor:'pointer'}}
                  defaultValue={thisUser? (thisUser.isActive && 'yes'): ''}/>
                  <label htmlFor="active" style={{cursor:'pointer'}} >Active</label>
                </Col>
                <Col className={`d-flex align-items-center `} >
                  <input type="radio" value="no" name="isActive" required id='inactive' className='me-3'style={{cursor:'pointer'}}
                  defaultValue={thisUser? (!thisUser.isActive && 'no'): ''}/>
                  <label htmlFor="inactive" style={{cursor:'pointer'}}>Inactive</label>
                </Col>
              </Row>
            </Col>

          </Row>
          {/*============================================ */}
          <Row className={` d-flex align-items-center w-100 d-flex justify-content-evenly`} >
            <Col className={` d-flex flex-column align-items-center w-100`} >
              <PageButton  title={isSubmitting?'submitting...':(userID ? "Update" : "Submit")} type="submit"disabled={!formIsValid||isSubmitting}/>
            </Col>
            <Col className={` d-flex flex-column align-items-center w-100`} >
              <PageButton title='Cancel' type="button" action={cancelHandler}   />
            </Col>
          </Row>
        </Row>      
      </Form>
    </Box>
  )
}

export default AddEditUser
  //----------------------------------------------

  export const action = async ({request , params})=>{

    // const displayName  =localStorage.getItem('DisplayName');
    // const userId  =localStorage.getItem('userId');
    //------------------------------------------
    const data = await request.formData();
    //---------------------------------------
    const userSchema ={
      id: params.userID ? params.userID :0,
      userName: data.get('userName'),
      displayName: data.get('displayName'),
      password: data.get('password'),
      email: data.get('email'),
      phoneNumber: data.get('phoneNumber'),
      isActive: data.get('isActive') === "yes"?true:false
    }
    //--------------------------------------
    const response = await fetch('https://neurevealpacs.ai/Neurveal/WebAdmin/User/AddUpdateUser',
      {method : 'POST' , headers : {'Content-Type' : 'application/json'} , body : JSON.stringify(userSchema)})
      console.log(response.json() )
      if(!response.ok){return toast.error('Invalid Data!')}else{
        toast.success(`User is${params.userID ?'updated' : 'created'} successfully`);
      }
    return redirect('/users');
  } ;