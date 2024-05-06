import { AppDispatch, RootStore } from "@src/redux/store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { setFirstName } from "@src/redux/user/userSlice";

export const useAppDispatch = () => useDispatch<AppDispatch>(); //Такой подход позволяет создавать модульную архитектуру
export const useAppSelector: TypedUseSelectorHook<RootStore> = () =>
  useSelector;
