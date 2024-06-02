import counterReducer from "@/store/slices/counter-slice"
import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { authApiSlice } from "./api-slices/auth-api-slice"
import { talkApiSlice } from "./api-slices/talk-api-slice"
import { userApiSlice } from "./api-slices/user-api-slice"
import authReducer from "./slices/auth-slice"
import userReducer from "./slices/user-slice"

export const store = configureStore({
  reducer: {
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
    [talkApiSlice.reducerPath]: talkApiSlice.reducer,
    counter: counterReducer,
    auth: authReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApiSlice.middleware)
      .concat(userApiSlice.middleware)
      .concat(talkApiSlice.middleware),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)
