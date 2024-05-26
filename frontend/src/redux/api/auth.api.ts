import { User, authDataPassword } from "@src/types";
import { api } from "./api";

export type ResponseLoginDataAuth = {
  token: string;
  user: User;
};

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    tryAuth: builder.mutation<ResponseLoginDataAuth, authDataPassword>({
      query: (data) => ({
        url: `/auth/login`,
        method: "post",
        body: { ...data },
      }),
    }),

    //TODO: logout
  }),
});

export const { useTryAuthMutation } = authApi;
