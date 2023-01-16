import { configureStore } from '@reduxjs/toolkit'
import authReducer from 'store/reducers/auth'
import appReducer from 'store/reducers/app'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    app: appReducer
  }
})

export default store
