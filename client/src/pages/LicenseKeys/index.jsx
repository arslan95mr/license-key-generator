import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import AxiosHelper from '../../api/AxiosHelper';
import { useNavigate } from "react-router-dom";
import { Container, Button, Table, TableHead, TableRow, TableCell, TableBody, TextField, Box, IconButton, TableFooter } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Wrapper from "../../layout/Wrapper";
import SearchBox from "../../components/ui/SearchBox";
import LicenseExpirationDate from "../../components/ui/LicenseExpirationDate";

const LicenseKeys = () => {
    const { setLoading } = useAuth();
    const navigate = useNavigate();

    const [licenses, setLicenses] = useState([]);
    const [search, setSearch] = useState('');
    const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

    useEffect(() => {
        getLicenseKeys();
    }, []);

    const getLicenseKeys = () => {
        setLoading(true);
        AxiosHelper.getLicenseKeys().then((res) => {
            if (res.status == 200) {
                setLicenses(res.data.data);
            }
        }).finally(() => {setLoading(false)});
    }

    const filtered = licenses.filter(l => l.customer.toLowerCase().includes(search.toLowerCase()) );

    const downloadKey = (filename) => {
        setLoading(true);

        AxiosHelper.download(filename, { responseType: 'blob'}).then((res) => {
            if (res.status == 200) {
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', filename);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }).catch(() => {
            setToast({ open: true, message: "Server error occurred", severity: "error" });
        }).finally(() => {setLoading(false)});
    }

    const deleteKey = (filename) => {
        if (!window.confirm("Are you sure you want to delete this license key?")) return;

        setLoading(true);
        AxiosHelper.delete(filename).then((res) => {
            if (res.status === 200) {
                setToast({ open: true, message: "License deleted", severity: "success" });
                getLicenseKeys(); // Refresh list
            }
        }).catch(() => {
            setToast({ open: true, message: "Server error occurred", severity: "error" });
        }).finally(() => { setLoading(false); });
    };

    return (
        <Wrapper toast={toast} setToast={setToast}>
            <Container sx={{ mt: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <SearchBox value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by Email"/>
                    <Button variant="contained" color="primary" onClick={() => navigate("/create")}startIcon={<AddIcon />}>Create</Button>
                </Box>
                <Table>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Customer</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Issued At</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Expires At</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {filtered.map((license, i) => (
                        <TableRow key={i}>
                            <TableCell sx={{ py: 0 }}>{license.licenseId}</TableCell>
                            <TableCell sx={{ py: 0 }}>{license.customer}</TableCell>
                            <TableCell sx={{ py: 0 }}>{license.type}</TableCell>
                            <TableCell sx={{ py: 0 }}>{new Date(license.issuedAt).toLocaleDateString()}</TableCell>
                            <TableCell sx={{ py: 0 }}><LicenseExpirationDate expiresAt={license.expiresAt} /></TableCell>
                            <TableCell sx={{ py: 0 }} align="center">
                                <IconButton color="primary" onClick={() => downloadKey(license.filename)}>
                                    <DownloadIcon />
                                </IconButton>
                                <IconButton color="error" onClick={() => deleteKey(license.filename)}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={6} align="right" sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>
                                Total: {filtered.length} license{filtered.length !== 1 && 's'}
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </Container>
        </Wrapper>
    );
}

export default LicenseKeys;