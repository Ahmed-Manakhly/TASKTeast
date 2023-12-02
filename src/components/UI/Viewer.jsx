/* eslint-disable react/prop-types */
import {Col  } from 'react-bootstrap'
import { Box  ,useTheme , Typography} from "@mui/material";
import { tokens } from "../../theme";



function Viewer({info,title , icon,list}) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Col >
            <Box display ='flex' justifyContent="space-between" p={2}
            sx={{ boxShadow: '-5px -5px 15px 0.5px #aa90 , 10px 10px 15px #000', backgroundColor:theme.palette.mode === 'dark'?colors.primary[400]:colors.grey[900],
            transition: '150ms',cursor: 'pointer','&:hover' :{boxShadow: '-5px -5px 15px 0.5px #ccc, 10px 10px 15px #aaa0'},position:'relative',borderRadius: '11px',
            '&:hover .hBar::after' :{backgroundColor:  'orangered'},'& .vBar': {
                      position: 'absolute',
                      backgroundColor: '#000'  ,
                      height: '170%',
                      width: '10px',
                      top: '0',
                      left: '-30px',
                      },
                    '& .hBar': {
                      position: 'absolute',
                      backgroundColor: '#000'  ,
                      height: '10px',
                      width: '30px',
                      top: '30px',
                      left: '-30px',
                    },
                    '& .hBar::after': {
                      transition: '150ms',
                      position: 'absolute',
                      content: '""',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      top: '-5px',
                      left: '-5px',
                      backgroundColor:  'transparent',
                      border:' #000 solid 5px',
                      }
            }}>
                <span className="vBar"></span>
                <span className="hBar"></span>
                    <Typography variant="h5" color={colors.grey[100]} >{title} {icon}</Typography>
                    <Typography variant="h2" color={colors.primary[800]} fontWeight="bold" > {info} </Typography>
                    {list}
            </Box>
        </Col>
    )
}

export default Viewer