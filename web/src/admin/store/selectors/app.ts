import { createSelector } from '@reduxjs/toolkit'
import { IAppState } from 'store/reducers/app'

export const patchesSelector = createSelector(
  (state: { app: IAppState }) => state.app,
  (app: IAppState) => app.patches
)
