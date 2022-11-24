import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUserAction } from 'store/actions/auth'
import { userSelector } from 'store/selectors/auth'
import AppPage from 'components/AppPage'
import useApi from 'hooks/useApi'

const HomePage: FC = () => {
  const user = useSelector(userSelector)
  const dispatch = useDispatch()
  const { getUser } = useApi()

  useEffect(() => {
    getUser()
      .then((user) => {
        dispatch(setUserAction(user))
      })
      .catch((error) => {
        console.error('unable to load user: ', error)
      })
  }, [dispatch, getUser])

  return (
    <AppPage>
      <h1>Admin HomePage</h1>
      {user.name || 'Guest'}
    </AppPage>
  )
}

export default HomePage
