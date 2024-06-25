import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQuery, baseQueryRefreshToken } from "./baseQuery";
import { RootStore } from "../store";
import { OrderType } from "@src/types";

export type UploadFileDTO = {
  orderId: number;
  file: File;
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
    orderData: builder.query<OrderType, number>({
      query: (data) => ({
        url: `/orders`,
        method: "get",
      }),
      providesTags: ["Orders"],
    }),
    getFile: builder.query<Blob, { idOrder: number; idFile: number }>({
      query: (payload) => ({
        url: `/${payload.idOrder}/file/${payload.idFile}`,
        method: "get",
        responseHandler: (response) => response.blob(),
      }),
    }),

    uploadFile: builder.mutation<any, FormData>({
      query: (formData) => {
        return {
          url: `/orders/uploadFile`,
          method: "post",
          headers: {
            "Content-Type": "multipart/form-data;",
          },
          body: formData,
          formData: true,
        };
      },
      invalidatesTags: ["Orders"],
    }),
    createOrder: builder.mutation<any, FormData>({
      query: (data) => ({
        url: `/orders/create`,
        method: "post",
        body: { ...data },
        // formData: true,
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useUserOrdersQuery,
  useOrderDataQuery,
  useUploadFileMutation,
  useGetFileQuery,
  useCreateOrderMutation,
} = apiOrders;
