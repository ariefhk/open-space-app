import { AuthType } from "@/api/api-instance"
import { getLocalStorageData } from "@/lib/local-storage"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const userApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    reducerPath: "USER_ROUTE",
    baseUrl: import.meta.env?.VITE_BASE_URL,
    prepareHeaders: (headers) => {
      const token = getLocalStorageData(AuthType.AUTH_LOCALSTORAGE_KEY)
      if (token) {
        headers.set("Authorization", `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ["USER"],
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
    }),
  }),
})

export const { useGetProfileQuery, useGetAllUserQuery } = userApiSlice
