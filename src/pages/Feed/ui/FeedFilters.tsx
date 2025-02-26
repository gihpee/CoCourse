import { FC, useEffect, useState } from 'react'
import styles from '../Feed.module.css'

const filterOptions = ['Все курсы', 'Недавние', 'Купленные']

interface FeedFiltersProps {
	onFilterChange: (filter: string) => void
}

const FeedFilters: FC<FeedFiltersProps> = ({ onFilterChange }) => {
	const [activeFilter, setActiveFilter] = useState('Все курсы')

	const handleFilterClick = (filter: string) => {
		if (activeFilter !== filter) {
			setActiveFilter(filter)
		}
	}

	useEffect(() => {
		onFilterChange(activeFilter)
	}, [activeFilter, onFilterChange])

	return (
		<div className={styles['feed__filters']}>
			{filterOptions.map(filter => (
				<button
					key={filter}
					className={`${styles['feed__filter-item']} ${
						activeFilter === filter ? styles['feed__filter-item_isActive'] : ''
					}`}
					onClick={() => handleFilterClick(filter)}
				>
					{filter}
				</button>
			))}
		</div>
	)
}

export default FeedFilters
