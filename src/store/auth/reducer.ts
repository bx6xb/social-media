import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthState } from './types'
import { getCaptchaUrl, logout, getUserData } from './asyncActions'

export const initialState = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null,
  authorizedUserPhoto: null
} as AuthState

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthorizedUserPhoto(state, action: PayloadAction<string | null>) {
      return {
        ...state,
        authorizedUserPhoto: action.payload
      }
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getUserData.fulfilled, (state, action) => ({
        ...state,
        ...action.payload
      }))
      .addCase(logout.fulfilled, state => ({
        ...state,
        id: null,
        email: null,
        login: null,
        isAuth: false
      }))
      .addCase(getCaptchaUrl.fulfilled, (state, action) => {
        return {
          ...state,
          captchaUrl: action.payload
        }
      })
  }
})

export const authReducer = slice.reducer
export const { setAuthorizedUserPhoto } = slice.actions
