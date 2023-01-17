import { createReducer } from '@reduxjs/toolkit'
import { setPatches } from 'store/actions/app'
import IPatch from 'interfaces/IPatch'

export interface IAppState {
  patches: IPatch[] | null
}

export default createReducer<IAppState>({
  patches: null
}, (builder) => {
  builder.addCase(setPatches, (state, action) => {
    state.patches = action.payload
  })
})
