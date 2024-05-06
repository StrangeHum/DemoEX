import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000",
  //   credentials: "same-origin",
  prepareHeaders: (headers) => {
    //TODO: Попытка вытащить token
    // const accessToken = localStorage.getItem("token");
    // if (accessToken) {
    //   headers.set("authorization", `Bearer ${accessToken}`);
    //   headers.set("Content-Type", "application/json");
    // }
    headers.set("Content-Type", "application/json");
    return headers;
  },
});
