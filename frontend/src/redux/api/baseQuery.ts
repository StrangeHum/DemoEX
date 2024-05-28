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
    headers.set("Content-Type", "application/json");

    var accessToken: string | null = null;
    const state = getState() as RootStore;

    accessToken = state.auth.accessToken;

    if (!accessToken) {
      accessToken = localStorage.getItem("token");
    }

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
    const store = api.getState() as RootStore;

    var refreshToken = selectRefreshToken(store);

    //Если токена нет в сторе
    if (!refreshToken) {
      refreshToken = localStorage.getItem("refreshToken");
    }

    console.log(refreshToken);

    //Если всёравно нет токена для обновления
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

    console.log(refreshResult);

    if (data) {
      api.dispatch(updateAccessToken(data.accessToken));
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
      window.location.href = "/login";
    }
  }

  return result;
};
