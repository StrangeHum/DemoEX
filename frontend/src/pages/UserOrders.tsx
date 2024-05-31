import { useUserOrdersQuery } from "@src/redux/api/userOrders.api";
import { selectCurrentUser } from "@src/redux/auth/authSlice";
import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

export const UserOrders = () => {
  //TODO: Создать нормальную защиту роутинга
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    if (!user || user.firstName == "") {
      navigate("/login");
      return;
    }
  }, [user, navigate]);

  const { data, isError, isSuccess, isLoading } = useUserOrdersQuery();

  useEffect(() => {
    if (isSuccess) {
    }
  }, [isSuccess]);

  if (isError) {
    return <div>error</div>;
  }

  if (isLoading) {
    return <div>Load...</div>;
  }

  const OrdersComponent = () => {
    if (!data) {
      return <div>Нет заявлений...</div>;
    }

    return data.orders.map((order, id) => (
      <button
        onClick={(e) => {
          navigate(`/orders/${order.id}`);
        }}
        key={order.id}
      >
        {order.description} - {order.status?.title}
      </button>
    ));
  };

  return (
    <>
      {OrdersComponent()}
      <Outlet />
      {/* <FileUploadComponent /> */}
    </>
  );
};
