import MainButton from '@twa-dev/mainbutton'
import { useEffect, useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import { fetchCardNumber } from '../../entities/wallet/model/fetchCardNumber'
import { useUpdatePaymentInfo } from '../../entities/wallet/model/useUpdatePaymentInfo'

function ConnectPaymentsForm() {
	const { id } = window.Telegram.WebApp.initDataUnsafe.user
	const [modalFillOpen, setModalFillOpen] = useState(false)
	const [formData, setFormData] = useState({
		number: '',
	})

	const { updatePaymentInfo } = useUpdatePaymentInfo(formData, setModalFillOpen)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await fetchCardNumber()
				setFormData({ number: data.number || '' })
			} catch (error) {
				console.error('Ошибка при запросе к серверу:', error)
			}
		}

		fetchData()
	}, [id])

	const handleOkBtnClick = () => {
		setModalFillOpen(false)
	}

	const onPublish = () => {
		updatePaymentInfo()
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, files } = e.target

		setFormData(prevData => ({
			...prevData,
			[name]: files ? files[0] : value,
		}))
	}

	return (
		<>
			{modalFillOpen && (
				<div className='blackout'>
					<div
						className='modal'
						style={{ height: '120px', marginTop: '-240px' }}
					>
						<div className='modal-content'>
							<p>Заполните все обязательные поля</p>
							<button className='modal_btn' onClick={handleOkBtnClick}>
								Ок
							</button>
						</div>
					</div>
				</div>
			)}
			<div
				className='back_btn'
				onClick={() => {
					window.history.back()
				}}
			></div>
			<div className='column'>
				<span style={{ marginTop: '8px' }}>Номер карты</span>
				<input
					className='field'
					style={{ border: 'none', outline: 'none' }}
					type='text'
					placeholder='4809388886227309'
					name='number'
					value={formData.number}
					onChange={handleChange}
				/>
			</div>
			<MainButton text='СОХРАНИТЬ' onClick={onPublish} />
		</>
	)
}

export default ConnectPaymentsForm
