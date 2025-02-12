import styles from '../Feed.module.scss'

const filterOptions = ['Все курсы', 'Недавние', 'Купленные', 'Избранные']

const FeedFilters = () => {
	return (
		<div className={styles['feed__filters']}>
			{filterOptions.map((filter, index) => (
				<button key={index} className={styles['feed__filter-item']}>
					{filter}
				</button>
			))}
		</div>
	)
}

export default FeedFilters
