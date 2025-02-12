import { ChangeEvent } from 'react'
import FilterIcon from '../../../shared/assets/course/Filter.svg'
import ZoomIcon from '../../../shared/assets/course/ZoomIcon.svg'
import styles from '../Feed.module.css'

interface FeedSearchProps {
	inputValue: string
	onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const FeedSearch = ({ inputValue, onChange }: FeedSearchProps) => {
	return (
		<div className={styles['feed__top-panel']}>
			<input
				className={styles['feed__search']}
				onChange={onChange}
				placeholder='Название курса'
				value={inputValue}
			/>
			<img
				src={ZoomIcon}
				alt='Поиск курса'
				className={styles['feed__search-icon']}
			/>
			<button className={styles['feed__filter-button']}>
				<img
					src={FilterIcon}
					alt='Кнопка фильтра'
					className={styles['feed__filter-button-img']}
				/>
			</button>
		</div>
	)
}

export default FeedSearch
