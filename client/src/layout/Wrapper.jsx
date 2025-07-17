import { Box, Container, Typography } from "@mui/material";
import Header from "./Header";
import Toast from "../components/ui/Toast";

const Wrapper = ({toast, setToast, children}) => {
    
    const handleClose = () => { setToast({ ...toast, open: false }) };

    return (
        <Box display="flex" flexDirection="column" minHeight="100vh">
            <Container sx={{ flex: 1 }}>
                <Header />
                {children}
            </Container>

            {/* Footer */}
            <Box component="footer" sx={{ py: 2, textAlign: 'center', backgroundColor: '#f5f5f5' }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold'}}>Powered by Alem Tilsimat</Typography>
            </Box>

            {/* Toast */}
            {toast?.open && (
                <Toast open={toast.open} message={toast.message} severity={toast.severity} onClose={handleClose} />
            )}
        </Box>
    );
}

export default Wrapper;