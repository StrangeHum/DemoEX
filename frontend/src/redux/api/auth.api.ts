import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AuthData } from "@src/types";

export const authApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    credentials: "same-origin",
    prepareHeaders: (headers) => {
      // const accessToken = localStorage.getItem("token");
      // if (accessToken) {
      //   headers.set("authorization", `Bearer ${accessToken}`);
      //   headers.set("Content-Type", "application/json");
      // }
      // headers.set("Content-Type", "application/json");
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["user"],

  endpoints: (builder) => ({
    tryAuth: builder.mutation<
      { id: number; login: string; token: string },
      AuthData
    >({
      query: (data) => ({
        url: `/auth/login`,
        method: "post",
        body: data,
      }),
    }),
  }),
});

export const { useTryAuthMutation } = authApi;
