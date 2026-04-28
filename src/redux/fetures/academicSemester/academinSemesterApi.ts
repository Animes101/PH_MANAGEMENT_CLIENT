import baseApi from "../../api/baseApi";

const academinSemesterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemester: builder.query({
      query: () => ({
        url: "/get-all-semesters",
        method: "GET",
      }),

      providesTags: ["semester"],
    }),

    createSemester: builder.mutation({
      query: (data) => ({
        url: "/create-sementer",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["semester"],
    }),
  }),
});

export const {
  useGetAllSemesterQuery,
  useCreateSemesterMutation,
} = academinSemesterApi;