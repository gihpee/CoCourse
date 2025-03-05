// src/features/userProfile/model/userProfileSlice.ts
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'src/app/providers/store'
import {
	ICourse,
	IFeedback,
	ITelegramUser,
} from 'src/entities/course/model/types'

interface UserProfileState {
	userData: ITelegramUser | null
	coursesData: ICourse[]
	feedbacks: IFeedback[]
	isNotify: boolean
	selectedOptionsProfile: string[]
	uniValueProfile: string
	loading: boolean
	error: string | null
}

const initialState: UserProfileState = {
	userData: null,
	coursesData: [],
	feedbacks: [],
	isNotify: true,
	selectedOptionsProfile: [],
	uniValueProfile: '',
	loading: false,
	error: null,
}

const userProfileSlice = createSlice({
	name: 'userProfile',
	initialState,
	reducers: {
		setUserProfile: (state, action) => {
			state.userData = action.payload.userData
			state.coursesData = action.payload.coursesData
			state.feedbacks = action.payload.feedbacks
			state.isNotify = action.payload.isNotify
			state.selectedOptionsProfile = action.payload.selectedOptionsProfile
			state.uniValueProfile = action.payload.uniValueProfile
		},
		setLoading: (state, action) => {
			state.loading = action.payload
		},
		setError: (state, action) => {
			state.error = action.payload
		},
	},
})

export const { setUserProfile, setLoading, setError } = userProfileSlice.actions

export const selectUserProfile = (state: RootState) => state.userProfile

export default userProfileSlice.reducer
