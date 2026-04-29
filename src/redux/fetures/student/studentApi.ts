import baseApi from "../../api/baseApi";

const academinSemesterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({ 
    createStudent: builder.mutation({
      query: (data) => ({
        url: "/create-faculty",
        method: "POST",
        body: data,
      }),
    }),

    getAllStudent: builder.query({
      query: () => ({
        url: "/getStudent",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateStudentMutation,
  useGetAllStudentQuery
} = academinSemesterApi;