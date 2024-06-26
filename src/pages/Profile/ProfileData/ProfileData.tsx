import { Preloader } from "../../../components/Preloader/Preloader"
import s from "./ProfileData.module.css"
import { ReactElement } from "react"
import { Contact } from "./Contact/Contact"
import { useAppSelector } from "../../../utils/redexUtils"
import { authSelectors } from "../../../store/authReducer"
import { profileSelectors } from "../../../store/profileReducer"

export const ProfileData = (props: ProfileDataProps) => {
  const { userProfile, profileStatus } = useAppSelector(profileSelectors.selectProfileState)
  const authUserId = useAppSelector(authSelectors.selectId)

  let mappedContacts: ReactElement[] = []
  let isOwner: boolean = false

  if (userProfile) {
    mappedContacts = Object.entries(userProfile.contacts)
      .filter((c) => c[1])
      .map(([contact, link]) => <Contact key={contact} contact={contact} link={link} />)
    isOwner = userProfile.userId === authUserId
  }

  if (!userProfile) {
    return <Preloader />
  }

  return (
    <>
      <div className={s.descriptionBlock}>
        <div>{userProfile.fullName}</div>
        <div>{profileStatus}</div>
        {userProfile.aboutMe && (
          <div>
            <b>About me:</b> {userProfile.aboutMe}
          </div>
        )}
        <b>{`I am${userProfile.lookingForAJob ? "" : " not"} looking for a job`}</b>
        {userProfile.lookingForAJobDescription && (
          <div>
            <b>Job description:</b> {userProfile.lookingForAJobDescription}
          </div>
        )}
        {!!mappedContacts.length && (
          <div>
            <b>Contacts</b>
            <br />
            {mappedContacts}
          </div>
        )}
      </div>
      {isOwner && <button onClick={() => props.setProfileEditMode(true)}>Edit profile</button>}
    </>
  )
}

// types
type ProfileDataProps = {
  setProfileEditMode: (isProfileEditMode: boolean) => void
}
