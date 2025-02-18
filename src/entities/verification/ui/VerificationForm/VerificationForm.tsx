import { FC, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useNavigate } from 'react-router-dom'
import { IFormData } from 'src/entities/wallet/model/types'
import { handleFormSubmit } from 'src/features/verification/model/handleFormSubmit'
import ImageField from 'src/shared/components/ImageField/ImageField'
import MainButton from 'src/shared/components/MainButton/MainButton'
import ModalNotification from 'src/shared/components/ModalNotification/ModalNotification'
import VerificationInput from 'src/shared/components/VerificationInput/VerificationInput'
import PassportData from '../../../../shared/assets/profile/PassportData.svg'
import SubscribeData from '../../../../shared/assets/profile/SubscribeData.svg'
import Check from '../../../../shared/assets/wallet/Check.svg'
import styles from './VerificationForm.module.css'

export const VerificationForm: FC = () => {
	const navigate = useNavigate()
	const [modalFillOpen, setModalFillOpen] = useState(false)
	const [birthDate, setBirthDate] = useState<Date | null>(null)
	const [passportDate, setPassportDate] = useState<Date | null>(null)
	const [formData, setFormData] = useState<IFormData>({
		passportCopy: null,
		registrationCopy: null,
		Name: '',
		Surname: '',
		secondName: '',
		birthPlace: '',
		birthDate: '',
		passportDate: '',
		idNum: '',
		Code: '',
		Provided: '',
		registrationAddress: '',
		Inn: '',
		Phone: '',
		Email: '',
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, files } = e.target
		setFormData(prevData => ({
			...prevData,
			[name]: files ? files[0] : value,
		}))
	}

	const handlePublish = async () => {
		const isSuccess = await handleFormSubmit(
			formData,
			birthDate,
			passportDate,
			navigate
		)
		if (!isSuccess) {
			setModalFillOpen(true)
			window.document.body.style.overflow = 'hidden'
			document.documentElement.style.overflow = 'hidden'
		}
	}

	return (
		<div className={styles['verification']}>
			{modalFillOpen ? (
				<div className={styles['verification__notification']}>
					<ModalNotification
						title='Внимание'
						text='Заполните все обязательные поля'
						onClose={() => setModalFillOpen(false)}
					/>
				</div>
			) : null}
			<h1 className={styles['verification__title']}>Верификация</h1>

			<div className={styles['verification__images']}>
				<ImageField
					text='Добавить фото документа'
					link={PassportData}
					inputName='passportCopy'
					linkChecked={Check}
				/>
				<ImageField
					text='Добавить страницу регистрации'
					link={SubscribeData}
					inputName='registrationCopy'
					linkChecked={Check}
				/>
			</div>

			<div className={styles['verification__form']}>
				<div className={styles['verification__section']}>
					<h2 className={styles['verification__section-title']}>
						Паспортные данные
					</h2>
					<div className={styles['verification__inputs']}>
						<VerificationInput
							placeholder='Фамилия'
							inputValue={formData.Surname || ''}
							inputFunction={handleChange}
							inputName='Surname'
						/>
						<VerificationInput
							placeholder='Имя'
							inputValue={formData.Name || ''}
							inputFunction={handleChange}
							inputName='Name'
						/>
						<div className={styles['verification__input-group']}>
							<VerificationInput
								placeholder='Отчество'
								inputValue={formData.secondName || ''}
								inputFunction={handleChange}
								inputName='secondName'
							/>
							<label className={styles['verification__no-middle-name']}>
								<input
									type='radio'
									name='no-middle-name'
									className={styles['verification__no-middle-name-input']}
								/>
								<p className={styles['verification__no-middle-name-text']}>
									Нет отчества
								</p>
							</label>
						</div>
						<div className={styles['verification-input']}>
							<DatePicker
								selected={birthDate}
								onChange={date => setBirthDate(date)}
								placeholderText='Дата рождения'
								dateFormat='dd.MM.yyyy'
							/>
						</div>
						<VerificationInput
							placeholder='Серия и номер'
							inputValue={formData.idNum || ''}
							inputFunction={handleChange}
							inputName='idNum'
						/>
						<div className={styles['verification-input']}>
							<DatePicker
								selected={passportDate}
								onChange={date => setPassportDate(date)}
								placeholderText='Дата выдачи'
								dateFormat='dd.MM.yyyy'
							/>
						</div>
						<VerificationInput
							placeholder='Код подразделения'
							inputValue={formData.Code || ''}
							inputFunction={handleChange}
							inputName='Code'
						/>
						<VerificationInput
							placeholder='Кем выдан'
							inputValue={formData.Provided || ''}
							inputFunction={handleChange}
							inputName='Provided'
						/>
						<VerificationInput
							placeholder='Адрес регистрации (как в паспорте)'
							inputValue={formData.registrationAddress || ''}
							inputFunction={handleChange}
							inputName='registrationAddress'
						/>
					</div>
				</div>

				<div className={styles['verification__section']}>
					<h2 className={styles['verification__section-title']}>ИНН</h2>
					<VerificationInput
						placeholder='ИНН'
						inputValue={formData.Inn || ''}
						inputFunction={handleChange}
						inputName='Inn'
					/>
				</div>

				<div className={styles['verification__section']}>
					<h2 className={styles['verification__section-title']}>
						Контактная информация
					</h2>
					<VerificationInput
						placeholder='Номер телефона'
						inputValue={formData.Phone || ''}
						inputFunction={handleChange}
						inputName='Phone'
					/>
					<VerificationInput
						placeholder='Почта'
						inputValue={formData.Email || ''}
						inputFunction={handleChange}
						inputName='Email'
					/>
					<p className={styles['verification__description']}>
						Мы гарантируем безопасность твоих данных. Вся информация
						отправляется сразу в банк, а твои данные надежно зашифрованы.
					</p>
				</div>
			</div>

			<MainButton text='Отправить' onClickEvent={handlePublish} />
		</div>
	)
}
