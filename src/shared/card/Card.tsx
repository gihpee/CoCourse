import { FC } from 'react'
import { Link } from 'react-router-dom'
import { calculateRating } from '../../entities/course/lib/calculateRating'
import { formatDate } from '../../entities/course/lib/formatDate'
import { ICourse } from '../../entities/course/model/types'
import { BASE_URL } from '../../shared/config/api'
import emptyHorizontalImage from '../assets/course/horizontalEmptyCourseImage.webp'
import './Card.css'

interface ICard {
	itemCard: ICourse
	indexCard: number
	userCoursesCard: ICourse[] | null
}

const Card: FC<ICard> = ({ itemCard, indexCard, userCoursesCard }) => {
	const averageRate =
		itemCard.feedback.length > 0 ? calculateRating(itemCard.feedback) : 0

	const setImagePath = (imgPath: string | null): string => {
		if (!imgPath || imgPath.includes(`https://${BASE_URL}.runull`)) {
			return emptyHorizontalImage
		} else {
			return `url(https://${BASE_URL}.ru${itemCard.image})`
		}
	}

	return (
		<Link to={`/course/${itemCard.id}`} key={indexCard} className='course_card'>
			<div
				className='course_img'
				style={{ backgroundImage: setImagePath(itemCard.image) }}
			></div>
			<div className='card_info'>
				<div className='row_grad_l'>
					<div
						className='grad_l'
						style={{
							width: `calc((100% / 5) * ${averageRate})`,
							background: `linear-gradient(to right, #EA4A4F 0%, #D8BB55, #7EBB69 calc(500% / ${averageRate}))`,
						}}
					></div>
				</div>
				<div
					style={{
						width: 'calc(100% - 16px)',
						backgroundColor: 'black',
						height: '16px',
						borderRadius: '16px',
						zIndex: '-10',
						marginTop: '-16px',
					}}
				></div>
				<div className='points'>
					<div
						className='point'
						style={{
							fontFamily: 'NeueMachina',
							fontSize: '16px',
							lineHeight: '20px',
						}}
					>
						<b>{itemCard.name}</b>
					</div>
					<div className='point' style={{ color: '#AAAAAA', fontSize: '14px' }}>
						{itemCard.university}
					</div>
					<div
						className='point'
						style={{ color: '#AAAAAA', marginTop: '4px', fontSize: '14px' }}
					>
						{formatDate(itemCard.date || 'Дата не указана')}
					</div>
				</div>
				<div className='price_container'>
					{Number(itemCard.price) === 0 ? (
						<div className='price'>БЕСПЛАТНО</div>
					) : (
						<div className='price'>{itemCard.price} RUB</div>
					)}
					<div className='status_container'>
						<div className='student_amount'>{itemCard.amount_of_students}</div>
						{userCoursesCard &&
							userCoursesCard.some(course => course.id === itemCard.id) && (
								<div className='course_status'>Куплено</div>
							)}
					</div>
				</div>
			</div>
		</Link>
	)
}

export default Card
