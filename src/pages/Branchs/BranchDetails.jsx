/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useNavigate , useParams  } from 'react-router-dom';
import { Box , useTheme  } from "@mui/material";
import { tokens } from "../../theme";
import Header from '../../components/UI/Header' ;
import PageButton from '../../components/UI/PageButton';
import Viewer from '../../components/UI/Viewer';
import { Row , Col  } from 'react-bootstrap' ;




const BranchDetails = ({getingData}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

  //------------------------ get branchName
    let thisBranch 
    const { branchID } = useParams();

  //------------------------------------------------------form valid
//   let formIsValid = false
//   if((name1 && name2 && mail && pass1&& phone)||userID ){
//       formIsValid = true;
//   }

  //----------------------------------
    if(getingData){
    thisBranch = getingData?.find(a => a.id === +branchID) 
    }else{
    thisBranch = null
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
      <Header title={thisBranch ? 'Branch Details': "No Branch Details Available"} subtitle={thisBranch ?
      (<PageButton title={`${thisBranch ?.code}`} /> )
      :<PageButton title='Go Back' type="button" action={cancelHandler} />} />

      <Box >
        <Row className='d-flex  justify-content-center m-5  align-items-center'
        style={{background : colors.primary[400],boxShadow: `-1px 5px 20px -3px ${colors.grey[100]}`,borderRadius : '10px'}} >
          <Row md={1} xs={1} lg={2} className={`g-5 p-5  justify-content-center `}>
            <Viewer  title='Branch Code'   info={thisBranch? thisBranch.code : ''} />
            <Viewer  title='Branch Name'   info={thisBranch? thisBranch.name : ''} />
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

export default BranchDetails
