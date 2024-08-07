import { SubmitHandler, useForm, useWatch } from 'react-hook-form'
import {
  useAppDispatch,
  useAppSelector
} from '../../utils/reduxUtils/reduxUtils'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { Loading } from '../../components/Loading/Loading'
import s from './ProfileForm.module.scss'
import { Avatar, Button, Flex } from 'antd'
import { useEffect, useState } from 'react'
import {
  selectProfileStatus,
  selectUserProfile
} from '../../store/profile/selectors'
import { FormValues } from './types'
import { ProfileDataInputs } from './ProfileDataInputs/ProfileDataInputs'
import { handleFormSubmit } from '../../utils/handleFormSubmit/handleFormSubmit'
import { t } from 'i18next'

const ProfileForm = withAuthRedirect(() => {
  // get data from the state
  const userProfile = useAppSelector(selectUserProfile)
  const profileStatus = useAppSelector(selectProfileStatus)

  // dispatch
  const dispatch = useAppDispatch()

  // local state
  const [photoPreview, setPhotoPreview] = useState<string>()

  // form init
  const { handleSubmit, control } = useForm<FormValues>()

  // watch photo
  const photoFromForm = useWatch({ control, name: 'photo.file.originFileObj' })

  useEffect(() => {
    if (photoFromForm) {
      const photoUrl = URL.createObjectURL(photoFromForm)
      setPhotoPreview(photoUrl)
    }
  }, [photoFromForm])

  if (!userProfile) {
    return <Loading />
  }

  const onSubmit: SubmitHandler<FormValues> = async data => {
    handleFormSubmit(dispatch, data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <Flex gap={6} vertical>
        {/* Photo preview */}
        {photoPreview && (
          <Flex justify="start">
            <Avatar size={64} icon={<img src={photoPreview} />} />
          </Flex>
        )}

        <ProfileDataInputs
          control={control}
          userProfile={userProfile}
          profileStatus={profileStatus}
        />
      </Flex>

      {/* submit button */}
      <Button htmlType="submit" className="submitFormButton">
        {t('ProfileForm_save')}
      </Button>
    </form>
  )
})

export default ProfileForm
