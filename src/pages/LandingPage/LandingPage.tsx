import cn from 'classnames'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import useTheme from 'src/shared/hooks/useTheme'
import c from '../../shared/assets/landing/c.svg'
import m from '../../shared/assets/landing/m.svg'
import n from '../../shared/assets/landing/n.svg'
import o from '../../shared/assets/landing/o.svg'
import styles from './LandingPage.module.css'

const LandingPage: FC = () => {
	const { theme } = useTheme()

	return (
		<div className={styles['landing']}>
			<div className={styles['landing__wrapper']}>
				<div
					className={cn(styles['landing__logo'], styles['landing__logo_top'])}
				>
					{theme === 'dark' ? (
						<>
							<img className={styles['landing__letter']} src={c} alt='C' />
							<img className={styles['landing__letter']} src={o} alt='O' />
						</>
					) : (
						<>
							<img className={styles['landing__letter']} src={c} alt='CLight' />
							<img className={styles['landing__letter']} src={o} alt='OLight' />
						</>
					)}
				</div>
				<div className={styles['landing__content']}>
					<h1 className={styles['landing__title']}>Common Course</h1>
					<p className={styles['landing__subtitle']}>
						Образовательный маркетплейс для студентов
					</p>
				</div>

				<p className={styles['landing__agreement']}>
					Продолжая создание профиля, я принимаю{' '}
					<Link
						to='https://disk.yandex.ru/i/h6bWlwR6L5B8fg'
						target='_blank'
						onClick={event => {
							event.preventDefault()
							window.open('https://disk.yandex.ru/i/h6bWlwR6L5B8fg')
						}}
						className={styles['landing__agreement-link']}
					>
						пользовательское соглашение
					</Link>{' '}
					и{' '}
					<Link
						to='https://disk.yandex.ru/i/Il8aGfCCgzVbnw'
						target='_blank'
						onClick={event => {
							event.preventDefault()
							window.open('https://disk.yandex.ru/i/Il8aGfCCgzVbnw')
						}}
						className={styles['landing__agreement-link']}
					>
						политику конфиденциальности
					</Link>
				</p>
				<Link to='/registration'>
					<button className={styles['landing__button']}>Создать профиль</button>
				</Link>
				<div
					className={cn(
						styles['landing__logo'],
						styles['landing__logo_bottom']
					)}
				>
					{theme === 'dark' ? (
						<>
							<img className={styles['landing__letter']} src={m} alt='M' />
							<img className={styles['landing__letter']} src={n} alt='N' />
						</>
					) : (
						<>
							<img className={styles['landing__letter']} src={m} alt='MLight' />
							<img className={styles['landing__letter']} src={n} alt='NLight' />
						</>
					)}
				</div>
			</div>
		</div>
	)
}

export default LandingPage
