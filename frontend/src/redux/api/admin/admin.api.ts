import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryRefreshToken } from "../baseQuery";
import { User } from "@src/types";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: baseQueryRefreshToken,
  endpoints: (builder) => ({}),
});
