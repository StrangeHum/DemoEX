import storage from "redux-persist/lib/storage"; // Используем localStorage

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

export default persistConfig;
