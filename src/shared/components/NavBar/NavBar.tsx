import { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './NavBar.module.css'

const NavBar: FC = () => {
	const location = useLocation()

	return (
		<nav className={styles['navbar']}>
			<ul className={styles['navbar__list']}>
				<li className={styles['navbar__item']}>
					<Link to='/wallet' className={styles['navbar__link']}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='25'
							height='25'
							viewBox='0 0 25 25'
							fill='none'
							className={styles['navbar__link-img']}
						>
							<path
								d='M17.7266 3.50015C17.6123 3.50308 17.4922 3.51773 17.375 3.54703L5.1875 6.75796C4.20312 7.01578 3.5 7.91812 3.5 8.93765V19.2502C3.5 20.4836 4.5166 21.5002 5.75 21.5002H19.25C20.4834 21.5002 21.5 20.4836 21.5 19.2502V9.50015C21.5 8.26675 20.4834 7.25015 19.25 7.25015H9.21875L17.75 5.00015V6.50015H19.25V5.00015C19.25 4.1564 18.5322 3.48843 17.7266 3.50015ZM5.75 8.75015H19.25C19.6748 8.75015 20 9.07535 20 9.50015V19.2502C20 19.675 19.6748 20.0002 19.25 20.0002H5.75C5.3252 20.0002 5 19.675 5 19.2502V9.50015C5 9.07535 5.3252 8.75015 5.75 8.75015ZM17.375 13.2502C16.7539 13.2502 16.25 13.7541 16.25 14.3752C16.25 14.9962 16.7539 15.5002 17.375 15.5002C17.9961 15.5002 18.5 14.9962 18.5 14.3752C18.5 13.7541 17.9961 13.2502 17.375 13.2502Z'
								fill={location.pathname === '/wallet' ? '#F3734E' : '#959595'}
							/>
						</svg>
						<h2
							className={styles['navbar__title']}
							style={{
								color: location.pathname === '/wallet' ? '#F3734E' : '#959595',
							}}
						>
							Кошелёк
						</h2>
					</Link>
				</li>
				<li className={styles['navbar__item']}>
					<Link to='/' className={styles['navbar__link']}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='25'
							height='25'
							viewBox='0 0 25 25'
							fill='none'
						>
							<path
								d='M4.5 19.5V5.5C4.5 4.39543 5.39543 3.5 6.5 3.5H19.9C20.2314 3.5 20.5 3.76863 20.5 4.1V17.2143'
								stroke={location.pathname === '/' ? '#F3734E' : '#959595'}
								strokeWidth='1.5'
								strokeLinecap='round'
							/>
						</svg>
						<h2
							className={styles['navbar__title']}
							style={{
								color: location.pathname === '/' ? '#F3734E' : '#959595',
							}}
						>
							Курсы
						</h2>
					</Link>
				</li>
				<li className={styles['navbar__item']}>
					<Link to='/profile' className={styles['navbar__link']}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='24'
							height='25'
							viewBox='0 0 24 25'
							fill='none'
							className={styles['navbar__link-img']}
						>
							<path
								fillRule='evenodd'
								clipRule='evenodd'
								d='M19.5806 17.21L19.8206 18.35C20.048 19.3356 19.8235 20.3713 19.2082 21.1742C18.593 21.9771 17.6514 22.4633 16.6406 22.5H7.36058C6.34976 22.4633 5.40815 21.9771 4.79293 21.1742C4.17771 20.3713 3.95315 19.3356 4.18058 18.35L4.42058 17.21C4.69662 15.6668 6.0232 14.5327 7.59058 14.5H16.4106C17.978 14.5327 19.3045 15.6668 19.5806 17.21ZM16.6406 20.99C17.1484 20.9841 17.6263 20.7489 17.9406 20.35V20.36C18.3263 19.8762 18.4765 19.2458 18.3506 18.64L18.1106 17.5C17.9774 16.6552 17.2652 16.0226 16.4106 15.99H7.59059C6.73595 16.0226 6.02375 16.6552 5.89059 17.5L5.65059 18.64C5.52774 19.2426 5.67785 19.8687 6.06059 20.35C6.37492 20.7489 6.8528 20.9841 7.36059 20.99H16.6406Z'
								fill={location.pathname === '/profile' ? '#F3734E' : '#959595'}
							/>
						</svg>
						<h2
							className={styles['navbar__title']}
							style={{
								color: location.pathname === '/profile' ? '#F3734E' : '#959595',
							}}
						>
							Профиль
						</h2>
					</Link>
				</li>
			</ul>
		</nav>
	)
}

export default NavBar
