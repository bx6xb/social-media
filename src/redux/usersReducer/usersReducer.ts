import { followAPI, usersAPI } from "../../api/api"
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"

// thunks
export const getUsers = createAsyncThunk(
  "users/getUsers",
  async ({ pageSize, currentPage }: { pageSize: number; currentPage: number }, { dispatch }) => {
    dispatch(changeIsFetching({ isFetching: true }))

    const response = await usersAPI.getUsers(pageSize, currentPage)
    dispatch(changeIsFetching({ isFetching: false }))
    return { users: response.data.items, totalCount: response.data.totalCount, currentPage }
  }
)
export const follow = createAsyncThunk("users/follow", async (userId: number, { dispatch }) => {
  dispatch(changeIsFollowingInProgress({ isFetching: true, userId }))

  await followAPI.follow(userId)
  dispatch(changeIsFollowingInProgress({ isFetching: false, userId }))
  return userId
})
export const unfollow = createAsyncThunk("users/unfollow", async (userId: number, { dispatch }) => {
  dispatch(changeIsFollowingInProgress({ isFetching: true, userId }))

  await followAPI.unfollow(userId)
  dispatch(changeIsFollowingInProgress({ isFetching: false, userId }))
  return userId
})

const slice = createSlice({
  name: "users",
  initialState: {
    users: [],
    pageSize: 6,
    totalUsersCount: 28,
    currentPage: 1,
    isFetching: false,
    isFollowingInProgress: [],
  } as UsersPageState,
  reducers: {
    changeIsFollowingInProgress(
      state,
      action: PayloadAction<{ isFetching: boolean; userId: number }>
    ) {
      return {
        ...state,
        isFollowingInProgress: action.payload.isFetching
          ? [...state.isFollowingInProgress, action.payload.userId]
          : state.isFollowingInProgress.filter((id) => id !== action.payload.userId),
      }
    },
    changeIsFetching(state, action: PayloadAction<{ isFetching: boolean }>) {
      return {
        ...state,
        isFetching: action.payload.isFetching,
      }
    },
    changePageSize(state, action: PayloadAction<{ pageSize: number }>) {
      return {
        ...state,
        pageSize: action.payload.pageSize,
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // @ts-ignore
      .addCase(getUsers.fulfilled, (state, action) => ({
        ...state,
        users: action.payload.users,
        totalUsersCount: action.payload.totalCount,
        currentPage: action.payload.currentPage,
      }))
      .addCase(follow.fulfilled, (state, action) => ({
        ...state,
        users: state.users.map((u) => (u.id === action.payload ? { ...u, followed: true } : u)),
      }))
      .addCase(unfollow.fulfilled, (state, action) => ({
        ...state,
        users: state.users.map((u) => (u.id === action.payload ? { ...u, followed: false } : u)),
      }))
  },
})

// reducer
export const usersReducer = slice.reducer

// actions
export const { changeIsFollowingInProgress, changeIsFetching, changePageSize } = slice.actions

// types
type Photos = {
  small: null | string
  large: null | string
}
export type User = {
  name: string
  id: number
  uniqueUrlName: null | string
  photos: Photos
  status: null | string
  followed: boolean
}
export type UsersPageState = {
  users: User[]
  pageSize: number
  totalUsersCount: number
  currentPage: number
  isFetching: boolean
  isFollowingInProgress: number[]
}
export type UsersReducerAction =
  | ReturnType<typeof changeIsFetching>
  | ReturnType<typeof changeIsFollowingInProgress>
