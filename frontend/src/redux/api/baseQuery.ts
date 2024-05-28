import { BaseQueryFn, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import store, { RootStore } from "../store";
import {
  authState,
  logout,
  setCredentials,
  updateAccessToken,
} from "../auth/authSlice";

export const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000",
  // credentials: "same-origin",
  prepareHeaders: (headers, { getState }) => {
    headers.set("Content-Type", "application/json");

    var accessToken: string | null = null;

    accessToken = (getState() as RootStore).auth.accessToken;

    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`);
    } else {
      accessToken = localStorage.getItem("token");

      if (accessToken) {
        headers.set("authorization", `Bearer ${accessToken}`);
      }
    }

    return headers;
  },
});

export const baseQueryRefreshToken: BaseQueryFn = async (
  args,
  api,
  extraOptions
) => {
  var result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    console.log("sending refresh token");
    // send refresh token to get new access token
    var refreshResult = await baseQuery("/auth/refresh", api, extraOptions);

    var data = refreshResult.data as { accessToken: string };

    console.log(refreshResult);
    if (data) {
      // var state = api.getState() as RootStore;

      // var user = state.auth.user;

      // store the new token
      api.dispatch(updateAccessToken(data.accessToken));
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};
