import Skeleton from '@mui/material/Skeleton'
import { FC } from 'react'
import './Card.css'
import styles from './LoadingCard.module.css'

const LoadingCard: FC = () => {
	return (
		<div className={styles['loading-card']}>
			<Skeleton
				variant='rounded'
				animation='wave'
				className={styles['loading-card__skeleton']}
				sx={{ bgcolor: 'grey.800' }}
			/>

			<Skeleton
				variant='rounded'
				animation='wave'
				className={styles['loading-card__skeleton-people']}
				sx={{ bgcolor: 'grey.800' }}
			/>

			<div className={styles['loading-card__content']}>
				<Skeleton
					variant='text'
					sx={{ fontSize: '3.59vw' }}
					animation='wave'
					className={styles['loading-card__text-title']}
				/>
				<Skeleton
					variant='text'
					sx={{ fontSize: '3.077vw' }}
					animation='wave'
					className={styles['loading-card__text-desc']}
				/>
			</div>

			<Skeleton
				variant='text'
				sx={{ fontSize: '4.615vw' }}
				animation='wave'
				className={styles['loading-card__price']}
			/>
		</div>
	)
}

export default LoadingCard
