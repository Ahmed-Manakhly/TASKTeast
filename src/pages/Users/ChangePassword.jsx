
import { toast } from "react-toastify";
import { useNavigate , Form ,useNavigation , useActionData  , redirect } from 'react-router-dom';
import { Box , useTheme  } from "@mui/material";
import useInput from '../../hooks/Use-Input';
import { tokens } from "../../theme";
import Header from '../../components/UI/Header' ;
import PageButton from '../../components/UI/PageButton';
import PageInput from '../../components/UI/PageInput';
import { Row , Col  } from 'react-bootstrap' ;




const ChangePassword = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);


  //------------------------------------ init validation
    const {value : enteredPass ,hasError : passInputIsInvalid , valueIsValid : pass1,
        valueChangeHandler : passInputChangeHandler , inputBlurHandler : passInputBlurHandler } = useInput(value => value.trim().length >= 8) ;
    const {value : enteredPassw , valueIsValid : pass2,
        valueChangeHandler : passwInputChangeHandler , inputBlurHandler : passwInputBlurHandler } = useInput(value => value.trim().length >= 8) ;
  //------------------------------------------------------form valid
    let formIsValid = false
        if(pass1 && pass2 &&(enteredPass === enteredPassw )){
            formIsValid = true;
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
            <Header title="Change User Password" subtitle="Manage your Team Users" />
            <Form method='post' >
                <Row className='d-flex  justify-content-center m-5 p-4 align-items-center'
                style={{background : colors.primary[400],boxShadow: `-1px 5px 20px -3px ${colors.grey[100]}`,borderRadius : '10px'}} >
                    {data && data.errors && (<ul>{Object.values(data.errors).map(err => <li key={err}>{err}</li>)}</ul>)}
                    <Row>
                        <PageInput htmlFor='newPassword' labelTitle='New Password'  type="password" placeholder="Enter New Password"name="newPassword" required
                        id='newPassword' onChange={passInputChangeHandler} onBlur={passInputBlurHandler}
                        error='Password must be greater than or equal 8 character' invalid={passInputIsInvalid} />
                    </Row>
                    {/*============================================ */}
                    <Row>
                        <PageInput htmlFor='newPasswordCon' labelTitle='Confirm Password'  type="password" placeholder="Enter New Password Again"name="newPasswordCon"
                        required id='newPasswordCon' onChange={passwInputChangeHandler} onBlur={passwInputBlurHandler}
                        error='Your password is not Matching' invalid={enteredPass !== enteredPassw} />
                    </Row>
                    {/*============================================ */}
                    <Row className={` d-flex align-items-center w-100 d-flex justify-content-evenly`} >
                        <Col className={` d-flex flex-column align-items-center w-100`} >
                            <PageButton  title={isSubmitting?'submitting...':"Submit"} type="submit" disabled={!formIsValid||isSubmitting}/>
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

export default ChangePassword
//----------------------------------------------

// eslint-disable-next-line react-refresh/only-export-components
export const action = async ({request , params})=>{

    const userId  = params.userID;
    const data = await request.formData();
    const newPassword = data.get('newPassword');
    const URL_ = `https://neurevealpacs.ai/Neurveal/WebAdmin/User/ChangeUserPassword?userId=${userId}&newPassword=${newPassword}` ;
    //--------------------------------------
    const response = await fetch(URL_,
        {method : 'POST' , headers : {'Content-Type' : 'application/json'}})
        // console.log(response.json() )
        if(!response.ok){return toast.error('Invalid Data!')}else{
        toast.success(`Password has been changed successfully`);
        }
    return redirect('/users');
} ;