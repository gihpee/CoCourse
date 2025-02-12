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
							width='19'
							height='19'
							viewBox='0 0 19 19'
							fill='none'
							className={styles['navbar__link-img']}
						>
							<path
								d='M14.7266 0.500152C14.6123 0.503081 14.4922 0.51773 14.375 0.547027L2.1875 3.75796C1.20312 4.01578 0.5 4.91812 0.5 5.93765V16.2502C0.5 17.4836 1.5166 18.5002 2.75 18.5002H16.25C17.4834 18.5002 18.5 17.4836 18.5 16.2502V6.50015C18.5 5.26675 17.4834 4.25015 16.25 4.25015H6.21875L14.75 2.00015V3.50015H16.25V2.00015C16.25 1.1564 15.5322 0.488433 14.7266 0.500152ZM2.75 5.75015H16.25C16.6748 5.75015 17 6.07535 17 6.50015V16.2502C17 16.675 16.6748 17.0002 16.25 17.0002H2.75C2.3252 17.0002 2 16.675 2 16.2502V6.50015C2 6.07535 2.3252 5.75015 2.75 5.75015ZM14.375 10.2502C13.7539 10.2502 13.25 10.7541 13.25 11.3752C13.25 11.9962 13.7539 12.5002 14.375 12.5002C14.9961 12.5002 15.5 11.9962 15.5 11.3752C15.5 10.7541 14.9961 10.2502 14.375 10.2502Z'
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
							className={styles['navbar__link-img']}
						>
							<path
								d='M4.5 19.5V5.5C4.5 4.39543 5.39543 3.5 6.5 3.5H19.9C20.2314 3.5 20.5 3.76863 20.5 4.1V17.2143'
								stroke={location.pathname === '/' ? '#F3734E' : '#959595'}
								stroke-width='1.5'
								stroke-linecap='round'
							/>
							<path
								d='M6.5 17.5H20.5'
								stroke={location.pathname === '/' ? '#F3734E' : '#959595'}
								stroke-width='1.5'
								stroke-linecap='round'
							/>
							<path
								d='M6.5 21.5H20.5'
								stroke={location.pathname === '/' ? '#F3734E' : '#959595'}
								stroke-width='1.5'
								stroke-linecap='round'
							/>
							<path
								d='M6.5 21.5C5.39543 21.5 4.5 20.6046 4.5 19.5C4.5 18.3954 5.39543 17.5 6.5 17.5'
								stroke={location.pathname === '/' ? '#F3734E' : '#959595'}
								stroke-width='1.5'
								stroke-linecap='round'
								stroke-linejoin='round'
							/>
							<path
								d='M9.5 7.5H15.5'
								stroke={location.pathname === '/' ? '#F3734E' : '#959595'}
								stroke-width='1.5'
								stroke-linecap='round'
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
								fill-rule='evenodd'
								clip-rule='evenodd'
								d='M19.5806 17.21L19.8206 18.35C20.048 19.3356 19.8235 20.3713 19.2082 21.1742C18.593 21.9771 17.6514 22.4633 16.6406 22.5H7.36058C6.34976 22.4633 5.40815 21.9771 4.79293 21.1742C4.17771 20.3713 3.95315 19.3356 4.18058 18.35L4.42058 17.21C4.69662 15.6668 6.0232 14.5327 7.59058 14.5H16.4106C17.978 14.5327 19.3045 15.6668 19.5806 17.21ZM16.6406 20.99C17.1484 20.9841 17.6263 20.7489 17.9406 20.35V20.36C18.3263 19.8762 18.4765 19.2458 18.3506 18.64L18.1106 17.5C17.9774 16.6552 17.2652 16.0226 16.4106 15.99H7.59059C6.73595 16.0226 6.02375 16.6552 5.89059 17.5L5.65059 18.64C5.52774 19.2426 5.67785 19.8687 6.06059 20.35C6.37492 20.7489 6.8528 20.9841 7.36059 20.99H16.6406Z'
								fill={location.pathname === '/profile' ? '#F3734E' : '#959595'}
							/>
							<path
								fill-rule='evenodd'
								clip-rule='evenodd'
								d='M12.5006 12.5H11.5006C9.29143 12.5 7.50057 10.7092 7.50057 8.50001V5.86001C7.4979 4.96807 7.85104 4.11189 8.48175 3.48119C9.11245 2.85049 9.96863 2.49735 10.8606 2.50001H13.1406C14.0325 2.49735 14.8887 2.85049 15.5194 3.48119C16.1501 4.11189 16.5032 4.96807 16.5006 5.86001V8.50001C16.5006 10.7092 14.7097 12.5 12.5006 12.5ZM10.8606 4.00002C9.83332 4.00002 9.00057 4.83277 9.00057 5.86001V8.50001C9.00057 9.88073 10.1199 11 11.5006 11H12.5006C13.8813 11 15.0006 9.88073 15.0006 8.50001V5.86001C15.0006 5.36671 14.8046 4.89361 14.4558 4.5448C14.107 4.19598 13.6339 4.00002 13.1406 4.00002H10.8606Z'
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
