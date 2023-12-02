/* eslint-disable react/prop-types */
import SearchIcon from '@mui/icons-material/Search';
import {InputBase,IconButton,useTheme } from '@mui/material';
import {useState} from "react";
// import { Box , Button ,useTheme} from "@mui/material";
import { tokens } from "../../theme";


export const SearchBar = ({toBeSearched, handleSearch}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [searchValue, setSearchValue] = useState('');
    const handleInputChange = (e) => {
        setSearchValue(e.target.value);
        handleSearch(e.target.value);
    };

    return (
        // <OutlinedInput
        //     defaultValue=""
        //     fullWidth
        //     placeholder={`Search ${toBeSearched}`}
        //     startAdornment={(
        //         <InputAdornment position="start">
        //             <SvgIcon className = {'icon'} fontSize="small">
        //                 <SearchIcon />
        //             </SvgIcon>
        //         </InputAdornment>
        //     )}
        //     value = {searchValue}
        //     onChange={handleInputChange}
        // />
        <>
            <InputBase sx={{ml:2 , flex: 1 }} placeholder={`Search ${toBeSearched}`} value = {searchValue} onChange={handleInputChange}/>
            <IconButton type='button' sx={{p:1 ,  color : `${colors.grey[100]} !important`}}>
                <SearchIcon/>
            </IconButton> 
        </>
    )
}



