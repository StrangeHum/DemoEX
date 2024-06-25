import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryRefreshToken } from "../baseQuery";
import { User, UserRole } from "@src/types";
import { adminApi } from "./admin.api";

type EditUserRoleDTO = {
  userId: number;
  role: UserRole;
};

const userAdminApiWithTag = adminApi.enhanceEndpoints({
  addTagTypes: ["Users"],
});

export const usersAdminApi = userAdminApiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    setUserRole: builder.mutation<User, EditUserRoleDTO>({
      query: (data) => ({
        url: `/users/setrole`,
        method: "post",
        body: { ...data },
      }),
      invalidatesTags: ["Users"],
    }),
    getUsers: builder.query<User[], null>({
      query: (data) => ({
        url: `/users`,
        method: "get",
      }),
    }),
  }),
});

export const { useGetUsersQuery, useSetUserRoleMutation } = usersAdminApi;
