// baseApi.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";
import { setUser } from "../fetures/auth/authSlice";

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
  

  const baseQueryRefressToken=async ( args,
  api,
  extraOptions)=>{

    let result= await baseQuery(args, api, extraOptions)

    if(result?.error?.status === 406){

      const res=  await fetch('http://localhost:5000/api/v1/acessToken',{
        method:'POST',
        credentials: "include"

      })

      const data=await res.json();

      const user=(api.getState() as  RootState).auth.user;

      console.log(user)

     if (user) {
      api.dispatch(setUser({
        user,
        accessToken: data.data
      }));
}


result= await baseQuery(args, api, extraOptions)
      
    }


    return result


  }

const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryRefressToken,
  endpoints: () => ({}),
  
});

export default baseApi;


