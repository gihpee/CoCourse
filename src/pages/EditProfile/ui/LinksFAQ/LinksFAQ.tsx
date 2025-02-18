import { FC, useEffect, useState } from 'react'
import { useUserCourses } from 'src/entities/course/model/useUserCourses'
import LinkArrow from '../../../../shared/assets/wallet/LinkArrow.svg'
import styles from './LinksFAQ.module.css'

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
		<div className={styles['linksFAQ']}>
			<div className={styles['linksFAQ__content']}>
				<div className={styles['linksFAQ__image-wrapper']}>
					<img
						src={path}
						alt='Ссылка на документацию'
						className={styles['linksFAQ__image']}
					/>
				</div>
				<h3 className={styles['linksFAQ__text']}>{text}</h3>
			</div>
			{isSubmit ? (
				<img
					className={styles['linksFAQ__arrow']}
					src={LinkArrow}
					alt='Ссылка на документацию'
				/>
			) : (
				<div className={styles['linksFAQ__toggle']}>
					<input
						className={styles['linksFAQ__checkbox']}
						type='checkbox'
						checked={isNotify}
						onChange={handleNotify}
					/>
					<label className={styles['linksFAQ__label']} htmlFor='toggle'></label>
				</div>
			)}
		</div>
	)
}

export default LinksFAQ
