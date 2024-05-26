import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000",
  //   credentials: "include",
  prepareHeaders: (headers) => {
    // const {} = api;
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

const customBaseQuery = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  console.log(result);

  if (Math.random() < 0.5) return { error: "Too high!" };

  return { data: "All good!" };
};

export const testApi = createApi({
  reducerPath: "testApi",
  baseQuery: customBaseQuery,

  endpoints: (builder) => ({
    test1: builder.query<any, any>({
      query: (data) => ({
        url: `/`,
        method: "get",
        // params: data,
      }),
    }),
  }),
});

export const { useTest1Query } = testApi;
