import { FC, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { fetchGetLastChannel } from 'src/entities/channel/model/fetchGetLastChannel'
import Animal from '../../shared/assets/wallet/Animal.webp'
import Arrow from '../../shared/assets/wallet/LinkArrow.svg'
import styles from './ConnectBotPage.module.css'

const ConnectBotPage: FC = () => {
	const navigate = useNavigate()

	const { id } = window.Telegram.WebApp.initDataUnsafe.user

	let tg = window.Telegram

	const BackButton = window.Telegram.WebApp.BackButton

	useEffect(() => {
		BackButton.show()
		BackButton.onClick(() => {
			BackButton.hide()
			navigate(-1)
		})

		const fetchChannel = async () => {
			try {
				const result = await fetchGetLastChannel()
				console.log('resultNav', result)
				console.log('data: result', { data: result })
				navigate('/create-course/', { state: { data: result } })
			} catch (error) {
				console.error('Error fetching channel data:', error)
			}
		}

		const intervalId = setInterval(fetchChannel, 500)
		return () => {
			clearInterval(intervalId)
			BackButton.hide()
		}
	}, [id, navigate, BackButton])

	const handleButtonChannelClick = () => {
		const botUsername = 'CoCourseBot'
		const link = `https://t.me/${botUsername}?startchannel`
		tg.WebApp.openTelegramLink(link)
	}

	const handleButtonGroupClick = () => {
		const botUsername = 'CoCourseBot'
		const link = `https://t.me/${botUsername}?startgroup`
		tg.WebApp.openTelegramLink(link)
	}

	return (
		<div className={styles['connect-bot']}>
			<div className={styles['connect-bot__content']}>
				<h1 className={styles['connect-bot__title']}>Подключить бота</h1>

				<div className={styles['connect-bot__description']}>
					<p className={styles['connect-bot__description-text']}>
						Добавьте @CoCourseBot в качестве администратора в ваш канал и
						предоставьте разрешения. <br />
						<br /> Бот не будет ничего публиковать или удалять без вашего
						согласия.
					</p>
				</div>

				<Link
					to='https://common-course-2.gitbook.io/common-course-wiki/'
					target='_blank'
					onClick={event => {
						event.preventDefault()
						window.open(
							'https://common-course-2.gitbook.io/common-course-wiki/'
						)
					}}
				>
					<button className={styles['connect-bot__button--info']}>
						<p className={styles['connect-bot__button-text']}>
							Открыть подробную инструкцию
						</p>
						<img
							src={Arrow}
							alt=''
							className={styles['connect-bot__button-icon']}
						/>
					</button>
				</Link>
			</div>
			<div className={styles['connect-bot__actions']}>
				<button
					className={styles['connect-bot__button--group']}
					onClick={handleButtonGroupClick}
				>
					Найти группу
				</button>
				<button
					className={styles['connect-bot__button--channel']}
					onClick={handleButtonChannelClick}
				>
					Найти канал
				</button>
			</div>
			<img
				src={Animal}
				alt=''
				className={styles['connect-bot__button--channel-img']}
			/>
		</div>
	)
}

export default ConnectBotPage
