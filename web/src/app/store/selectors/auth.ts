import { createSelector } from '@reduxjs/toolkit'
import { IAuthState } from 'store/reducers/auth'

export const userSelector = createSelector(
  (state: { auth: IAuthState }) => state.auth,
  (auth: IAuthState) => auth.user
)
