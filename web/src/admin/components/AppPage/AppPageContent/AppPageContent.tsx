import React, { FC, ReactNode, useEffect } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setPatches } from 'store/actions/app'
import { patchesSelector } from 'store/selectors/app'
import useApi from 'hooks/useApi'
import IPatch from 'interfaces/IPatch'
import routes, { getPatchLink } from 'common/routes'
import AppPageLoader from 'components/AppPageLoader'
import useStyles from './AppPageContent.styles'

interface IProps {
  children: ReactNode
  className?: string
}

const AppPageContent: FC<IProps> = ({
  children,
  className
}) => {
  const styles = useStyles()
  const navigate = useNavigate()
  const patches = useSelector(patchesSelector)
  const dispatch = useDispatch()
  const { patchId } = useParams()
  const { getPatches } = useApi()

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
  }, [navigate, dispatch, patches, patchId, getPatches])

  if (!patches) {
    return (
      <AppPageLoader>
        Loading patches ...
      </AppPageLoader>
    )
  }

  if (!patches.length) {
    return (
      <Navigate replace to={routes.init} />
    )
  }

  return (
    <main className={styles.root}>
      {children}
    </main>
  )
}

export default AppPageContent
