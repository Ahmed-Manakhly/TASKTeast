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






const AddEditBranch = ({getingData}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  //------------------------------------ init validation
  const {hasError : codeInputIsInvalid , valueIsValid : code,
      valueChangeHandler : codeInputChangeHandler , inputBlurHandler : codeInputBlurHandler } = useInput(value => value.trim() !=='') ;
  const {hasError : BNameInputIsInvalid ,valueIsValid : name,
      valueChangeHandler : BnameInputChangeHandler , inputBlurHandler : BnameInputBlurHandler  } = useInput(value => value.trim() !=='') ;
  //------------------------ get Brsnch id
  let thisBranch 
  const { branchID } = useParams();
  //------------------------------------------------------form valid
  let formIsValid = false
  if((name && code)||branchID ){
      formIsValid = true;
  }

  //----------------------------------
  if(getingData){
    thisBranch = getingData?.find(a => +a.id === +branchID) 
  }else{
    thisBranch = null
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
      <Header title={thisBranch ? "Update Brsnch" : "Create Brsnch"} subtitle="Manage your Brsnchs" />
      
      <Form method='post' >
        <Row className='d-flex  justify-content-center m-5 p-4 align-items-center'
        style={{background : colors.primary[400],boxShadow: `-1px 5px 20px -3px ${colors.grey[100]}`,borderRadius : '10px'}} >
          {data && data.errors && (<ul>{Object.values(data.errors).map(err => <li key={err}>{err}</li>)}</ul>)}
          <Row>
            <PageInput htmlFor='code' labelTitle='Branch Code' type="text" placeholder="Branch Code"name="code" required  
            defaultValue={thisBranch? thisBranch.code : ''} id='code' onChange={codeInputChangeHandler} onBlur={(codeInputBlurHandler)}
            error='Branch Code must not be empty' invalid={codeInputIsInvalid && !branchID} />
            <PageInput htmlFor='name' labelTitle='Branch Name' type="text" placeholder="Branch Name" name="name" required 
            defaultValue={thisBranch? thisBranch.name : ''} id='name' onChange={BnameInputChangeHandler} onBlur={BnameInputBlurHandler}
            error='Branch Name must not be empty' invalid={BNameInputIsInvalid && !branchID} />
          </Row>
          {/*============================================ */}
          <Row className={` d-flex align-items-center w-100 d-flex justify-content-evenly`} >
            <Col className={` d-flex flex-column align-items-center w-100`} >
              <PageButton  title={isSubmitting?'submitting...':(branchID ? "Update" : "Submit")} type="submit"disabled={!formIsValid||isSubmitting}/>
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

export default AddEditBranch
  //----------------------------------------------

  export const action = async ({request , params})=>{

    // const name  =localStorage.getItem('name');
    // const branchID  =localStorage.getItem('branchID');
    //------------------------------------------
    const data = await request.formData();
    //---------------------------------------
    const branchSchema ={
      id: params.branchID ? params.branchID :0,
      code: data.get('code'),
      name: data.get('name')
    }
    //--------------------------------------
    const response = await fetch('https://neurevealpacs.ai/Neurveal/WebAdmin/Branch/AddUpdateBranch',
      {method : 'POST' , headers : {'Content-Type' : 'application/json'} , body : JSON.stringify(branchSchema)})
      if(!response.ok){return toast.error('Invalid Data!')}else{
        toast.success(`Branch is ${params.branchID ?'updated' : 'created'} successfully`);
      }
    return redirect('/branchs');
  } ;