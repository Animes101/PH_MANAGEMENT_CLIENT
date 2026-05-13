import baseApi from "../api/baseApi";


const teacherApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTeacher: builder.mutation({
      query: (data) => ({
        url: "/user/create-facality",
        method: "POST",
        body: data,
      }),
    }),

    getAllTeacher: builder.query({
      query: (args) => {
        const searchParams = new URLSearchParams();
        if (args?.length > 0) {
          args.forEach((item: { name: string; value: string }) => {
            if (item.value) searchParams.append(item.name, item.value);
          });
        }
        return {
          url: "/get-facality",
          method: "GET",
          params: searchParams,
        };
      },
    }),

    
  }),
});

export const {
  useCreateTeacherMutation,
  useGetAllTeacherQuery,
} = teacherApi;