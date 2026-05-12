

import baseApi from "../../api/baseApi";

const studentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createRegisterSemester: builder.mutation({
      query: (data) => ({
        url: "/create-register",
        method: "POST",
        body: data,
      }),
    }),

    getAllRegister: builder.query({
      query: (args) => {
        const searchParams = new URLSearchParams();
        if (args?.length > 0) {
          args.forEach((item: { name: string; value: string }) => {
            if (item.value) searchParams.append(item.name, item.value);
          });
        }
        return {
          url: "/get-allRegister",
          method: "GET",
          params: searchParams,
        };
      },
    }),
  }),
});

export const {
  useCreateRegisterSemesterMutation,
  useGetAllRegisterQuery,
} = studentApi;