import { FC } from 'react'
import Animal from '../../../shared/assets/wallet/Animal.webp'
import CloseImg from '../../../shared/assets/wallet/CloseImg.svg'
import styles from './ModalNotification.module.css'

const ModalNotification: FC<{
	title: string
	text: string
	onClose: () => void
}> = ({ title, text, onClose }) => {
	const handleClose = () => {
		window.document.body.style.overflow = 'scroll'
		document.documentElement.style.overflow = 'scroll'
		onClose()
	}

	return (
		<div className={styles['modal-notification']}>
			<img
				className={styles['modal-notification__image']}
				src={Animal}
				alt='Уведомление'
			/>
			<div className={styles['modal-notification__content']}>
				<h1 className={styles['modal-notification__title']}>{title}</h1>
				<p className={styles['modal-notification__text']}>{text}</p>
			</div>
			<button
				className={styles['modal-notification__close-button']}
				onClick={handleClose}
			>
				<img
					src={CloseImg}
					alt='Закрыть окно'
					className={styles['modal-notification__close-button-img']}
				/>
			</button>
		</div>
	)
}

export default ModalNotification
