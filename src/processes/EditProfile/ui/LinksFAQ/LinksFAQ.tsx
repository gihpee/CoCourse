import { FC, useEffect, useState } from 'react'
import { useUserCourses } from 'src/entities/course/model/useUserCourses'
import LinkArrow from '../../../../shared/assets/wallet/LinkArrow.svg'

interface ILinksFAQ {
	path: string
	text: string
	isSubmit: boolean
}

const LinksFAQ: FC<ILinksFAQ> = ({ path, text, isSubmit }) => {
	const userCourses = useUserCourses(window.Telegram.WebApp.initData)
	const [isNotify, setIsNotify] = useState(true)

	useEffect(() => {
		if (userCourses) {
			try {
				setIsNotify(userCourses.notify || false)
			} catch (error) {
				console.error('Ошибка при запросе к серверу:', error)
			}
		} else {
			console.log('No user data found.')
		}
	}, [userCourses])

	const handleNotify = () => {
		setIsNotify(!isNotify)
	}

	return (
		<div>
			<div>
				<div>
					<img src={path} alt='Ссылка на документацию' />
				</div>
				<h3>{text}</h3>
			</div>
			{isSubmit ? (
				<img src={LinkArrow} alt='Ссылка на документацию' />
			) : (
				<div className='toggle-switch'>
					<input type='checkbox' checked={isNotify} onChange={handleNotify} />
					<label htmlFor='toggle'></label>
				</div>
			)}
		</div>
	)
}

export default LinksFAQ
