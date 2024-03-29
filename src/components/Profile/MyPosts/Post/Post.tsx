import s from "./Post.module.css"

type PostPropsType = {
  message: string
  likesCount: number
}

export const Post = (props: PostPropsType) => {
  return (
    <div className={s.item}>
      <img src="https://movies4maniacs.liberty.me/wp-content/uploads/sites/1218/2015/09/avatarsucks.jpg" />
      {props.message}
      <div>
        <span>like</span> {props.likesCount}
      </div>
    </div>
  )
}
