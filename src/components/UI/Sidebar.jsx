/* eslint-disable react/prop-types */
import {useState} from 'react' ;
import {Box, IconButton ,useTheme , Typography} from '@mui/material';
import {ProSidebar , Menu , MenuItem } from 'react-pro-sidebar';
import {Link} from 'react-router-dom' ;
import {tokens} from '../../theme' ;
import "react-pro-sidebar/dist/css/styles.css";
//-------------------------------icons
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import RuleIcon from '@mui/icons-material/Rule';
import BadgeIcon from '@mui/icons-material/Badge';
import FeedIcon from '@mui/icons-material/Feed';
import TimerIcon from '@mui/icons-material/Timer';
import HealingIcon from '@mui/icons-material/Healing';
//--------------------------------------------- user profile
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
// import UserHolder from '../../assets/userHolder.jpg'

//---- ------- logo
import logo from '../../assets/neurveal logo.png'





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

//------------------------------------
const Sidebar = () => {
    //---------------------------
    const theme = useTheme();
    const colors = tokens(theme.palette.mode) ;
    const [isCollapsed , setIsCollapsed] = useState(false) ;
    const [selected , setSelected ]  = useState('Dashboard') ;
    //----------------------------
    return (
            <Box sx={{'& .pro-sidebar-inner':{background:theme.palette.mode === 'dark'? `${colors.primary[400]} !important` :colors.primary[500]},
            '& .pro-icon-wrapper':{backgroundColor: `transparent !important`},
            '& .pro-inner-item':{padding: `5px 35px 5px 20px !important`,color:theme.palette.mode !== 'dark'&& `${colors.grey[900]} !important`},
            '& .pro-inner-item:hover':{color: `${theme.palette.mode === 'dark'?'#ff9a57 !important':'#ab4400 !important'}`},
            '& .pro-menu-item.active':{color: `#fff2ea !important` ,
            backgroundColor: '#ff822e' , borderRadius : '5px 0 0 8PX',
            boxShadow: `inset -1px -13px 25px -1px ${colors.primary[600]}`,
            borderBottom:`solid 2.5px #ff822e`,
            borderLeft:`solid 2.5px #ff822e`},
            boxShadow: `2px 1px 12px 1px ${theme.palette.mode !== 'dark'?colors.primary[100]:colors.primary[900]}`
            ,zIndex:'150',height:'100vh',position:'sticky', top:'0px'}}>
                <ProSidebar collapsed={isCollapsed}>
                    <Menu iconShape="square">
                    {/* LOGO AND MENU ICON */}
                    {!isCollapsed && (
                            // <Box mb="25px">
                            //     <Box display="flex" justifyContent="center" alignItems="center">
                            //         <img alt="profile-user" width="100px" height="100px" style={{ cursor: "pointer", borderRadius: "50%" }}
                            //         src={UserHolder}/>
                            //     </Box>
                            //     <Box textAlign="center">
                            //         <Typography variant="h2" color={colors.grey[100]} fontWeight="bold" sx={{ m: "10px 0 0 0" }}>User Name</Typography>
                            //         <Typography variant="h5" color={colors.greenAccent[500]}>User Title</Typography>
                            //     </Box>
                            // </Box>
                                <Box display="flex" justifyContent="center" alignItems="center" borderRadius='3px' sx={{overflow : 'hidden', cursor: "pointer"}} >
                                <img alt="logo" style={{padding : '1rem' , maxWidth: '100%' , maxHeight: '100%'}}
                                src={logo}/>
                                </Box>
                        )}
                        <MenuItem onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon /> : undefined} style={{margin: "30px 0 10px 0",
                        borderBottom : `solid 0.5px ${colors.grey[600]}`,color:`${theme.palette.mode !== 'dark'&& colors.grey[600]} !important`}} >
                        {!isCollapsed && (
                            <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                                <Typography variant="h3" fontWeight="bold"  color={colors.grey[600]} >Management</Typography>
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)} style={{
                                    color: '#eee',
                                    '&:hover' :{color: `${theme.palette.mode === 'dark'?'#ff9a57 !important':'#ab4400 !important'}`}
                                }}> <MenuOutlinedIcon /></IconButton>
                            </Box>
                        )}
                        </MenuItem>

                        <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                            <Item title="Dashboard" to="/" icon={<HomeOutlinedIcon/>} selected={selected} setSelected={setSelected} />
                            <Typography variant="h6"color={colors.grey[600]} fontWeight="bold" sx={{ m: "15px 0 5px 20px" }}>Pages</Typography>
                            <Item title="Users"to="/users"icon={<ContactsOutlinedIcon />} selected={selected}setSelected={setSelected}/>
                            <Item title="Branchs"to="/branchs" icon={<LocationOnIcon />} selected={selected} setSelected={setSelected}/>
                            <Item title="Groups" to="/groups" icon={<PeopleOutlinedIcon />} selected={selected} setSelected={setSelected} />
                            <Item title="Rights" to="/rights"icon={<RuleIcon />}selected={selected} setSelected={setSelected} />
                            <Item title="Doctors"to="/doctors" icon={<BadgeIcon />} selected={selected}setSelected={setSelected}/>
                            <Item title="Exams" to="/exams" icon={<FeedIcon />}selected={selected}setSelected={setSelected}/>
                            <Item title="Priority Status" to="/priority"icon={<TimerIcon />}selected={selected}setSelected={setSelected}/>
                            <Item title="Procedure"to="/procedure" icon={<HealingIcon />}selected={selected}setSelected={setSelected}/>
                        </Box>
                    </Menu>
                </ProSidebar>
            </Box>
    )
} ;
export default Sidebar ;