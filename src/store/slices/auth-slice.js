import { AuthType } from "@/api/api-instance"
import {
  deleteLocalStorageData,
  getLocalStorageData,
  saveLocalStorageData,
} from "@/lib/local-storage"
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  token: getLocalStorageData(AuthType.AUTH_LOCALSTORAGE_KEY),
}

export const authSlice = createSlice({
  initialState,
  name: "auth-slice",
  reducers: {
    clearToken: (state) => {
      state.token = ""
      deleteLocalStorageData(AuthType.AUTH_LOCALSTORAGE_KEY)
    },
    setToken: (state, action) => {
      state.token = action.payload
      saveLocalStorageData(AuthType.AUTH_LOCALSTORAGE_KEY, action.payload)
    },
  },
})

// Action creators are generated for each case reducer function
export const { clearToken, setToken } = authSlice.actions

// getter func
export const getAuthToken = (state) => state.auth.token

export default authSlice.reducer
