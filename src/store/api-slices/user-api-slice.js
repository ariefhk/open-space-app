import { protectedApiEndpoint } from "./api-slice"

export const userApiSlice = protectedApiEndpoint.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: "users/me",
        method: "GET",
      }),

      transformResponse: (response) => {
        const user = response?.data?.user
        return user
      },
      providesTags: ({ id }) => {
        return [{ type: "USER", id }]
      },
    }),
    getAllUser: builder.query({
      query: () => ({
        url: "users",
        method: "GET",
      }),
      transformResponse: (response) => {
        const users = response?.data?.users
        return users
      },
      providesTags: (result) => {
        return result
          ? [
              ...result.map(({ id }) => ({ type: "USER", id })),
              { type: "USER", id: "LIST_OF_USER" },
            ]
          : [{ type: "USER", id: "LIST_OF_USER" }]
      },
    }),
  }),
})

export const { useGetProfileQuery, useGetAllUserQuery } = userApiSlice
