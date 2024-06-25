import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryRefreshToken } from "../baseQuery";
import { OrderStatus, User, UserRole } from "@src/types";
import { adminApi } from "./admin.api";
import { OrderType } from "@src/types";

type EditStatusOrderDTO = {
  orderId: number;
  statusId: number;
};

const ordersAdminApiWithTag = adminApi.enhanceEndpoints({
  addTagTypes: ["Orders"],
});

export const ordersAdminApi = ordersAdminApiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    EditStatusOrder: builder.mutation<OrderType, EditStatusOrderDTO>({
      query: (data) => ({
        url: `/orders/set`,
        method: "post",
        body: { ...data },
      }),
      invalidatesTags: ["Orders"],
    }),
    GetOrders: builder.query<OrderType[], null>({
      query: (data) => ({
        url: `/orders/allorders`,
        method: "get",
      }),
    }),
    GetStatusList: builder.query<OrderStatus[], null>({
      query: (data) => ({
        url: `/orders/statuslist`,
        method: "get",
      }),
    }),
  }),
});

export const {
  useEditStatusOrderMutation,
  useGetOrdersQuery,
  useGetStatusListQuery,
} = ordersAdminApi;
