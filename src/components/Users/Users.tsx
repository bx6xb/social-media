import userPhoto from "../../assets/images/userDefaultPhoto.png"
import { UserType } from "../../redux/usersReducer/usersReducer"
import s from "./Users.module.css"

type UsersPropsType = {
  users: UserType[]
  follow: (userId: number) => void
  unfollow: (userId: number) => void
  pageSize: number
  totalUsersCount: number
  currentPage: number
  onPageChange: (currentPage: number) => void
}

export const Users = (props: UsersPropsType) => {
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

  const pages = []
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(
      <span
        onClick={() => props.onPageChange(i)}
        key={i}
        className={props.currentPage === i ? s.selectedPage : ""}
      >
        {i}
      </span>
    )
  }

  return (
    <div>
      <div>{pages}</div>
      {props.users.map((u) => (
        <div key={u.id}>
          <div>
            <img src={u.photos.small || userPhoto} alt="avatar" className={s.userPhoto} />
          </div>

          <div>
            {u.followed ? (
              <button onClick={() => props.unfollow(u.id)}>unfollow</button>
            ) : (
              <button onClick={() => props.follow(u.id)}>follow</button>
            )}
          </div>

          <div>{u.name}</div>
          <div>{u.status}</div>
        </div>
      ))}
    </div>
  )
}
