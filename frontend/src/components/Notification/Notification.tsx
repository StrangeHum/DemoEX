import React from "react";
import { Box, Typography } from "@mui/material";

interface NotificationProps {
  message: string;
  type: "error" | "success";
  open: boolean;
}

export const Notification: React.FC<NotificationProps> = ({
  message,
  type,
  open,
}) => {
  if (!open) {
    return null;
  }

  return (
    <Box
      sx={{
        padding: 2,
        backgroundColor: type === "error" ? "red" : "green",
        color: "white",
        borderRadius: 1,
        mt: 2,
        textAlign: "center",
      }}
    >
      <Typography>{message}</Typography>
    </Box>
  );
};

export default Notification;
