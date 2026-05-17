

import baseApi from "../../api/baseApi";

const studentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => {
       
        return {
          url: `/get-me`,
          method: "GET",
        };
      },
    }),

  }),
});

export const {
  useGetMeQuery
} = studentApi;