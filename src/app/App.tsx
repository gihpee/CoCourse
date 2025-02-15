import {
	disableVerticalSwipes,
	isVerticalSwipesEnabled,
	postEvent,
} from '@telegram-apps/sdk'
import { TonConnectUIProvider } from '@tonconnect/ui-react'
import { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import UserProfile from 'src/pages/UserProfile/ui/UserProfile'
import ConnectWallet from 'src/pages/Wallet/ConnectWallet'
import ConnectWalletN from 'src/pages/Wallet/ConnectWalletN'
import BuyCourse from '../pages/Course/BuyCourse'
import Course from '../pages/Course/Course'
import ConnectBot from '../pages/Create/ConnectBot'
import Create from '../pages/Create/Create'
import CreateCourse from '../pages/Create/CreateCourse'
import EditCourse from '../pages/Create/EditCourse'
import Feed from '../pages/Feed/Feed'
import FeedbackCourse from '../pages/Feedback/FeedbackCourse'
import FeedbackUser from '../pages/Feedback/FeedbackUser'
import SendFeedback from '../pages/Feedback/SendFeedback'
import NavBar from '../pages/Navbar/Navbar'
import Bio from '../pages/Profile/Bio'
import ECourse from '../pages/Profile/ECourse'
import EditProfile from '../pages/Profile/EditProfile'
import Registration from '../pages/Profile/Registration'
import Subj from '../pages/Profile/Subj'
import Univ from '../pages/Profile/Univ'
import User from '../pages/Profile/User'
import Verification from '../pages/Profile/Verification'
import ConnectPayments from '../pages/Wallet/ConnectPayments'
import ConnectPaymentsForm from '../pages/Wallet/ConnectPaymentsForm'
import ReturnForm from '../pages/Wallet/ReturnForm'
import Transaction from '../pages/Wallet/Transaction'
import VerificationForm from '../pages/Wallet/VerificationForm'
import VerificationN from '../pages/Wallet/VerificationN'
import Wallet from '../pages/Wallet/Wallet'
import useTheme from '../shared/hooks/useTheme'
import './App.css'

function App() {
	const [hasRedirected, setHasRedirected] = useState(false)

	const { theme } = useTheme()
	console.log('theme', theme)

	// const tg: any = window.Telegram
	// tg.WebApp.expand()
	// tg.WebApp.enableClosingConfirmation()
	const navigate = useNavigate()

	const [viewportHeight, setViewportHeight] = useState(window.innerHeight)
	const [stableHeight, setStableHeight] = useState(null)

	useEffect(() => {
		if (window.Telegram?.WebApp) {
			const webApp = window.Telegram.WebApp
			// webApp.disableVerticalSwipes()

			// webApp.requestFullscreen()

			postEvent('web_app_request_fullscreen')

			console.log(disableVerticalSwipes.isAvailable())

			if (disableVerticalSwipes.isAvailable()) {
				disableVerticalSwipes()
				isVerticalSwipesEnabled()
				console.log(isVerticalSwipesEnabled()) // false
			}

			if (window.Telegram?.WebApp) {
				setStableHeight(window.Telegram.WebApp.viewportStableHeight)
			}

			const handleResize = () => {
				setViewportHeight(window.innerHeight)
				if (window.Telegram?.WebApp) {
					setStableHeight(window.Telegram.WebApp.viewportStableHeight)
				}
			}

			window.addEventListener('resize', handleResize)
			return () => window.removeEventListener('resize', handleResize)
			// postEvent('web_app_exit_fullscreen')

			// webApp.safeAreaInsets()
			// webApp.contentSafeAreaInsets()
			// webApp.expand()
			webApp.enableClosingConfirmation()
		}
	}, [])

	useEffect(() => {
		if (hasRedirected) return

		const urlParams = new URLSearchParams(window.Telegram.WebApp.initData)
		const startParam = urlParams.get('start_param')

		if (startParam && startParam.startsWith('course_')) {
			const courseId = startParam.split('_')[1]
			navigate(`/course/${courseId}`)
			setHasRedirected(true)
		} else if (startParam && startParam === 'profile') {
			navigate('/profile')
			setHasRedirected(true)
		}
	}, [navigate, hasRedirected])

	return (
		<TonConnectUIProvider manifestUrl='https://cosmic-axolotl-6ea6bd.netlify.app/tonconnect-manifest.json'>
			<div className='App'>
				<meta
					name='viewport'
					content='width=device-width, user-scalable=no'
				></meta>
				<Routes>
					<Route index element={<Feed />} />
					<Route
						path={'create'}
						element={
							<>
								<Create /> <NavBar />{' '}
							</>
						}
					/>
					<Route path={'profile'} element={<UserProfile />} />
					<Route path={'course/:cid'} element={<Course />} />
					<Route path={'create-course'} element={<CreateCourse />} />
					<Route path={'send-feedback/:id'} element={<SendFeedback />} />
					<Route path={'edit-profile/:id'} element={<EditProfile />} />
					<Route path={'edit-bio/:id'} element={<Bio />} />
					<Route path={'edit-ecourse/:id'} element={<ECourse />} />
					<Route path={'edit-subj/:id'} element={<Subj />} />
					<Route path={'edit-univ/:id'} element={<Univ />} />
					<Route path={'edit-course/:cid'} element={<EditCourse />} />
					<Route path={'course-feedback/:id'} element={<FeedbackCourse />} />
					<Route path={'user-feedback/:id'} element={<FeedbackUser />} />
					<Route path={'user/:id'} element={<User />} />
					<Route path={'wallet'} element={<Wallet />} />
					<Route path={'connect-bot'} element={<ConnectBot />} />
					<Route path={'registration'} element={<Registration />} />
					<Route path={'buy-course'} element={<BuyCourse />} />
					<Route path={'transaction/:tid'} element={<Transaction />} />
					<Route path={'verification'} element={<Verification />} />
					<Route path={'connect-wallet'} element={<ConnectWallet />} />
					<Route path={'verificationN'} element={<VerificationN />} />
					<Route path={'connect-walletN'} element={<ConnectWalletN />} />
					<Route path={'verification-form'} element={<VerificationForm />} />
					<Route path={'connect-payments'} element={<ConnectPayments />} />
					<Route
						path={'connect-payments-form'}
						element={<ConnectPaymentsForm />}
					/>
					<Route path={'return-form'} element={<ReturnForm />} />
				</Routes>
			</div>
		</TonConnectUIProvider>
	)
}

export default App
