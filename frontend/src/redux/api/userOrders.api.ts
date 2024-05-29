import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQuery, baseQueryRefreshToken } from "./baseQuery";
import { RootStore } from "../store";

export type DataFileOrder = {
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
    orderData: builder.query<ResponseOrderData, number>({
      query: (data) => ({
        url: `/orders`,
        method: "get",
      }),
      providesTags: ["Orders"],
    }),
    //TODO: Загрузить
    getFile: builder.query<Blob, number>({
      query: (id) => ({
        url: `/file/${id}`,
        method: "get",
        responseHandler: (response) => response.blob(), // Указываем обработчик ответа для получения Blob
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
    }),
  }),
});

export const { useUserOrdersQuery, useUploadFileMutation, useGetFileQuery } =
  apiOrders;
