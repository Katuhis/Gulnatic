import React, { FC } from 'react'
import { Routes, Route, Navigate, useParams } from 'react-router-dom'
import routes, { getPatchLink } from 'common/routes'
import HomePage from 'pages/HomePage'
import PatchPage from 'pages/PatchPage'
import ChampionPage from 'pages/ChampionPage'
import NotFoundPage from 'pages/NotFoundPage'

const App: FC = () => {
  const { patchId } = useParams()

  return (
    <Routes>
      <Route
        path={routes.home}
        element={
          <HomePage />
        }
      />

      <Route path={routes.patches}>
        <Route
          index
          element={
            <Navigate replace to={routes.home} />
          }
        />

        <Route
          path={':patchId'}
          element={
            <PatchPage />
          }
        />
      </Route>

      <Route path={routes.champions}>
        <Route
          index
          element={
            <Navigate replace to={getPatchLink(patchId)} />
          }
        />

        <Route
          path={':championId'}
          element={
            <ChampionPage />
          }
        />
      </Route>

      <Route
        path="*"
        element={
          <NotFoundPage />
        }
      />
    </Routes>
  )
}

export default App
