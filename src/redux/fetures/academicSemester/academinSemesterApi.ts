import baseApi from "../../api/baseApi";

const academinSemesterApi=baseApi.injectEndpoints({
    endpoints: (builder) => ({
    getAllSemester: builder.query({
      query: () => ({
        url: "/get-all-semesters",
        method: "GET",
      }),
    }),
  }),

})


export const {useGetAllSemesterQuery}=academinSemesterApi