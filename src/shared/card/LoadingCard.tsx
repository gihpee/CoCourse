import Skeleton from '@mui/material/Skeleton'
import { FC } from 'react'
import './Card.css'

const LoadingCard: FC = () => {
	return (
		<div className='course_card'>
			<Skeleton
				variant='rounded'
				animation='wave'
				width={352}
				height={96}
				sx={{ bgcolor: 'grey.800' }}
			/>
			<div className='card_info'>
				<Skeleton
					variant='rounded'
					animation='wave'
					width={352}
					height={16}
					sx={{ bgcolor: 'grey.800' }}
				/>

				<div className='points'>
					<Skeleton
						variant='rounded'
						animation='wave'
						width='95%'
						height={20}
						style={{ marginTop: '8px', marginLeft: '8px' }}
						sx={{ bgcolor: 'grey.800' }}
					/>
					<Skeleton
						variant='rounded'
						animation='wave'
						width='95%'
						height={14}
						style={{ marginTop: '8px', marginLeft: '8px' }}
						sx={{ bgcolor: 'grey.800' }}
					/>
					<Skeleton
						variant='rounded'
						animation='wave'
						width={78}
						height={14}
						style={{ marginTop: '4px', marginLeft: '8px' }}
						sx={{ bgcolor: 'grey.800' }}
					/>
				</div>
				<div className='price_container price_container_loader'>
					<Skeleton
						variant='rounded'
						animation='wave'
						width={78}
						height={20.8}
						style={{ left: '8px' }}
						sx={{ bgcolor: 'grey.800' }}
					/>
					<Skeleton
						variant='rounded'
						animation='wave'
						width={50}
						height={32}
						style={{ right: '0px' }}
						sx={{ bgcolor: 'grey.800' }}
					/>
				</div>
			</div>
		</div>
	)
}

export default LoadingCard
