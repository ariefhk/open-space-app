import { apiEndpoint } from "./api-slice"

export const authApiSlice = apiEndpoint.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ id, password }) => ({
        url: `login`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          id,
          password,
        },
      }),
      transformResponse: (response) => {
        const token = response?.data?.token
        return token
      },
    }),
    register: builder.mutation({
      query: ({ id, name, password }) => ({
        url: `users`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          id,
          name,
          password,
        },
      }),
      transformResponse: (response) => {
        const user = response?.data?.user
        return user
      },
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation } = authApiSlice
