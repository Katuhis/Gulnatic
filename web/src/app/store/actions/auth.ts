import { createAction } from '@reduxjs/toolkit'
import IUser from 'interfaces/IUser'

export const setUserAction = createAction<IUser>('SET_USER')
