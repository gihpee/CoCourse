import Skeleton from '@mui/material/Skeleton'
import { FC } from 'react'
import useTheme from '../hooks/useTheme'
import './Card.css'
import styles from './LoadingCard.module.css'

const LoadingCard: FC = () => {
	const { theme } = useTheme()

	return (
		<div className={styles['loading-card']}>
			{theme === 'dark' ? (
				<>
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
				</>
			) : theme === 'light' ? (
				<>
					<Skeleton
						variant='rounded'
						animation='wave'
						className={styles['loading-card__skeleton']}
						sx={{ bgcolor: 'grey.300' }}
					/>

					<Skeleton
						variant='rounded'
						animation='wave'
						className={styles['loading-card__skeleton-people']}
						sx={{ bgcolor: 'grey.300' }}
					/>
				</>
			) : null}

			<div className={styles['loading-card__content']}>
				{theme === 'dark' ? (
					<>
						<Skeleton
							variant='rounded'
							animation='wave'
							className={styles['loading-card__text-title']}
							sx={{ bgcolor: 'grey.800' }}
						/>
						<Skeleton
							variant='rounded'
							sx={{ bgcolor: 'grey.800' }}
							animation='wave'
							className={styles['loading-card__text-desc']}
						/>
					</>
				) : theme === 'light' ? (
					<>
						<Skeleton
							variant='rounded'
							animation='wave'
							className={styles['loading-card__text-title']}
							sx={{ bgcolor: 'grey.300' }}
						/>
						<Skeleton
							variant='rounded'
							sx={{ bgcolor: 'grey.300' }}
							animation='wave'
							className={styles['loading-card__text-desc']}
						/>
					</>
				) : null}
			</div>
			{theme === 'dark' ? (
				<Skeleton
					variant='rounded'
					sx={{ bgcolor: 'grey.800' }}
					animation='wave'
					className={styles['loading-card__price']}
				/>
			) : theme === 'light' ? (
				<Skeleton
					variant='rounded'
					sx={{ bgcolor: 'grey.300' }}
					animation='wave'
					className={styles['loading-card__price']}
				/>
			) : null}
		</div>
	)
}

export default LoadingCard
