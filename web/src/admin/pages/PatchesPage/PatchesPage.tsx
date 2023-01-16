import React, { FC } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import routes from 'common/routes'
import PatchPage from 'pages/PatchPage'

const PatchesPage: FC = () => {
  return (
    <Routes>
      <Route
        index
        element={
          <Navigate replace to={routes.home} />
        }
      />

      <Route
        path={'/:patchId'}
        element={
          <PatchPage />
        }
      />
    </Routes>
  )
}

export default PatchesPage
