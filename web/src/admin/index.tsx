import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from './store'
import App from './App'

const container = document.getElementById('root') as Element
const root = createRoot(container)

root.render(
  <Provider store={store}>
    <BrowserRouter basename={webpack.APP_ROUTE}>
      <App />
    </BrowserRouter>
  </Provider>
)
