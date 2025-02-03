import { Link, useLocation } from 'react-router-dom'
import boy from '../../shared/assets/navbar/boy.webp'
import boyN from '../../shared/assets/navbar/boyN.svg'
import feed from '../../shared/assets/navbar/feed.svg'
import feedN from '../../shared/assets/navbar/feedN.svg'
import plus from '../../shared/assets/navbar/plus.svg'
import plusN from '../../shared/assets/navbar/plusN.svg'
import './Navbar.css'

const NavBar = () => {
	const location = useLocation()

	const isActive = (pathname: string) => {
		return location.pathname === pathname
	}

	return (
		<div className='navbar'>
			<div className='feed'>
				<Link to='/'>
					{isActive('/') ? (
						<img src={feed} alt='' />
					) : (
						<img src={feedN} alt='' />
					)}
					Лента
				</Link>
			</div>
			<div className='create'>
				<Link to='/create'>
					{isActive('/create') ? (
						<img src={plus} alt='' />
					) : (
						<img src={plusN} alt='' />
					)}
					Создать
				</Link>
			</div>
			<div className='profile'>
				<Link to='/profile'>
					{isActive('/profile') ? (
						<img src={boy} alt='' />
					) : (
						<img src={boyN} alt='' />
					)}
					Профиль
				</Link>
			</div>
		</div>
	)
}

export default NavBar
