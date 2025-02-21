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
				style={{ margin: '0' }}
			/>
			<div className='card_info'>
				<Skeleton
					variant='rounded'
					animation='wave'
					width={352}
					height={16}
					sx={{ bgcolor: 'grey.800' }}
					style={{ margin: '0' }}
				/>

				<div className='points'>
					<Skeleton
						variant='rounded'
						animation='wave'
						width='calc(100% - 8px)'
						height={20}
						style={{ margin: '0', marginTop: '8px', marginLeft: '8px' }}
						sx={{ bgcolor: 'grey.800' }}
					/>
					<Skeleton
						variant='rounded'
						animation='wave'
						width='calc(100% - 8px)'
						height={14}
						style={{ margin: '0', marginTop: '8px', marginLeft: '8px' }}
						sx={{ bgcolor: 'grey.800' }}
					/>
					<Skeleton
						variant='rounded'
						animation='wave'
						width={78}
						height={14}
						style={{ margin: '0', marginTop: '4px', marginLeft: '8px' }}
						sx={{ bgcolor: 'grey.800' }}
					/>
				</div>
				<div className='price_container price_container_loader'>
					<Skeleton
						variant='rounded'
						animation='wave'
						width={78}
						height={20.8}
						style={{ margin: '0', left: '8px' }}
						sx={{ bgcolor: 'grey.800' }}
					/>
					<Skeleton
						variant='rounded'
						animation='wave'
						width={50}
						height={32}
						style={{ margin: '0', right: '0px' }}
						sx={{ bgcolor: 'grey.800' }}
					/>
				</div>
			</div>
		</div>
	)
}

export default LoadingCard
