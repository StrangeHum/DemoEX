import { useUserOrdersQuery } from "@src/redux/api/userOrders.api";
import { selectCurrentUser } from "@src/redux/auth/authSlice";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";

export const OrderPage = () => {
  const id = useParams().id;

  if (!id) {
    return "err";
  }

  // const { data, isError, isSuccess, isLoading } = useUserOrdersQuery();

  // useEffect(() => {
  //   if (isSuccess) {
  //   }
  // }, [isSuccess]);

  // if (isError) {
  //   return <div>error</div>;
  // }

  // if (isLoading) {
  //   return <div>Load...</div>;
  // }

  // const Foo = () => {
  //   if (!data) {
  //     return <div>Нет заявлений...</div>;
  //   }

  //   return data.orders.map((order, id) => (
  //     <button
  //       onClick={(e) => {
  //         navigate(`/orders/:${order.id}`);
  //       }}
  //       key={order.id}
  //     >
  //       {order.description}
  //     </button>
  //   ));
  // };

  // return <>{Foo()}</>;
  return <div>{id}</div>;
};
