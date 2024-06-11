import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQuery, baseQueryRefreshToken } from "./baseQuery";
import { RootStore } from "../store";

export type DataFileOrder = {
  id: number;
  filename: string;
  path: string;
  orderId: number;
  order: string;
};

export type OrderType = {
  id: number;
  userId: number;
  statusId: number;
  status: {
    id: number;
    title: string;
  };
  description: string;
  numberCar: string;
  address: string;
  files: DataFileOrder[];
};

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
          url: `/orders/uploadfile`,
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
  }),
});

export const {
  useUserOrdersQuery,
  useOrderDataQuery,
  useUploadFileMutation,
  useGetFileQuery,
} = apiOrders;
