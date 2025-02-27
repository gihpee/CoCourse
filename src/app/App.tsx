import { postEvent, retrieveLaunchParams } from '@telegram-apps/sdk'
import { TonConnectUIProvider } from '@tonconnect/ui-react'
import { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { VerificationForm } from 'src/entities/verification/ui/VerificationForm/VerificationForm'
import ConnectBotPage from 'src/pages/ConnectBotPage/ConnectBotPage'
import CoursePage from 'src/pages/CoursePage/CoursePage'
import EditProfile from 'src/pages/EditProfile/EditProfile'
import FeedbackPage from 'src/pages/FeedbackPage/FeedbackPage'
import LegalPage from 'src/pages/LegalPage/LegalPage'
import PaymentPage from 'src/pages/PaymentPage/PaymentPage'
import UserProfile from 'src/pages/UserProfile/ui/UserProfile'
import ConnectWallet from 'src/pages/Wallet/ConnectWallet'
import ConnectWalletN from 'src/pages/Wallet/ConnectWalletN'
import Create from '../pages/Create/Create'
// import EditCourse from '../pages/Create/EditCourse'
import ConnectCard from 'src/pages/ConnectCard/ConnectCard'
import CreateCourse from 'src/pages/CreateCourse/CreateCourse'
import EditCourse from 'src/pages/EditCourse/EditCourse'
import RegistrationPage from 'src/pages/RegistrationPage/RegistrationPage'
import Feed from '../pages/Feed/Feed'
import SendFeedback from '../pages/Feedback/SendFeedback'
import NavBar from '../pages/Navbar/Navbar'
import Bio from '../pages/Profile/Bio'
import ECourse from '../pages/Profile/ECourse'
import Subj from '../pages/Profile/Subj'
import Univ from '../pages/Profile/Univ'
import User from '../pages/Profile/User'
import Verification from '../pages/Profile/Verification'
import ConnectPayments from '../pages/Wallet/ConnectPayments'
import ReturnForm from '../pages/Wallet/ReturnForm'
import Transaction from '../pages/Wallet/Transaction'
import VerificationN from '../pages/Wallet/VerificationN'
import Wallet from '../pages/Wallet/Wallet'
import useTheme from '../shared/hooks/useTheme'
import './App.css'

function App() {
	const [hasRedirected, setHasRedirected] = useState(false)
	// const [hasReloaded, setHasReloaded] = useState(false)

	const { theme } = useTheme()
	console.log('theme', theme)

	// const tg: any = window.Telegram
	// tg.WebApp.expand()
	// tg.WebApp.enableClosingConfirmation()
	const navigate = useNavigate()

	useEffect(() => {
		const script = document.createElement('script')
		script.src = 'https://telegram.org/js/telegram-web-app.js'
		script.async = true
		document.body.appendChild(script)

		script.onload = () => {
			console.log('Telegram Web App script loaded')

			if (window.Telegram?.WebApp) {
				const webApp = window.Telegram.WebApp

				webApp.ready()

				webApp.expand()

				postEvent('web_app_request_fullscreen')

				console.log(
					'isVerticalSwipesEnabled before:',
					webApp.isVerticalSwipesEnabled
				)

				if (webApp.isVerticalSwipesEnabled) {
					webApp.disableVerticalSwipes()
					console.log('Vertical swipes disabled')
				} else {
					console.log('Vertical swipes were already disabled')
				}

				webApp.enableClosingConfirmation()
			}
		}

		return () => {
			document.body.removeChild(script)
		}
	}, [])

	useEffect(() => {
		const lp = retrieveLaunchParams()

		if (
			!lp ||
			['macos', 'tdesktop', 'weba', 'web', 'webk'].includes(lp.platform)
		) {
			return
		}

		document.body.classList.add('mobile-body')
		document.getElementById('wrap')?.classList.add('mobile-wrap')
		document.getElementById('content')?.classList.add('mobile-content')
	}, [])

	// useEffect(() => {
	// 	const script = document.createElement('script')
	// 	script.src = 'https://telegram.org/js/telegram-web-app.js'
	// 	script.async = true
	// 	document.body.appendChild(script)

	// 	script.onload = () => {
	// 		console.log('Telegram Web App script loaded')
	// 		console.log(window.Telegram.WebApp)
	// 	}

	// 	return () => {
	// 		document.body.removeChild(script)
	// 	}
	// }, [])

	// useEffect(() => {
	// 	if (window.Telegram?.WebApp) {
	// 		const webApp = window.Telegram.WebApp

	// 		window.Telegram.WebApp.ready()

	// 		postEvent('web_app_request_fullscreen')

	// 		if (webApp.isVerticalSwipesEnabled) {
	// 			webApp.disableVerticalSwipes()
	// 		}

	// 		webApp.enableClosingConfirmation()
	// 	}
	// }, [])

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
			<div id='wrap'>
				<div id='content'>
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
							<Route path={'course/:cid'} element={<CoursePage />} />
							<Route path={'create-course'} element={<CreateCourse />} />
							<Route path={'send-feedback/:id'} element={<SendFeedback />} />
							<Route path={'edit-profile/:id'} element={<EditProfile />} />
							<Route path={'edit-bio/:id'} element={<Bio />} />
							<Route path={'edit-ecourse/:id'} element={<ECourse />} />
							<Route path={'edit-subj/:id'} element={<Subj />} />
							<Route path={'edit-univ/:id'} element={<Univ />} />
							<Route path={'edit-course/:cid'} element={<EditCourse />} />
							<Route
								path={'course-feedback/:id'}
								element={<FeedbackPage isFullCourses={false} />}
							/>
							<Route
								path={'user-feedback/:id'}
								element={<FeedbackPage isFullCourses={true} />}
							/>
							<Route path={'user/:id'} element={<User />} />
							<Route path={'wallet'} element={<Wallet />} />
							<Route path={'connect-bot'} element={<ConnectBotPage />} />
							<Route path={'registration'} element={<RegistrationPage />} />
							<Route path={'buy-course'} element={<PaymentPage />} />
							<Route path={'transaction/:tid'} element={<Transaction />} />
							<Route path={'verification'} element={<Verification />} />
							<Route path={'connect-wallet'} element={<ConnectWallet />} />
							<Route path={'verificationN'} element={<VerificationN />} />
							<Route path={'connect-walletN'} element={<ConnectWalletN />} />
							<Route path={'legal'} element={<LegalPage />} />
							<Route
								path={'verification-form'}
								element={<VerificationForm />}
							/>
							<Route path={'connect-payments'} element={<ConnectPayments />} />
							<Route path={'connect-payments-form'} element={<ConnectCard />} />
							<Route path={'return-form'} element={<ReturnForm />} />
						</Routes>
					</div>
				</div>
			</div>
		</TonConnectUIProvider>
	)
}

export default App
