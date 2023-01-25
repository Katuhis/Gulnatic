import React, { FC, ReactNode, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setPatches } from 'store/actions/app'
import { userSelector } from 'store/selectors/auth'
import { patchesSelector } from 'store/selectors/app'
import useApi from 'hooks/useApi'
import IPatch from 'interfaces/IPatch'
import routes, { getPatchLink } from 'common/routes'
import useStyles from './AppPage.styles'
import { Typography } from 'antd'

const { Text, Link } = Typography

interface IProps {
  children: ReactNode
  className?: string
}

const AppPage: FC<IProps> = ({
  children,
  className
}) => {
  const styles = useStyles()
  const navigate = useNavigate()
  const user = useSelector(userSelector)
  const patches = useSelector(patchesSelector)
  const dispatch = useDispatch()
  const { patchId } = useParams()
  const { getPatches } = useApi()

  /*
  useEffect(() => {
    getUser()
      .then((user) => {
        dispatch(setUser(user))
      })
      .catch((error) => {
        // TODO: display an error or redirect to the error page
      })
  }, [dispatch, getUser])
  */

  useEffect(() => {
    if (!patches) {
      getPatches()
        .then((patches: IPatch[]) => {
          let redirectLink

          dispatch(setPatches(patches))

          if (patches.length) {
            redirectLink = getPatchLink(patchId || patches[0].number)
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
    <div className={styles.appPage}>
      <header>
        <div className={styles.header}>
          <div>
            <Link href='/'>
              Gulnatic admin
            </Link>
          </div>
          <div>
            <Text>
              {user.name || 'Guest'}
            </Text>
          </div>
        </div>
      </header>
      <main>
        {children}
      </main>
    </div>
  )
}

export default AppPage
