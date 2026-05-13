

import baseApi from "../../api/baseApi";

const studentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOfferCorse: builder.mutation({
      query: (data) => ({
        url: "/createOfferCorse",
        method: "POST",
        body: data,
      }),
    }),

    getAllOfferCorse: builder.query({
      query: (args) => {
        const searchParams = new URLSearchParams();
        if (args?.length > 0) {
          args.forEach((item: { name: string; value: string }) => {
            if (item.value) searchParams.append(item.name, item.value);
          });
        }
        return {
          url: "/getOfferCorse",
          method: "GET",
          params: searchParams,
        };
      },
    }),

  }),
});

export const {
  useCreateOfferCorseMutation,
  useGetAllOfferCorseQuery,
} = studentApi;