import { TonConnectUIProvider } from '@tonconnect/ui-react'
import { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
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
import Profile from '../pages/Profile/Profile'
import Registration from '../pages/Profile/Registration'
import Subj from '../pages/Profile/Subj'
import Univ from '../pages/Profile/Univ'
import User from '../pages/Profile/User'
import Verification from '../pages/Profile/Verification'
import ConnectPayments from '../pages/Wallet/ConnectPayments'
import ConnectPaymentsForm from '../pages/Wallet/ConnectPaymentsForm'
import ConnectWallet from '../pages/Wallet/ConnectWallet'
import ConnectWalletN from '../pages/Wallet/ConnectWalletN'
import ReturnForm from '../pages/Wallet/ReturnForm'
import Transaction from '../pages/Wallet/Transaction'
import VerificationForm from '../pages/Wallet/VerificationForm'
import VerificationN from '../pages/Wallet/VerificationN'
import Wallet from '../pages/Wallet/Wallet'
import './App.css'

function App() {
	const tg: any = window.Telegram
	tg.WebApp.expand()
	tg.WebApp.enableClosingConfirmation()

	const navigate = useNavigate()

	useEffect(() => {
		if (tg.WebApp) {
			tg.WebApp.expand()
			tg.WebApp.enableClosingConfirmation()

			const initData = tg.WebApp.initData
			const urlParams = new URLSearchParams(initData)
			const startParam = urlParams.get('start')

			console.log('urlParams', urlParams)
			console.log('startParam', startParam)

			if (startParam) {
				if (startParam === 'profile') {
					navigate('/profile')
				} else if (startParam.startsWith('course/')) {
					const courseId = startParam.split('/')[1]
					navigate(`/course/${courseId}`)
				}
			}
		}
	}, [navigate, tg])

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
					<Route path={'profile'} element={<Profile />} />
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
