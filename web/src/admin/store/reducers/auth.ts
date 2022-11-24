import { createReducer } from '@reduxjs/toolkit'
import { setUserAction } from 'store/actions/auth'
import IUser from 'interfaces/IUser'

export interface IAuthState {
  user: IUser
}

export default createReducer<IAuthState>({
  user: {
    name: ''
  }
}, (builder) => {
  builder.addCase(setUserAction, (state, action) => {
    state.user = action.payload
  })
})
