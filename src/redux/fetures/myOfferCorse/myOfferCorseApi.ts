

import baseApi from "../../api/baseApi";

const studentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
   
    getMyofferCorse: builder.query({
      query: (args) => {
        const searchParams = new URLSearchParams();
        if (args?.length > 0) {
          args.forEach((item: { name: string; value: string }) => {
            if (item.value) searchParams.append(item.name, item.value);
          });
        }
        return {
          url: `/getMyOffer/Corse`,
          method: "GET",
          params: searchParams,
        };
      },
    }),

  }),
});

export const {
  useGetMyofferCorseQuery
} = studentApi;