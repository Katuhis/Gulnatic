import { createAction } from '@reduxjs/toolkit'
import IPatch from 'interfaces/IPatch'

export const setPatches = createAction<IPatch[]>('SET_PATCHES')
