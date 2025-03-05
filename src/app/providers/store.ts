import { configureStore } from '@reduxjs/toolkit'
import userProfileReducer from '../../entities/user/model/userProfileSlice'

export const store = configureStore({
	reducer: {
		userProfile: userProfileReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
