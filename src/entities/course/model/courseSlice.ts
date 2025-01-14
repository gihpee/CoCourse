import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Course } from './types'

interface CourseState {
	data: Course | null
}

const initialState: CourseState = {
	data: null,
}

export const courseSlice = createSlice({
	name: 'course',
	initialState,
	reducers: {
		setCourseData: (state, action: PayloadAction<Course>) => {
			state.data = action.payload
		},
	},
})

export const { setCourseData } = courseSlice.actions
export default courseSlice.reducer
