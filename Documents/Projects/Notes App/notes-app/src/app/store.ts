import { configureStore } from "@reduxjs/toolkit";
import type {TypedUseSelectorHook } from 'react-redux'

import { useSelector } from 'react-redux'
import noteReducer from '../features/noteSlice'

export const store = configureStore({
    reducer: noteReducer
})

export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
// export const useAppDispatch = useDispatch.withTypes<AppDispatch>() 
export type RootState = ReturnType<typeof store.getState>

