import React, { FC } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import routes from 'common/routes'
import HomePage from 'pages/HomePage'

const App: FC = () => {
  return (
    <BrowserRouter basename={webpack.APP_ROUTE}>
      <Routes>
        <Route
          index
          path={routes.home}
          element={
            <HomePage />
          }
        />

        <Route
          path="*"
          element={
            <Navigate
              replace
              to={routes.home}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
