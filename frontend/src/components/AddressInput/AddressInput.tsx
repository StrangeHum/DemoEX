import React from "react";
import { TextField, Box } from "@mui/material";

export const AddressInput = () => {
  return (
    <Box className="address-section">
      <TextField label="Адрес" variant="outlined" fullWidth margin="normal" />
      <Box
        id="map"
        sx={{ height: "200px", backgroundColor: "#e0e0e0", marginTop: "10px" }}
      ></Box>
    </Box>
  );
};

export default AddressInput;
