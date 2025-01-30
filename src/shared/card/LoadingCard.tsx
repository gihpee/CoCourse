import Skeleton from '@mui/material/Skeleton'
import { FC } from 'react'
import './Card.css'

const LoadingCard: FC = () => {
	return (
		<div>
			<Skeleton variant='rounded' animation='wave' width={352} height={96} />
			<div className='card_info'>
				<Skeleton variant='rounded' animation='wave' width={352} height={16} />

				<div className='points'>
					<Skeleton
						variant='rounded'
						animation='wave'
						width={132}
						height={20}
						style={{ marginTop: '8px', marginLeft: '8px' }}
					/>
					<Skeleton
						variant='rounded'
						animation='wave'
						width='95%'
						height={14}
						style={{ marginTop: '8px', marginLeft: '8px' }}
					/>
					<Skeleton
						variant='rounded'
						animation='wave'
						width={68}
						height={14}
						style={{ marginTop: '4px', marginLeft: '8px' }}
					/>
				</div>
				<div className='price_container'>
					<Skeleton
						variant='rounded'
						animation='wave'
						width={78}
						height={20.8}
						style={{ left: '8px' }}
					/>
					<Skeleton
						variant='rounded'
						animation='wave'
						width={50}
						height={32}
						style={{ right: '0px' }}
					/>
				</div>
			</div>
		</div>
	)
}

export default LoadingCard
