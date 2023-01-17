import React, { FC } from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { patchesSelector } from 'store/selectors/app'
import routes from 'common/routes'

const InitPage: FC = () => {
  const patches = useSelector(patchesSelector)

  if (patches?.length) {
    return (
      <Navigate replace to={routes.home} />
    )
  }

  return (
    <div>
      TODO: call api to load patches at first time
    </div>
  )
}

export default InitPage
