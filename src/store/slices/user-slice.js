import {
  deleteLocalStorageData,
  getLocalStorageData,
  saveLocalStorageData,
} from "@/lib/local-storage"
import { createSlice } from "@reduxjs/toolkit"

export const UserType = {
  USER_LOCALSTORAGE_KEY: "currentUser",
}

const initialState = {
  userData: getLocalStorageData(UserType?.USER_LOCALSTORAGE_KEY) ?? {
    id: "",
    name: "",
    photo: "",
  },
}

export const userSlice = createSlice({
  initialState,
  name: "user-slice",
  reducers: {
    clearUser: (state) => {
      state.id = ""
      state.user = ""
      state.photo = ""
      deleteLocalStorageData(UserType?.USER_LOCALSTORAGE_KEY)
    },

    setUser: (state, action) => {
      state.id = action.payload?.id
      state.user = action.payload?.user
      state.photo = action.payload?.photo

      saveLocalStorageData(UserType.USER_LOCALSTORAGE_KEY, action?.payload)
    },
  },
})

// Action creators are generated for each case reducer function
export const { clearUser, setUser } = userSlice.actions

// getter func
export const getUser = (state) => state.user?.userData

export default userSlice.reducer
