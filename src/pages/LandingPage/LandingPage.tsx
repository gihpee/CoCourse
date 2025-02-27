import cn from 'classnames'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import useTheme from 'src/shared/hooks/useTheme'
import c from '../../shared/assets/landing/c.svg'
import cLight from '../../shared/assets/landing/cLight.svg'
import m from '../../shared/assets/landing/m.svg'
import mLight from '../../shared/assets/landing/mLight.svg'
import n from '../../shared/assets/landing/n.svg'
import nLight from '../../shared/assets/landing/nLight.svg'
import o from '../../shared/assets/landing/o.svg'
import oLight from '../../shared/assets/landing/oLight.svg'
import styles from './LandingPage.module.css'

const LandingPage: FC = () => {
	const { theme } = useTheme()

	console.log(theme)

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
					) : theme === 'light' ? (
						<>
							<img
								className={styles['landing__letter']}
								src={cLight}
								alt='CLight'
							/>
							<img
								className={styles['landing__letter']}
								src={oLight}
								alt='OLight'
							/>
						</>
					) : null}
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
							<img className={styles['landing__letter']} src={m} alt='C' />
							<img className={styles['landing__letter']} src={n} alt='O' />
						</>
					) : theme === 'light' ? (
						<>
							<img
								className={styles['landing__letter']}
								src={mLight}
								alt='CLight'
							/>
							<img
								className={styles['landing__letter']}
								src={nLight}
								alt='OLight'
							/>
						</>
					) : null}
				</div>
			</div>
		</div>
	)
}

export default LandingPage
