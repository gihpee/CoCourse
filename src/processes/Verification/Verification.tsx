import { FC } from 'react'
import MainButton from 'src/shared/components/MainButton/MainButton'
import VerificationInput from 'src/shared/components/VerificationInput/VerificationInput'
import PassportData from '../../shared/assets/profile/PassportData.svg'
import SubscribeData from '../../shared/assets/profile/SubscribeData.svg'
import ImageField from './ui/ImageField/ImageField'
import styles from './Verification.module.css'

const Verification: FC = () => {
	return (
		<div className={styles['verification']}>
			<h1 className={styles['verification__title']}>Верификация</h1>

			<div className={styles['verification__images']}>
				<ImageField text='Добавить фото документа' link={PassportData} />
				<ImageField text='Добавить страницу регистрации' link={SubscribeData} />
			</div>

			<div className={styles['verification__form']}>
				<div className={styles['verification__section']}>
					<h2 className={styles['verification__section-title']}>
						Паспортные данные
					</h2>
					<div className={styles['verification__inputs']}>
						<VerificationInput placeholder='Фамилия' />
						<VerificationInput placeholder='Имя' />
						<div className={styles['verification__input-group']}>
							<VerificationInput placeholder='Отчество' />
							<div></div>
						</div>
						<VerificationInput placeholder='Дата рождения' />
						<VerificationInput placeholder='Серия и номер' />
						<VerificationInput placeholder='Дата выдачи' />
						<VerificationInput placeholder='Код подразделения' />
						<VerificationInput placeholder='Кем выдан' />
						<VerificationInput placeholder='Адрес регистрации (как в паспорте)' />
					</div>
				</div>

				<div className={styles['verification__section']}>
					<h2 className={styles['verification__section-title']}>ИНН</h2>
					<VerificationInput placeholder='ИНН' />
				</div>

				<div className={styles['verification__section']}>
					<h2 className={styles['verification__section-title']}>
						Контактная информация
					</h2>
					<VerificationInput placeholder='Номер телефона' />
					<VerificationInput placeholder='Почта' />
					<p className={styles['verification__description']}>
						Мы гарантируем безопасность твоих данных. Вся информация
						отправляется сразу в банк, а твои данные надежно зашифрованы.
					</p>
				</div>
			</div>

			<MainButton text='Отправить' />
		</div>
	)
}

export default Verification
