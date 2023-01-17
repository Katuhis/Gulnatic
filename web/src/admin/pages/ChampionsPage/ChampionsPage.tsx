import React, { FC } from 'react'
import { Routes, Route, Navigate, useParams } from 'react-router-dom'
import { getPatchLink } from 'common/routes'
import ChampionPage from 'pages/ChampionPage'

const ChampionsPage: FC = () => {
  const { patchId } = useParams()

  return (
    <Routes>
      <Route
        index
        element={
          <Navigate replace to={getPatchLink(patchId)} />
        }
      />

      <Route
        path={'/:championId'}
        element={
          <ChampionPage />
        }
      />
    </Routes>
  )
}

export default ChampionsPage
