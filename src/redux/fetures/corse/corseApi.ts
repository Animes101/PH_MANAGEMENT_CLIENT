

import baseApi from "../../api/baseApi";

const studentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCorse: builder.mutation({
      query: (data) => ({
        url: "/create-corse",
        method: "POST",
        body: data,
      }),
    }),

    getAllCorse: builder.query({
      query: (args) => {
        const searchParams = new URLSearchParams();
        if (args?.length > 0) {
          args.forEach((item: { name: string; value: string }) => {
            if (item.value) searchParams.append(item.name, item.value);
          });
        }
        return {
          url: "/get-allCorse",
          method: "GET",
          params: searchParams,
        };
      },
    }),

  }),
});

export const {
  useCreateCorseMutation,
  useGetAllCorseQuery,
} = studentApi;