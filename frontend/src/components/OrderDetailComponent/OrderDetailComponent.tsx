import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, MenuItem } from "@mui/material";
import { useGetStatusListQuery } from "@src/redux/api/admin/orders";

export const OrderDetailComponent = ({ order, onStatusUpdate }) => {
  const { data: statusList, isLoading: statusLoading } =
    useGetStatusListQuery(null);
  const [statusId, setStatusId] = useState(order.status.id);

  const handleStatusChange = (event) => {
    setStatusId(event.target.value);
  };

  const handleUpdateClick = () => {
    onStatusUpdate(order.id, statusId);
  };

  if (statusLoading) {
    return <div>Loading status options...</div>;
  }

  return (
    <Box>
      <Typography variant="h4">Order Detail</Typography>
      <Typography variant="h6">Description: {order.description}</Typography>
      <Typography variant="h6">Car Number: {order.numberCar}</Typography>
      <Typography variant="h6">Address: {order.address}</Typography>
      <Typography variant="h6">Status: {order.status.title}</Typography>
      <TextField
        label="Update Status"
        value={statusId}
        onChange={handleStatusChange}
        select
        fullWidth
      >
        {statusList.map((status) => (
          <MenuItem key={status.id} value={status.id}>
            {status.title}
          </MenuItem>
        ))}
      </TextField>
      <Button onClick={handleUpdateClick}>Update Status</Button>
    </Box>
  );
};

export default OrderDetailComponent;
