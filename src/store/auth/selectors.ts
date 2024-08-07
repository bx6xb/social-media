import { AppRootState } from '../store'

export const selectIsAuth = (state: AppRootState) => state.auth.isAuth
export const selectId = (state: AppRootState) => state.auth.id
export const selectCaptchaUrl = (state: AppRootState) => state.auth.captchaUrl
export const selectAuthorizedUserPhoto = (state: AppRootState) =>
  state.auth.authorizedUserPhoto
