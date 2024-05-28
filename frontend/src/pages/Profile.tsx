import { selectCurrentUser } from "@src/redux/auth/authSlice";
import store from "@src/redux/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export const Profile = () => {
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    if (!user || user.firstName == "") {
      navigate("/login");
      return;
    }
  }, [user, navigate]);

  return (
    <div>
      {user?.firstName} {user?.email} {user?.phone}
    </div>
  );
};
