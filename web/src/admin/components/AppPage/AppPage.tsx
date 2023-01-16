import React, { FC, ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from 'store/actions/auth'
import { setPatches } from 'store/actions/app'
import { userSelector } from 'store/selectors/auth'
import { patchesSelector } from 'store/selectors/app'
import useApi from 'hooks/useApi'
import IPatch from 'interfaces/IPatch'
import routes, { getPatchLink } from 'common/routes'

interface IProps {
  children: ReactNode
  className?: string
}

const AppPage: FC<IProps> = ({
  children,
  className
}) => {
  const navigate = useNavigate()
  const user = useSelector(userSelector)
  const patches = useSelector(patchesSelector)
  const dispatch = useDispatch()
  const { getUser, getPatches } = useApi()

  useEffect(() => {
    getUser()
      .then((user) => {
        dispatch(setUser(user))
      })
      .catch((error) => {
        // TODO: display an error or redirect to the error page
      })
  }, [dispatch, getUser])

  useEffect(() => {
    if (!patches) {
      getPatches()
        .then((patches: IPatch[]) => {
          let redirectLink

          dispatch(setPatches(patches))

          if (patches.length) {
            redirectLink = getPatchLink(patches[0].id)
          } else {
            redirectLink = routes.init
          }

          navigate(redirectLink)
        })
        .catch((error) => {
          // TODO: display an error or redirect to the error page
        })
    }
  }, [navigate, dispatch, patches, getPatches])

  if (!patches) {
    return (
      <div>loading patches ...</div>
    )
  }

  return (
    <div>
      <main>
        <div>
          {user.name || 'Guest'}
        </div>
        {children}
      </main>
    </div>
  )
}

export default AppPage
