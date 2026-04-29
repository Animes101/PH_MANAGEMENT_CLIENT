import baseApi from "../../api/baseApi";

const academinSemesterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({ 
    addDepartment: builder.mutation({
      query: (data) => ({
        url: "/create-AcademinDepartment",
        method: "POST",
        body: data,
      }),
    }),
    agetAllDepartment: builder.query({
      query: () => ({
        url: "/get-all-AcademinDepartment",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAddDepartmentMutation,
  useAgetAllDepartmentQuery
  
} = academinSemesterApi;