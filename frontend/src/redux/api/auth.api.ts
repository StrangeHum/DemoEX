import { User, authDataPassword } from "@src/types";
import { api } from "./api";
import { authState } from "../auth/authSlice";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export type ResponseLoginDataAuth = {
  refreshToken: string;
  accessToken: string;
  user: User;
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    tryAuth: builder.mutation<authState, authDataPassword>({
      query: (data) => ({
        url: `/auth/login`,
        method: "post",
        body: { ...data },
      }),
    }),
  }),
});

export const { useTryAuthMutation } = authApi;
