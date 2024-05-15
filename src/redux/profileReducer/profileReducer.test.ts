import {
  ProfilePageState,
  addPostAC,
  profileReducer,
  setProfileStatusAC,
  setUserProfileAC,
} from "./profileReducer"

let state: ProfilePageState

beforeEach(() => {
  state = {
    posts: [
      { id: 1, message: "Hi, how are you?", likesCount: 12 },
      { id: 2, message: "It's my first post", likesCount: 11 },
      { id: 3, message: "Blabla", likesCount: 10 },
      { id: 4, message: "Dada", likesCount: 9 },
    ],
    userProfile: null,
    profileStatus: "love zenow",
  }
})

// tests
test("new post should be added", () => {
  const message = "zenow"
  const newState = profileReducer(state, addPostAC(message))

  expect(newState).not.toBe(state)
  expect(newState.posts.length).toBe(5)
  expect(newState.posts[0].message).toBe(message)
})
test("user profile should be set", () => {
  const userProfile = {
    aboutMe: null,
    contacts: {
      facebook: null,
      website: null,
      vk: null,
      twitter: null,
      instagram: null,
      youtube: null,
      github: null,
      mainLink: null,
    },
    lookingForAJob: false,
    lookingForAJobDescription: null,
    fullName: "Rusya",
    userId: 31140,
    photos: { small: null, large: null },
  }

  const newState = profileReducer(state, setUserProfileAC(userProfile))

  expect(newState).not.toBe(state)
  expect(newState.userProfile).toBe(userProfile)
})
test("profile status should be set", () => {
  const profileStatus = "new status"
  const newState = profileReducer(state, setProfileStatusAC(profileStatus))

  expect(newState).not.toBe(state)
  expect(newState.profileStatus).toBe(profileStatus)
})
