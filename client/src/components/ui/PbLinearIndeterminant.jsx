import { Box, LinearProgress } from '@mui/material';

const LinearIndeterminant = ({...props}) => {
    return (
        <Box sx={{ width: '100%' }}>
            <LinearProgress color={props.color ? props.color : 'primary'}/>
        </Box>
    );
}

export default LinearIndeterminant;