import { User, authDataPassword } from "@src/types";
import { api } from "./api";
import { authState } from "../auth/authSlice";

export type ResponseLoginDataAuth = {
  refreshToken: string;
  accessToken: string;
  user: User;
};

export const authApi = api.injectEndpoints({
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
