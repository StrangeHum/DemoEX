import React from "react";
import { TextField, Button, Box } from "@mui/material";

export const IncidentForm = () => {
  return (
    <Box component="form" className="statement-form">
      <Box className="car-info-section">
        <TextField
          label="Номер машины"
          variant="outlined"
          fullWidth
          margin="normal"
        />
      </Box>
      <Box className="description-section">
        <TextField
          label="Описание происшествия"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          margin="normal"
        />
      </Box>
      <Button type="submit" variant="contained" color="primary">
        Отправить
      </Button>
    </Box>
  );
};

export default IncidentForm;
