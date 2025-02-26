import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchGetLastChannel } from '../../entities/channel/model/fetchGetLastChannel'

function ConnectBot() {
	const navigate = useNavigate()

	const { id } = window.Telegram.WebApp.initDataUnsafe.user

	let tg = window.Telegram

	useEffect(() => {
		const fetchChannel = async () => {
			try {
				const result = await fetchGetLastChannel()
				console.log('result', result)
				navigate('/create-course/', { state: { data: result } })
			} catch (error) {
				console.error('Error fetching channel data:', error)
			}
		}

		const intervalId = setInterval(fetchChannel, 500)

		return () => clearInterval(intervalId)
	}, [id, navigate])

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
		<>
			<div className='back_btn' onClick={() => navigate(`/profile`)}></div>
			<div className='column'>
				<div className='connectbot'>
					<p>ПОДКЛЮЧИТЬ БОТА</p>
					<div className='ctext'>
						Добавьте @CoCourseBot в качестве администратора в ваш канал и
						предоставьте разрешения.
						<br />
						<br />
						Бот не будет ничего публиковать или удалять без вашего согласия.
					</div>
				</div>

				<div
					className='field'
					style={{ marginTop: '8px' }}
					onClick={handleButtonChannelClick}
				>
					Подключить канал
				</div>
				<div className='field' onClick={handleButtonGroupClick}>
					Подключить группу
				</div>
			</div>
		</>
	)
}

export default ConnectBot
