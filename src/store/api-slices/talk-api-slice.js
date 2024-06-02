import { AuthType } from "@/api/api-instance"
import { getLocalStorageData } from "@/lib/local-storage"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

// Utility function to prepare headers
const prepareAuthHeaders = (headers) => {
  const token = getLocalStorageData(AuthType.AUTH_LOCALSTORAGE_KEY)
  if (token) {
    headers.set("Authorization", `Bearer ${token}`)
  }
  return headers
}

export const talkApiSlice = createApi({
  reducerPath: "TALK_ROUTE",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env?.VITE_BASE_URL,
    prepareHeaders: prepareAuthHeaders,
  }),
  tagTypes: ["TALK"],
  endpoints: (builder) => ({
    getAllTalk: builder.query({
      query: () => ({
        url: "talks",
        method: "GET",
      }),
      transformResponse: (response) => {
        const talks = response?.data?.talks

        return talks
      },
      providesTags: (result) => {
        return result
          ? [
              ...result.map(({ id }) => ({ type: "TALK", id })),
              { type: "TALK", id: "LIST_OF_TALK" },
            ]
          : [{ type: "TALK", id: "LIST_OF_TALK" }]
      },
    }),
    getTalkDetail: builder.query({
      query: ({ id }) => ({
        url: `talks/${id}`,
        method: "GET",
      }),
      transformResponse: (response) => {
        const talkDetail = response?.data?.talkDetail

        return talkDetail
      },
      providesTags: (result, error, { id }) => [{ type: "TALK", id }],
    }),
    createTalk: builder.mutation({
      query: ({ text, replyTo }) => ({
        url: "talks",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          text,
          replyTo,
        },
      }),
      transformResponse: (response) => {
        const talk = response?.data?.talk
        return talk
      },
      invalidatesTags: (result, error, { replyTo }) => [
        { type: "TALK", id: replyTo }, // Invalidate tags for the specific talk
        { type: "TALK", id: "LIST_OF_TALK" }, // Invalidate the list of talks
      ],
    }),
    toggleLikeTalk: builder.mutation({
      query: ({ talkId }) => ({
        url: "talks/likes",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          talkId,
        },
      }),
      transformResponse: () => {
        return `Success like talk.`
      },
      invalidatesTags: (result, error, { talkId }) => [
        { type: "TALK", id: talkId }, // Invalidate tags for the specific talk
        { type: "TALK", id: "LIST_OF_TALK" }, // Invalidate the list of talks
      ],
      async onQueryStarted({ talkId }, { dispatch, queryFulfilled, getState }) {
        const { user } = getState()
        const userId = user?.userData?.id

        const patchAllTalkResult = dispatch(
          talkApiSlice.util.updateQueryData(
            "getAllTalk",
            undefined,
            (draft) => {
              // LOGGING THE STRUCTURE OF THE DRAFT BEFORE UPDATE
              // console.log(
              //   "DRAFT BEFORE UPDATE:",
              //   JSON.stringify(draft, null, 2),
              // )
              if (Array.isArray(draft)) {
                const talk = draft.find((t) => t.id === talkId)
                if (talk.likes.includes(userId)) {
                  // Unlike the talk
                  talk.likes = talk.likes.filter((likeId) => likeId !== userId)
                } else {
                  // Like the talk
                  talk.likes.push(userId)
                }
              } else {
                console.warn("Draft is not an array.")
              }
              // LOGGING THE STRUCTURE OF THE DRAFT AFTER UPDATE
              // console.log("DRAFT AFTER UPDATE:", JSON.stringify(draft, null, 2))
            },
          ),
        )

        // Optimistic update for getTalkDetail
        const patchTalkDetailResult = dispatch(
          talkApiSlice.util.updateQueryData(
            "getTalkDetail",
            { id: talkId },
            (draft) => {
              if (draft) {
                if (draft.likes.includes(userId)) {
                  // Unlike the talk
                  draft.likes = draft.likes.filter(
                    (likeId) => likeId !== userId,
                  )
                } else {
                  // Like the talk
                  draft.likes.push(userId)
                }
              }
            },
          ),
        )
        try {
          await queryFulfilled
        } catch {
          patchAllTalkResult.undo()
          patchTalkDetailResult.undo()
        }
      },
    }),
  }),
})

export const {
  useCreateTalkMutation,
  useGetAllTalkQuery,
  useGetTalkDetailQuery,
  useLazyGetAllTalkQuery,
  useLazyGetTalkDetailQuery,
  useToggleLikeTalkMutation,
} = talkApiSlice
