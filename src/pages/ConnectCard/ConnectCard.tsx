import { FC, useEffect, useState } from 'react'
import { fetchCardNumber } from 'src/entities/wallet/model/fetchCardNumber'
import { useUpdatePaymentInfo } from 'src/entities/wallet/model/useUpdatePaymentInfo'
import MainButton from 'src/shared/components/MainButton/MainButton'
import ModalNotification from 'src/shared/components/ModalNotification/ModalNotification'
import styles from './ConnectCard.module.css'

const ConnectCard: FC = () => {
	const { id } = window.Telegram.WebApp.initDataUnsafe.user
	const [modalFillOpen, setModalFillOpen] = useState(false)
	const [formData, setFormData] = useState({
		number: '',
	})

	var BackButton = window.Telegram.WebApp.BackButton
	BackButton.show()
	BackButton.onClick(function () {
		BackButton.hide()
	})
	window.Telegram.WebApp.onEvent('backButtonClicked', function () {
		window.history.back()
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
		<div className={styles['connect-card']}>
			{modalFillOpen && (
				<div className={styles['connect-card__notification']}>
					<ModalNotification
						onClose={handleOkBtnClick}
						text='Заполните все обязательные поля'
						title='Внимание'
					/>
				</div>
			)}
			<h1 className={styles['connect-card__title']}>Новая карта</h1>
			<div className={styles['connect-card__content']}>
				<input
					className={styles['connect-card__field']}
					type='text'
					placeholder='4444 3444 4444 4444'
					name='number'
					value={formData.number}
					onChange={handleChange}
				/>
				<p className={styles['connect-card__info']}>
					Деньги переводятся на карту спустя 7 дней после получения оплаты,
					таким образом мы защищаем пользователей и сохраняем лояльность к нашим
					продавцам и площадке.
				</p>
				<p className={styles['connect-card__info']}>
					Минимальная сумма выплат составляет 6 000₽.
				</p>
			</div>
			<MainButton
				text='Сохранить'
				onClickEvent={onPublish}
				className={styles['connect-card__button']}
			/>
		</div>
	)
}

export default ConnectCard
