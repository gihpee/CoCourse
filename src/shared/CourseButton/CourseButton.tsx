import cn from 'classnames'
import { FC } from 'react'
import styles from './CourseButton.module.css'
import { CourseButtonProps } from './types'

const CourseButton: FC<CourseButtonProps> = ({ imgSrc, alt, className }) => {
	return (
		<button className={cn(styles['course-button'], className)} type='button'>
			<img src={imgSrc} alt={alt} className={styles['course-button__icon']} />
		</button>
	)
}

export default CourseButton
