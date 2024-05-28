import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryRefreshToken } from "./baseQuery";

export type OrderType = {
  id: 0;
  userId: 0;
  statusId: 0;
  status: {
    id: 0;
    title: "string";
  };
  description: "string";
  numberCar: "string";
  address: "string";
  files: [
    {
      filename: "string";
      path: "string";
      orderId: 0;
      order: "string";
    }
  ];
};

export type ResponseOrderData = {
  orders: OrderType[];
};

export const apiOrders = createApi({
  reducerPath: "orders",
  tagTypes: ["Orders"],
  baseQuery: baseQueryRefreshToken,
  endpoints: (builder) => ({
    userOrders: builder.query<ResponseOrderData, void>({
      query: (data) => ({
        url: `/orders`,
        method: "get",
      }),
      providesTags: ["Orders"],
    }),
  }),
});

export const { useUserOrdersQuery } = apiOrders;
