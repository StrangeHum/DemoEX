import { bindActionCreators } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { actions } from "@src/redux/user/userSlice";

const rootActions = {
  ...actions,
};

export const useActions = () => {
  const dispath = useDispatch();

  return useMemo(() => {
    return bindActionCreators(rootActions, dispath);
  }, [dispath]);
};
