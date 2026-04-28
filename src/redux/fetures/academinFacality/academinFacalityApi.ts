import baseApi from "../../api/baseApi";

const academinSemesterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    createAcdeminFacality: builder.mutation({
      query: (data) => ({
        url: "/create-faculty",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["acfacality"],
    }),
  }),
});

export const {
  useCreateAcdeminFacalityMutation,
} = academinSemesterApi;