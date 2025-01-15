import MainButton from '@twa-dev/mainbutton'
import { useNavigate } from 'react-router-dom'
import payments from '../../shared/assets/profile/payments.png'

function ConnectPayments() {
	const navigate = useNavigate()

	return (
		<>
			<div
				className='back_btn'
				onClick={() => {
					window.history.back()
				}}
			></div>
			<div
				className='prev'
				style={{ backgroundImage: `url(${payments})`, marginTop: '-56px' }}
			>
				<p style={{ marginTop: '312px' }}>Настройте выплаты</p>
			</div>
			<div className='getContact_container'></div>

			<div className='column'>
				<span>Зачем это нужно?</span>
				<div
					className='pricecourse_container'
					style={{
						marginLeft: 'auto',
						marginRight: 'auto',
						paddingTop: '12px',
						paddingBottom: '12px',
						height: 'auto',
					}}
				>
					<span style={{ margin: '0px', width: '100%', textTransform: 'none' }}>
						Добавьте способ выплаты, чтобы мы могли начислять вознаграждения за
						продажи вам прямо на карту
					</span>
				</div>

				<span style={{ textTransform: 'none', marginTop: '8px' }}>
					Необходимо только продавцам!
				</span>

				<MainButton
					text='ПРОДОЛЖИТЬ'
					onClick={() => navigate('/connect-payments-form')}
				/>
			</div>
		</>
	)
}

export default ConnectPayments
