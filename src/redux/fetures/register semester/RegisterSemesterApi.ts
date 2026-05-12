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
      query: () => ({
        url: "/get-allRegister",
        method: "GET",
      }),
    }),

    // ✅ UPDATE API
    updateRegisterSemester: builder.mutation({
      query: ({ id, data }) => ({
        url: `/update-register/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateRegisterSemesterMutation,
  useGetAllRegisterQuery,
  useUpdateRegisterSemesterMutation, // ✅ add this
} = studentApi;