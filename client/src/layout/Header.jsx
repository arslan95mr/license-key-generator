import { useNavigate } from "react-router-dom";
import useAuth from "./../hooks/useAuth";
import icLogo from "../assets/svg/ic_logo.svg";
import LinearIndeterminant from "./../components/ui/PbLinearIndeterminant";
import { Box, Container, Typography } from "@mui/material";

const Header = () => {
    const { loading } = useAuth();
    const navigate = useNavigate();

    return (
        <Container>
            <Box display="flex" alignItems="center" >
                <img src={icLogo} onClick={() => navigate('/')} alt="logo" style={{width: '60px'}}/>
                <Typography variant="h3" sx={{ m: 3}}>License Key Generator</Typography>
            </Box>
            {loading && <LinearIndeterminant/>}
        </Container>
    );
}

export default Header;