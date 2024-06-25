import React from "react";
import { List, ListItem, ListItemText, Divider } from "@mui/material";
import { OrderType } from "@src/types";

interface OrderListProps {
  orders: OrderType[];
  onOrderClick: Function;
}

export const OrderListComponent = ({
  orders,
  onOrderClick,
}: OrderListProps) => {
  if (!orders || orders.length === 0) {
    return <div>Нет заявлений</div>;
  }

  return (
    <List>
      {orders.map((order) => (
        <ListItem button key={order.id} onClick={() => onOrderClick(order)}>
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

export default OrderListComponent;
