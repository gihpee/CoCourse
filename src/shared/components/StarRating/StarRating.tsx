import { useState } from 'react'
import EmptyStar from '../../../shared/assets/feedback/EmptyStar.svg'
import FillStar from '../../../shared/assets/feedback/FillStar.svg'
import styles from './StarRating.module.css'

interface StarRatingProps {
	onRate: (rating: number) => void
}

const StarRating: React.FC<StarRatingProps> = ({ onRate }) => {
	const [rating, setRating] = useState(0)
	const [hover, setHover] = useState(0)

	console.log(rating)

	const handleClick = (index: number) => {
		setRating(index)
		onRate(index)
	}

	return (
		<div className={styles['star-rating']}>
			{Array.from({ length: 5 }, (_, i) => (
				<img
					key={i}
					className={styles['star']}
					src={i < (hover || rating) ? FillStar : EmptyStar}
					alt='Рейтинг звезда'
					onMouseEnter={() => setHover(i + 1)}
					onMouseLeave={() => setHover(0)}
					onClick={() => handleClick(i + 1)}
				/>
			))}
		</div>
	)
}

export default StarRating
