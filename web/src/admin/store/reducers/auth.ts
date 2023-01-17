import { createReducer } from '@reduxjs/toolkit'
import { setUser } from 'store/actions/auth'
import IUser from 'interfaces/IUser'

export interface IAuthState {
  user: IUser
}

export default createReducer<IAuthState>({
  user: {
    name: ''
  }
}, (builder) => {
  builder.addCase(setUser, (state, action) => {
    state.user = action.payload
  })
})
