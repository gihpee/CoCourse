import { FC, useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useNavigate } from 'react-router-dom'
import { fetchCreatePassportData } from 'src/entities/wallet/model/fetchCreatePassportData'
import { IFormData } from 'src/entities/wallet/model/types'
import ImageField from 'src/shared/components/ImageField/ImageField'
import MainButton from 'src/shared/components/MainButton/MainButton'
import ModalNotification from 'src/shared/components/ModalNotification/ModalNotification'
import VerificationInput from 'src/shared/components/VerificationInput/VerificationInput'
import PassportData from '../../../../shared/assets/profile/PassportData.svg'
import SubscribeData from '../../../../shared/assets/profile/SubscribeData.svg'
import Check from '../../../../shared/assets/wallet/Check.svg'
import CheckIcon from '../../../../shared/assets/wallet/CheckIcon.svg'
import styles from './VerificationForm.module.css'

export const VerificationForm: FC = () => {
	window.scrollTo(0, 0)

	var BackButton = window.Telegram.WebApp.BackButton
	BackButton.show()
	BackButton.onClick(function () {
		BackButton.hide()
	})
	window.Telegram.WebApp.onEvent('backButtonClicked', function () {
		window.history.back()
	})

	const navigate = useNavigate()
	const [modalFillOpen, setModalFillOpen] = useState(false)
	const [birthDate, setBirthDate] = useState<Date | null>(null)
	const [passportDate, setPassportDate] = useState<Date | null>(null)
	// const [isSubmitting, setIsSubmitting] = useState(false);

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

	useEffect(() => {
		console.log('Обновленные formData:', formData)
	}, [formData])

	useEffect(() => {
		setFormData(prevData => ({
			...prevData,
			birthDate: birthDate ? birthDate.toISOString() : '',
			passportDate: passportDate ? passportDate.toISOString() : '',
		}))
	}, [birthDate, passportDate])

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value, files } = e.target as HTMLInputElement
		setFormData(prevData => ({
			...prevData,
			[name]: files ? files[0] : value,
		}))
	}

	const handleFileSelect = (name: string, file: File | null) => {
		setFormData(prevData => ({
			...prevData,
			[name]: file ? file.name : '',
		}))
	}

	const handlePublish = async () => {
		// setIsSubmitting(true)

		if (
			!formData.passportCopy ||
			!formData.registrationCopy ||
			!formData.Name ||
			!formData.Surname ||
			!formData.secondName ||
			!formData.birthPlace ||
			!formData.idNum ||
			!formData.Code ||
			!formData.Provided ||
			!formData.registrationAddress ||
			!formData.Inn ||
			!formData.Phone ||
			!formData.Email ||
			!birthDate ||
			!passportDate
		) {
			setModalFillOpen(true)
			// setIsSubmitting(false)
			return
		}

		let formDataToSend = new FormData()
		Object.entries(formData).forEach(([key, value]) => {
			formDataToSend.append(key, value instanceof File ? value : String(value))
		})
		formDataToSend.append('birthDate', birthDate.toISOString())
		formDataToSend.append('passportDate', passportDate.toISOString())

		const isSuccess = await fetchCreatePassportData(formDataToSend)
		// setIsSubmitting(false)

		if (isSuccess) {
			navigate('/profile')
		} else {
			setModalFillOpen(true)
		}
	}

	const [noMiddleName, setNoMiddleName] = useState(false)

	const handleCheckboxChange = () => {
		setNoMiddleName(prev => !prev)
		setFormData(prev => ({
			...prev,
			secondName: !noMiddleName ? '-' : '',
		}))
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
			<div className={styles['verification__wrapper-images']}>
				<div className={styles['verification__images']}>
					<ImageField
						text='Добавить фото документа'
						textFill='Фото документа добавлены'
						link={PassportData}
						inputName='passportCopy'
						linkChecked={Check}
						onFileSelect={handleFileSelect}
					/>
					<ImageField
						text='Добавить страницу регистрации'
						textFill='Регистрация добавлена'
						link={SubscribeData}
						inputName='registrationCopy'
						linkChecked={Check}
						onFileSelect={handleFileSelect}
					/>
				</div>

				<p className={styles['verification__images-desc']}>
					Нажми «Добавить фото документа» и загрузи 2-3 страницы паспорта, затем
					нажми «Добавить страницу регистрации» и загрузи нужный документ.
					Убедись, что изображения четкие.
				</p>
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
							{!noMiddleName && (
								<VerificationInput
									placeholder='Отчество'
									inputValue={formData.secondName || ''}
									inputFunction={handleChange}
									inputName='secondName'
								/>
							)}
							<label className={styles['verification__checkbox-label']}>
								<input
									type='checkbox'
									checked={noMiddleName}
									onChange={handleCheckboxChange}
									className={styles['verification__checkbox']}
								/>
								<span
									className={`${styles['verification__checkbox-custom']} ${
										noMiddleName ? styles['checked'] : ''
									}`}
								>
									{noMiddleName && <img src={CheckIcon} alt='✔' />}
								</span>
								<p className={styles['verification__checkbox-text']}>
									Нет отчества
								</p>
							</label>
						</div>
						<div className={styles['verification-input']}>
							<DatePicker
								selected={birthDate}
								onChange={setBirthDate}
								placeholderText='Дата рождения'
								dateFormat='dd.MM.yyyy'
							/>
						</div>
						<VerificationInput
							placeholder='Место рождения'
							inputValue={formData.birthPlace || ''}
							inputFunction={handleChange}
							inputName='birthPlace'
						/>
						<VerificationInput
							placeholder='Серия и номер'
							inputValue={formData.idNum || ''}
							inputFunction={handleChange}
							inputName='idNum'
						/>
						<div className={styles['verification-input']}>
							<DatePicker
								selected={passportDate}
								onChange={setPassportDate}
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
