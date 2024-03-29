import axios from "axios"
import { UserType } from "../../redux/usersReducer/usersReducer"
import React from "react"
import { Users } from "./Users"

type UsersAPIComponentPropsType = {
  users: UserType[]
  follow: (userId: number) => void
  unfollow: (userId: number) => void
  setUsers: (users: UserType[]) => void
  pageSize: number
  totalUsersCount: number
  currentPage: number
  setCurrentPage: (currentPage: number) => void
  setTotalUsers: (totalUsers: number) => void
}

export class UsersAPIComponent extends React.Component<UsersAPIComponentPropsType> {
  componentDidMount() {
    if (this.props.users.length === 0) {
      axios
        .get(
          `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`
        )
        .then((response) => {
          this.props.setUsers(response.data.items)
          this.props.setTotalUsers(response.data.totalCount)

          console.log(response)
        })
        .catch((err) => console.error(err))
    }
  }

  onPageChange = (pageNumber: number) => {
    this.props.setCurrentPage(pageNumber)

    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`
      )
      .then((response) => this.props.setUsers(response.data.items))
      .catch((err) => console.error(err))
  }

  render() {
    return (
      <Users
        users={this.props.users}
        currentPage={this.props.currentPage}
        follow={this.props.follow}
        onPageChange={this.onPageChange}
        pageSize={this.props.pageSize}
        totalUsersCount={this.props.totalUsersCount}
        unfollow={this.props.unfollow}
      />
    )
  }
}
