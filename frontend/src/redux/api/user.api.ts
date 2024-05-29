import { User, authDataPassword } from "@src/types";
import { baseQueryRefreshToken } from "./baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export interface CreateUserDto {
  user: User;
  authData: authDataPassword;
}

export const signinApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryRefreshToken,
  endpoints: (builder) => ({
    signin: builder.mutation<User, CreateUserDto>({
      query: (data) => ({
        url: `/users/create`,
        method: "post",
        body: { ...data },
      }),
    }),
  }),
});

export const { useSigninMutation } = signinApi;
