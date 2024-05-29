import { BaseQueryFn, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootStore } from "../store";
import {
  logout,
  selectRefreshToken,
  updateAccessToken,
} from "../auth/authSlice";

export const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000",
  // credentials: "same-origin",
  prepareHeaders: (headers, { getState }) => {
    // headers.set("Content-Type", "application/json");

    var accessToken: string | null = null;
    const state = getState() as RootStore;

    accessToken = state.auth.accessToken;

    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`);
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

  if (result?.error?.status === 401) {
    console.log("Try update Token");
    const store = api.getState() as RootStore;

    var refreshToken = selectRefreshToken(store);

    if (!refreshToken) {
      api.dispatch(logout());
      return result;
    }

    var refreshResult = await baseQuery(
      {
        url: "/auth/refresh",
        method: "POST",
        body: { refresh: refreshToken },
      },
      api,
      extraOptions
    );

    var data = refreshResult.data as { accessToken: string };

    if (data) {
      console.log("Успех");
      api.dispatch(updateAccessToken(data.accessToken));

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
      window.location.href = "/login";
    }
  }

  return result;
};
