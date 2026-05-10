

import baseApi from "../../api/baseApi";

const studentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createStudent: builder.mutation({
      query: (data) => ({
        url: "/user/create-Student",
        method: "POST",
        body: data,
      }),
    }),

    getAllStudent: builder.query({
      query: (args) => {
        const searchParams = new URLSearchParams();
        if (args?.length > 0) {
          args.forEach((item: { name: string; value: string }) => {
            if (item.value) searchParams.append(item.name, item.value);
          });
        }
        return {
          url: "/getStudent",
          method: "GET",
          params: searchParams,
        };
      },
    }),

  }),
});

export const {
  useCreateStudentMutation,
  useGetAllStudentQuery,
} = studentApi;