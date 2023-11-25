/* eslint-disable react/prop-types */
import {Box, IconButton ,useTheme , Typography  } from '@mui/material';
import {useContext} from 'react';
import {ColorModeContext , tokens} from '../../theme' ;
import {InputBase} from '@mui/material';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined' ;
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined' ;
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined' ;
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined' ;
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined' ;
import SearchIcon from '@mui/icons-material/Search' ;
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import "react-pro-sidebar/dist/css/styles.css";
//------------------
import { ProSidebar, Menu , MenuItem } from 'react-pro-sidebar';
import {Link} from 'react-router-dom' ;
import {useState , useEffect,useRef} from 'react'
//------
// import logo from '../../assets/neurveal logo.png'
import UserHolder from '../../assets/userHolder.jpg'

//------------------------- create item component
const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <MenuItem active={selected === title} style={{color: colors.grey[100] , margin : '-5px'}} onClick={() => setSelected(title)} icon={icon}>
            <Typography>{title}</Typography>
            <Link to={to} />
        </MenuItem>
    );
};

//----------------------------
const Topbar = () => {
    const refMenu = useRef();
    useEffect(()=>{
        let handler = (e)=>{
            if(!refMenu.current.contains(e.target)){
                setOpen(false);
            }
        }
        document.addEventListener('mousedown' , handler);
        return ()=>{
            document.removeEventListener('mousedown' , handler);
        }
    })
    const theme = useTheme();
    const colors = tokens(theme.palette.mode) ;
    const colorMode = useContext(ColorModeContext) ;
    //------------------------- profile
    const settingIcon = <SettingsOutlinedIcon/>;
    const profileIcon = <PersonOutlinedIcon/>;
    const logoutIcon = <ExitToAppIcon/>;
    //---------------------------
    const menus = [{title :'Profile' , to :'/profile' , icon : profileIcon} ,
    {title :'Setting' , to :'/setting' , icon : settingIcon} ,
    {title :'Logout' , to :'/logout' , icon : logoutIcon} ];
    const [selected , setSelected ]  = useState('') ;
    const [open , setOpen ]  = useState(false) ;
    //-------------
    return (
        <Box display ='flex' justifyContent="space-between" p={2} sx={{boxShadow: theme.palette.mode !== 'dark'&&`0px 11px 13px -15px ${colors.grey[500]}`,position:'sticky',
            top:'0px',zIndex:'100',backgroundColor: `${theme.palette.mode !== 'dark'?colors.primary[400]:colors.primary[500]}`}}>
            <Box display='flex' backgroundColor={colors.primary[400]} borderRadius='8px' sx={{boxShadow: `inset 1px 12px 20px -7px ${theme.palette.mode === 'dark' ?colors.primary[200]:colors.grey[500]}`}}>
                <InputBase sx={{ml:2 , flex: 1 }} placeholder="search" />
                <IconButton type='button' sx={{p:1 ,  color : `${colors.grey[100]} !important`}}>
                    <SearchIcon/>
                </IconButton>
            </Box>
            {/* <Box display="flex" justifyContent="center" alignItems="center" borderRadius='3px' sx={{overflow : 'hidden'}} >
                <img alt="profile-user" width="100px" height="100px" style={{minWidth : '300px' , maxHeight : '40px'}}
                src={logo}/>
            </Box> */}
            <Box  display ='flex'>
                <IconButton onClick={colorMode.toggelColorMode} sx={{color : `${colors.grey[100]} !important` , width:'40px' }}>
                    {theme.palette.mode === 'dark' ?(
                        <LightModeOutlinedIcon />
                        ):(
                        <DarkModeOutlinedIcon/>
                    )}
                </IconButton>
                <IconButton sx={{color : `${colors.grey[100]} !important`, width:'40px'}}><NotificationsOutlinedIcon/></IconButton>
                {/* <IconButton sx={{color : `${colors.grey[100]} !important`, width:'40px'}}><SettingsOutlinedIcon/></IconButton>
                <IconButton sx={{color : `${colors.grey[100]} !important`, width:'40px'}}><PersonOutlinedIcon/></IconButton> */}
                    <Box ref={refMenu} display="flex" justifyContent="center" alignItems="center" mr='15px' sx={{position: 'relative', padding : '0 9px 0 9px'}}
                        >
                        <img alt="profile-user" width="40px" height='40px' style={{ cursor: "pointer", borderRadius: "50%" ,border : '5px #ff822e solid'}}
                        src={UserHolder} onClick={()=>{setOpen(!open)}} />
                        {/* <Box sx={{padding:'4px' , width: '150px' , position: 'absolute', backgroundColor: `${colors.grey[900]}` , borderRadius : '11px',
                        boxShadow: `-1px -13px 25px -1px ${colors.primary[600]}`,top : '100%', right: '0', zindex:'100'}}>
                            <Menu iconShape="square" sx={{margin:'0'}} >
                                {menus.map((menu,i)=> <Item key={i} title={menu.title} to={`/${menu.to}`} icon={menu.icon} selected={selected}setSelected={setSelected}/>)}
                            </Menu>
                        </Box> */}
                        {open&&(
                        <Box  sx={{position: 'absolute', top:'60px', right:'-9px' , backgroundColor: `${colors.primary[400]}` , borderRadius : '11px',
                        boxShadow: `-1px 5px 20px -3px ${colors.grey[400]}`,zIndex: '100',padding :'7px' ,width:'300px',
                        '& .pro-inner-item:hover':{color: `#ff9a57 !important`},
                        '& .pro-menu-item.active':{color: `#fff2ea !important` },
                        '& .pro-sidebar-inner':{backgroundColor: `${colors.primary[400]} !important`},
                        '& .pro-icon-wrapper':{backgroundColor: `transparent !important`},
                        '& .pro-inner-item':{m:'auto', display:'flex',justifyContent:'space-around',alignItems:"center"},
                        '& .pro-item-content':{textAlign:'center'},
                        '&::before':{content: '""',position: 'absolute',top:'-10px', right:'27px',height:'20px',width:'20px',backgroundColor: `${colors.primary[400]}`,
                        transform:'rotate(45deg)'}}} ><ProSidebar><Menu iconShape="square" mt='5px' >
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <img alt="profile-user" width="100px" height="100px" style={{ cursor: "pointer", borderRadius: "50%",border : '7px #ff822e solid'}}
                                src={UserHolder}/>
                            </Box>
                            <Box textAlign="center" >
                                <Typography variant="h2" color={colors.grey[100]} fontWeight="bold" sx={{ m: "10px 0 0 0" }}>User Name</Typography>
                                <Typography variant="h5" color='#ff9a57'>User Title</Typography>
                            </Box >
                            <hr />
                            {menus.map((menu,i)=> <Item key={i} title={menu.title} to={menu.to} icon={menu.icon} selected={selected}setSelected={setSelected}/>)}
                            </Menu></ProSidebar>
                        </Box>)}

                    </Box>
                {/* <Box display ='flex' sx={{ml: '30px'}}>
                </Box> */}
                    {/* <Box textAlign="center" sx={{ml: '5px' ,padding:'0 0 0 5px', borderLeft : '5px orange solid'}}>
                        <Typography variant="h5" color={colors.grey[100]} fontWeight="bold" sx={{ m: "0 0 2px 0" }}>User Name</Typography>
                        <Typography variant="h6" color={colors.greenAccent[500]}>User Title</Typography>
                    </Box>  inside*/}
            </Box>
        </Box>
    )
} ;
export default Topbar ;