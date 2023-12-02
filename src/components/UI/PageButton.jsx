/* eslint-disable react/prop-types */
import { Box , Button ,useTheme} from "@mui/material";
import { tokens } from "../../theme";

function PageButton({btnIcon,title,action,type,disabled}) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box>
            <Button sx={{ boxShadow: `-1px 5px 20px -3px ${colors.grey[400]}`,borderRadius : '10px',backgroundColor: '#ff822e',m:'10px',
                color: '#fff',fontSize: "14px",fontWeight: "bold",padding: "10px 20px",
                '&:hover':{color: `${theme.palette.mode === 'dark'?'#ff9a57 !important':'#ab4400 !important'}`,
                border: `solid 1px ${theme.palette.mode === 'dark'?'#ff9a57 !important':'#ab4400 !important'}`}}} onClick={action} type={type} disabled={disabled}>
                {btnIcon}
                {title}
            </Button>
        </Box>
    );
}

export default PageButton
