import React, { FC } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import routes from 'common/routes'
import HomePage from 'pages/HomePage'
import PatchesPage from 'pages/PatchesPage'
import ChampionsPage from 'pages/ChampionsPage'
import NotFoundPage from 'pages/NotFoundPage'

const App: FC = () => {
  return (
    <BrowserRouter basename={webpack.APP_ROUTE}>
      <Routes>
        <Route
          path={routes.home}
          element={
            <HomePage />
          }
        />

        <Route
          path={routes.patches}
          element={
            <PatchesPage />
          }
        />

        <Route
          path={routes.champions}
          element={
            <ChampionsPage />
          }
        />

        <Route
          path="*"
          element={
            <NotFoundPage />
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
