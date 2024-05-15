import s from "./MyPosts.module.css"
import { Post } from "./Post/Post"
import { addPostAC } from "../../../redux/profileReducer/profileReducer"
import { useAppDispatch, useAppSelector } from "../../../redux/store"
import { reset } from "redux-form"
import { PostsForm, PostsFormData } from "./PostsForm"

export const MyPosts = () => {
  const { posts } = useAppSelector((state) => state.profile)
  const dispatch = useAppDispatch()

  const onSubmit = (formData: PostsFormData) => {
    dispatch(addPostAC(formData.message))
    dispatch(reset("posts")) // clear form
  }

  let postsElements = posts.map((p) => (
    <Post key={p.id} message={p.message} likesCount={p.likesCount} />
  ))

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <PostsForm onSubmit={onSubmit} />
      <div className={s.posts}>{postsElements}</div>
    </div>
  )
}
