import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICourse } from './types'

interface CourseState {
	data: ICourse | null
}

const initialState: CourseState = {
	data: null,
}

export const courseSlice = createSlice({
	name: 'course',
	initialState,
	reducers: {
		setCourseData: (state, action: PayloadAction<ICourse>) => {
			state.data = action.payload
		},
	},
})

export const { setCourseData } = courseSlice.actions
export default courseSlice.reducer
