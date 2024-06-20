import React, { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import {
  useUserOrdersQuery,
  useUploadFileMutation,
} from "@src/redux/api/userOrders.api";
import { selectCurrentUser } from "@src/redux/auth/authSlice";
import {
  TextField,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
} from "@mui/material";
// import { FileUploadComponent } from "@src/components/FileUploadComponent";
import styles from "./UserOrders.module.scss"; // SCSS module

export const UserOrders = () => {
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    if (!user || user.firstName === "") {
      navigate("/login");
      return;
    }
  }, [user, navigate]);

  const { data, isError, isSuccess, isLoading } = useUserOrdersQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    if (isSuccess) {
      // Handle success case
    }
  }, [isSuccess]);

  if (isError) {
    return <div>error</div>;
  }

  if (isLoading) {
    return <div>Load...</div>;
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilter = (status) => {
    setFilterStatus(status);
  };

  const filteredOrders = data?.orders.filter(
    (order) =>
      order.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!filterStatus || order.status.title === filterStatus)
  );

  const OrdersComponent = () => {
    if (!filteredOrders || filteredOrders.length === 0) {
      return <div>Нет заявлений...</div>;
    }

    return (
      <List>
        {filteredOrders.map((order) => (
          <ListItem
            button
            key={order.id}
            onClick={() => navigate(`/orders/${order.id}`)}
          >
            <ListItemText
              primary={order.description}
              secondary={order.status?.title}
            />
            <Divider />
          </ListItem>
        ))}
      </List>
    );
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.ordersContainer}>
        <Typography variant="h4">User Orders</Typography>
        <TextField
          label="Search"
          value={searchTerm}
          onChange={handleSearch}
          fullWidth
        />
        {OrdersComponent()}
        {/* <FileUploadComponent /> */}
      </Box>
      {/* Add filter dropdown for status if necessary */}

      <Box className={styles.outletContainer}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default UserOrders;
