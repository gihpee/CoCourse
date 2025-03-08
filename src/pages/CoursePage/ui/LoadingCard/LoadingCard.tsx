import { Skeleton } from '@mui/material'
import { FC } from 'react'
import useTheme from 'src/shared/hooks/useTheme'
import styles from './LoadingCard.module.css'

const LoadingCard: FC = () => {
	const { theme } = useTheme()

	return (
		<div className={styles['course-loading-card']}>
			<div className={styles['course-loading-card__header']}>
				<div className={styles['course-loading-card__user']}>
					{theme === 'dark' ? (
						<>
							<Skeleton
								variant='circular'
								animation='wave'
								className={styles['course-loading-card__avatar']}
								sx={{ bgcolor: 'grey.800' }}
							/>
							<Skeleton
								variant='rounded'
								animation='wave'
								className={styles['course-loading-card__name']}
								sx={{ bgcolor: 'grey.800' }}
							/>
						</>
					) : theme === 'light' ? (
						<>
							<Skeleton
								variant='circular'
								animation='wave'
								className={styles['course-loading-card__avatar']}
								sx={{ bgcolor: 'grey.300' }}
							/>
							<Skeleton
								variant='rounded'
								animation='wave'
								className={styles['course-loading-card__name']}
								sx={{ bgcolor: 'grey.300' }}
							/>
						</>
					) : null}
				</div>

				<div className={styles['course-loading-card__rating']}>
					{theme === 'dark' ? (
						<>
							<Skeleton
								variant='circular'
								animation='wave'
								className={styles['course-loading-card__icon']}
								sx={{ bgcolor: 'grey.800' }}
							/>
							<Skeleton
								variant='circular'
								animation='wave'
								className={styles['course-loading-card__icon']}
								sx={{ bgcolor: 'grey.800' }}
							/>
						</>
					) : theme === 'light' ? (
						<>
							<Skeleton
								variant='circular'
								animation='wave'
								className={styles['course-loading-card__icon']}
								sx={{ bgcolor: 'grey.300' }}
							/>
							<Skeleton
								variant='circular'
								animation='wave'
								className={styles['course-loading-card__icon']}
								sx={{ bgcolor: 'grey.300' }}
							/>
						</>
					) : null}
				</div>
			</div>

			{theme === 'dark' ? (
				<Skeleton
					variant='rounded'
					animation='wave'
					className={styles['course-loading-card__info-main']}
					sx={{ bgcolor: 'grey.800' }}
				/>
			) : theme === 'light' ? (
				<Skeleton
					variant='rounded'
					animation='wave'
					className={styles['course-loading-card__info-main']}
					sx={{ bgcolor: 'grey.300' }}
				/>
			) : null}

			<div className={styles['course-loading-card__details']}>
				{theme === 'dark' ? (
					<>
						<Skeleton
							variant='rounded'
							animation='wave'
							className={styles['course-loading-card__info-title']}
							sx={{ bgcolor: 'grey.800' }}
						/>
						<Skeleton
							variant='rounded'
							animation='wave'
							className={styles['course-loading-card__info-university']}
							sx={{ bgcolor: 'grey.800' }}
						/>
					</>
				) : theme === 'light' ? (
					<>
						<Skeleton
							variant='rounded'
							animation='wave'
							className={styles['course-loading-card__info-title']}
							sx={{ bgcolor: 'grey.300' }}
						/>
						<Skeleton
							variant='rounded'
							animation='wave'
							className={styles['course-loading-card__info-university']}
							sx={{ bgcolor: 'grey.300' }}
						/>
					</>
				) : null}
			</div>

			{theme === 'dark' ? (
				<Skeleton
					variant='rounded'
					animation='wave'
					className={styles['course-loading-card__info-price']}
					sx={{ bgcolor: 'grey.800' }}
				/>
			) : theme === 'light' ? (
				<Skeleton
					variant='rounded'
					animation='wave'
					className={styles['course-loading-card__info-price']}
					sx={{ bgcolor: 'grey.300' }}
				/>
			) : null}
		</div>
	)
}

export default LoadingCard
