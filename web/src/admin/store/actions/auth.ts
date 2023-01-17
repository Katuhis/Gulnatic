import { createAction } from '@reduxjs/toolkit'
import IUser from 'interfaces/IUser'

export const setUser = createAction<IUser>('SET_USER')
