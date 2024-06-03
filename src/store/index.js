import counterReducer from "@/store/slices/counter-slice"
import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { apiEndpoint, protectedApiEndpoint } from "./api-slices/api-slice"
import authReducer from "./slices/auth-slice"
import userReducer from "./slices/user-slice"

export const store = configureStore({
  reducer: {
    [apiEndpoint.reducerPath]: apiEndpoint.reducer,
    [protectedApiEndpoint.reducerPath]: protectedApiEndpoint.reducer,
    counter: counterReducer,
    auth: authReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiEndpoint.middleware)
      .concat(protectedApiEndpoint.middleware),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)
