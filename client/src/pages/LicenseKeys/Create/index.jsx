import { useState } from "react";
import useAuth from '../../../hooks/useAuth';
import AxiosHelper from '../../../api/AxiosHelper';
import { useNavigate } from "react-router-dom";
import { Container, TextField, Select, MenuItem, InputLabel, FormControl, Button, Typography, Box, Paper } from "@mui/material";
import Wrapper from "../../../layout/Wrapper";

const LicenseKeyForm = () => {
    const { setLoading } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({ customer: '', type: 'MONTHLY' });
    const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (event) => {
        event.preventDefault();

        setLoading(true);

        AxiosHelper.generate(form).then((res) => {
            if (res.status === 200) {
                setToast({ open: true, message: "License generated successfully!", severity: "success" });
                setTimeout(() => navigate(-1), 1500);
            } else {
                setToast({ open: true, message: "Failed to generate license", severity: "error" });
            }
        }).catch(() => {
            setToast({ open: true, message: "Server error occurred", severity: "error" });
        }).finally(() => {setLoading(false)});
    }

    return (
        <Wrapper toast={toast} setToast={setToast}>
            <Container maxWidth="sm" sx={{ mt: 6 }}>
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Typography variant="h5" align="center" gutterBottom>Generate License</Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
                        <TextField label="Customer Email" name="customer" value={form.customer} onChange={handleChange} required fullWidth size="small"/>
                        <FormControl fullWidth size="small">
                            <InputLabel id="type-label">Subscription Type</InputLabel>
                            <Select labelId="type-label" name="type" value={form.type} label="Subscription Type" onChange={handleChange}>
                                <MenuItem value="MONTHLY">Monthly</MenuItem>
                                <MenuItem value="YEARLY">Yearly</MenuItem>
                                <MenuItem value="LIFETIME">Lifetime</MenuItem>
                            </Select>
                        </FormControl>
                        <Button variant="contained" type="submit" fullWidth size="medium">Generate License</Button>
                    </Box>
                </Paper>
            </Container>
        </Wrapper>
    );
}

export default LicenseKeyForm;