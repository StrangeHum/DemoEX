import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryRefreshToken } from "./baseQuery";

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryRefreshToken,
  endpoints: () => ({}), // Пустые эндпоинты, будут инжектироваться позже
});
