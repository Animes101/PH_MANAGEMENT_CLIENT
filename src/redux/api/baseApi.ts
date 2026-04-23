// baseApi.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";

const baseQuery= fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1",
    credentials:"include",
    prepareHeaders: (headers, { getState }) => {

    const token =(getState() as RootState).auth.accessToken

    // If we have a token set in state, let's assume that we should be passing it.
    if (token) {
      headers.set("Authorization", token)
    }

    return headers
  },
  })

  const baseQuery

const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  endpoints: () => ({}),
  
});

export default baseApi;