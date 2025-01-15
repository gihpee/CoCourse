import MainButton from '@twa-dev/mainbutton'
import { useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { fetchCreateReturnRequest } from '../../entities/wallet/model/fetchCreateReturnRequest'

function ReturnForm() {
	const navigate = useNavigate()

	const location = useLocation()
	const { data } = location.state || {}

	const [formData, setFormData] = useState({
		Message: '',
		Email: '',
		Receipt: '',
	})

	const [modalFillOpen, setModalFillOpen] = useState(false)

	const handleOkBtnClick = () => {
		setModalFillOpen(false)
	}

	const handlePublish = async () => {
		if (!formData.Message || !formData.Email || !formData.Receipt) {
			setModalFillOpen(true)
		} else {
			try {
				const tid = data.id
				const reason = formData.Message
				const email = formData.Email
				const receipt = formData.Receipt

				await fetchCreateReturnRequest({ tid, reason, email, receipt })

				navigate('/profile')
			} catch (error) {
				console.error('Ошибка при отправке запроса возврата:', error)
			}
		}
	}

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target

		setFormData(prevData => ({
			...prevData,
			[name]: value,
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
				<span style={{ marginTop: '8px' }}>Опишите причину возврата</span>
				<div className='fieldt' style={{ minHeight: '48px' }}>
					<textarea
						placeholder={`Причина`}
						name={`Message`}
						value={formData.Message}
						onChange={handleChange}
					/>
				</div>
				<span style={{ marginTop: '8px' }}>Ваш email</span>
				<input
					className='field'
					style={{ border: 'none', outline: 'none' }}
					placeholder='example@mail.ru'
					name='Email'
					value={formData.Email}
					onChange={handleChange}
				/>
				<span style={{ marginTop: '8px' }}>Ссылка на чек</span>
				<input
					className='field'
					style={{ border: 'none', outline: 'none' }}
					type='text'
					placeholder='ofd.ru'
					name='Receipt'
					value={formData.Receipt}
					onChange={handleChange}
				/>
			</div>
			<MainButton text='ОТПРАВИТЬ' onClick={handlePublish} />
		</>
	)
}

export default ReturnForm
