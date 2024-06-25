import { TextField } from "@mui/material";
import styles from "./FilterOrders.module.scss";
import { OrderListComponent } from "../OrderListComponent";
import { useState } from "react";

interface OrderListProps {
  orders: OrderType[];
  onOrderClick: Function;
}

export const FilterOrders = ({ orders, onOrderClick }: OrderListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilter = (status) => {
    setFilterStatus(status);
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!filterStatus || order.status.title === filterStatus)
  );

  return (
    <div className={styles.filterOrders}>
      <TextField
        label="Search"
        value={searchTerm}
        onChange={handleSearch}
        fullWidth
      />
      <OrderListComponent orders={filteredOrders} onOrderClick={onOrderClick} />
    </div>
  );
};

export default FilterOrders;
