import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const authApiSlice = createApi({
  reducerPath: "AUTH_ROUTE",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env?.VITE_BASE_URL,
  }),
  tagTypes: ["AUTH"],
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
