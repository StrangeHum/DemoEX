import React, { useState } from "react";
import { Container, Box, TextField, CircularProgress } from "@mui/material";
import {
  useEditStatusOrderMutation,
  useGetOrdersQuery,
} from "@src/redux/api/admin/orders";
import { OrderListComponent } from "@components/OrderListComponent";
import { OrderDetailComponent } from "@components/OrderDetailComponent";
import { FilterOrders } from "@src/components/FilterOrders";

export const OrdersPanelPage = () => {
  const { data, isLoading, isError } = useGetOrdersQuery(null);
  const [updateStatus] = useEditStatusOrderMutation();
  const [selectedOrder, setSelectedOrder] = useState(null);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <div>Error loading orders</div>;
  }

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const handleStatusUpdate = (orderId, statusId) => {
    updateStatus({ orderId, statusId });
  };

  return (
    <Container>
      <Box>
        <FilterOrders orders={data} onOrderClick={handleOrderClick} />
        {selectedOrder && (
          <OrderDetailComponent
            order={selectedOrder}
            onStatusUpdate={handleStatusUpdate}
          />
        )}
      </Box>
    </Container>
  );
};

export default OrdersPanelPage;
