import { useUserOrdersQuery } from "@src/redux/api/userOrders.api";
import { selectCurrentUser } from "@src/redux/auth/authSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router";
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

  const Foo = () => {
    if (!data) {
      return <div>Нет заявлений...</div>;
    }

    return data.orders.map((order, id) => (
      <div key={id}>{order.description}</div>
    ));
  };

  return <>{Foo()}</>;
};
