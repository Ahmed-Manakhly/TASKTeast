/* eslint-disable react/prop-types */
import { Col  } from 'react-bootstrap'  ;
import { useTheme ,Box } from "@mui/material";
import { tokens } from "../../theme";

function PageInput({htmlFor,type,placeholder,name,required,defaultValue,onChange,onBlur,id,invalid ,labelTitle,error}) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Col className={`d-flex flex-column`} >
            <label htmlFor={htmlFor}style={{
            fontWeight: 'bolder',
            marginBottom: '5px' ,
            color: 'rgb(133, 114, 114)',
            }}>{labelTitle}</label>
            <Box display='flex' backgroundColor={colors.primary[400]} borderRadius='8px' sx={{boxShadow: `inset 1px 12px 20px -7px ${theme.palette.mode === 'dark' ?colors.primary[200]:colors.grey[500]}`}} >
            <input type={type} placeholder={placeholder} name={name} required={required}  defaultValue={defaultValue} id={id} onChange={onChange} onBlur={onBlur}
            style={{
            width : '100%' ,
            background :`${
                invalid ?(theme.palette.mode === 'dark'?colors.redAccent[400]:colors.redAccent[800]):
                (theme.palette.mode === 'dark'?colors.primary[100]:colors.grey[900])
            }`,
            fontWeight: '600',
            color: colors.primary[600],
            padding: '15px',
            borderRadius: '11px',
            boxShadow: `inset -10px -10px 15px ${
                invalid  ?(theme.palette.mode === 'dark'?colors.redAccent[800]:colors.redAccent[400]):
                (theme.palette.mode === 'dark'?colors.primary[700]:colors.grey[300])
            }`,
            border: `${
                invalid ?colors.redAccent[700]:(theme.palette.mode === 'dark'?colors.primary[100]:colors.primary[800])
            } solid 3px`,
            }}/>
            </Box>
            {invalid && (<p style={{
            color: '#ed0e4d',
            fontSize: 'smaller',
            fontStyle :'italic',
            marginTop: '2px',
            }}>{error}</p>)}
        </Col>
    );
}

export default PageInput ;