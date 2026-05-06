import baseApi from "../../api/baseApi";

const academinSemesterApi = baseApi.injectEndpoints({
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
        const searchParams= new URLSearchParams()

        searchParams.append("limit", args[0]);
     

        return {
        url: "/getStudent",
        method: "GET",
        params:searchParams
      }},
    }),
  }),
});

export const {
  useCreateStudentMutation,
  useGetAllStudentQuery
} = academinSemesterApi;