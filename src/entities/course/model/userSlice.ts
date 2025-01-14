import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
	bought_courses: { id: number }[]
}

const initialState: UserState = {
	bought_courses: [],
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUserCourses: (state, action: PayloadAction<{ id: number }[]>) => {
			state.bought_courses = action.payload
		},
	},
})

export const { setUserCourses } = userSlice.actions
export default userSlice.reducer
