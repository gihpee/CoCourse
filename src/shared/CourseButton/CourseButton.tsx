import { FC } from 'react'
import styles from './CourseButton.module.css'
import { CourseButtonProps } from './types'

const CourseButton: FC<CourseButtonProps> = ({ imgSrc, alt }) => {
	return (
		<button className={styles['course-button']} type='button'>
			<img src={imgSrc} alt={alt} className={styles['course-button__icon']} />
		</button>
	)
}

export default CourseButton
