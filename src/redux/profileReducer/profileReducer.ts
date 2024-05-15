import { UserProfile, profileAPI } from "../../api/api"
import { Thunk } from "../store"

// initial state
const initialState: ProfilePageState = {
  posts: [
    { id: 1, message: "Hi, how are you?", likesCount: 12 },
    { id: 2, message: "It's my first post", likesCount: 11 },
    { id: 3, message: "Blabla", likesCount: 10 },
    { id: 4, message: "Dada", likesCount: 9 },
  ],
  userProfile: null,
  profileStatus: "",
}

// reducer
export const profileReducer = (
  state: ProfilePageState = initialState,
  action: ProfileReducerAction
): ProfilePageState => {
  switch (action.type) {
    case "ADD_POST":
      return {
        ...state,
        posts: [
          {
            id: state.posts.length + 1,
            message: action.message,
            likesCount: 0,
          },
          ...state.posts,
        ],
      }
    case "SET_USER_PROFILE":
      return {
        ...state,
        userProfile: action.userProfile,
      }
    case "SET_PROFILE_STATUS":
      return {
        ...state,
        profileStatus: action.profileStatus,
      }
    default:
      return state
  }
}

// actions
export const addPostAC = (message: string) =>
  ({
    type: "ADD_POST",
    message,
  } as const)
export const setUserProfileAC = (userProfile: UserProfile) =>
  ({
    type: "SET_USER_PROFILE",
    userProfile,
  } as const)
export const setProfileStatusAC = (profileStatus: string) =>
  ({
    type: "SET_PROFILE_STATUS",
    profileStatus,
  } as const)

// thunks
export const getUserProfileTC =
  (userId: number): Thunk<ProfileReducerAction> =>
  (dispatch) => {
    profileAPI.getUserProfile(userId).then((res) => {
      dispatch(setUserProfileAC(res.data))
    })
  }
export const getUserStatusTC =
  (userId: number): Thunk<ProfileReducerAction> =>
  (dispatch) => {
    profileAPI.getUserStatus(userId).then((res) => {
      dispatch(setProfileStatusAC(res.data))
    })
  }
export const setUserStatusTC =
  (status: string): Thunk<ProfileReducerAction> =>
  (dispatch) => {
    profileAPI.setUserStatus(status).then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setProfileStatusAC(status))
      }
    })
  }

// types
export type Post = {
  id: number
  message: string
  likesCount: number
}
export type ProfilePageState = {
  posts: Post[]
  userProfile: UserProfile | null
  profileStatus: string
}
export type ProfileReducerAction =
  | ReturnType<typeof addPostAC>
  | ReturnType<typeof setUserProfileAC>
  | ReturnType<typeof setProfileStatusAC>
