import { Typography } from "@mui/material";

const LicenseExpirationDate = ({ expiresAt }) => {
  if (!expiresAt) {
    return <Typography color="success.main">Lifetime</Typography>;
  }

  const expiryDate = new Date(expiresAt);
  const now = new Date();
  const isExpired = expiryDate < now;

  return (
    <Typography fontSize={14} bgcolor={isExpired ? "error.main" : "success.main"} color={"white"} textAlign={'center'} borderRadius={2}>
      {expiryDate.toLocaleDateString()}
    </Typography>
  );
};

export default LicenseExpirationDate;
