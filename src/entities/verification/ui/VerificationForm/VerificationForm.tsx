import { ChangeEvent, FC, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useNavigate } from 'react-router-dom'
import { fetchCreatePassportData } from 'src/entities/wallet/model/fetchCreatePassportData'
import { IFormData } from 'src/entities/wallet/model/types'
import ImageField from 'src/shared/components/ImageField/ImageField'
import MainButton from 'src/shared/components/MainButton/MainButton'
import VerificationInput from 'src/shared/components/VerificationInput/VerificationInput'
import PassportData from '../../../../shared/assets/profile/PassportData.svg'
import SubscribeData from '../../../../shared/assets/profile/SubscribeData.svg'
import styles from './VerificationForm.module.css'

export const VerificationForm: FC = () => {
	const navigate = useNavigate()

	const [birthDate, setBirthDate] = useState<Date | null>(null)

	const [passportDate, setPassportDate] = useState<Date | null>(null)

	const [modalFillOpen, setModalFillOpen] = useState(false)

	// const handleOkBtnClick = () => {
	// 	setModalFillOpen(false)
	// }

	console.log(modalFillOpen)

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

	const handlePublish = async () => {
		const {
			passportCopy,
			registrationCopy,
			Name,
			Surname,
			secondName,
			birthPlace,
			idNum,
			Code,
			Provided,
			registrationAddress,
			Inn,
			Phone,
			Email,
		} = formData

		if (
			!passportCopy ||
			!registrationCopy ||
			!Name ||
			!Surname ||
			!secondName ||
			!birthPlace ||
			!idNum ||
			!Code ||
			!Provided ||
			!registrationAddress ||
			!Inn ||
			!Phone ||
			!Email ||
			!birthDate ||
			!passportDate
		) {
			setModalFillOpen(true)
		} else {
			let formDataToSend = new FormData()

			formDataToSend.append('passportCopy', passportCopy)
			formDataToSend.append('registrationCopy', registrationCopy)
			formDataToSend.append('Name', Name)
			formDataToSend.append('Surname', Surname)
			formDataToSend.append('secondName', secondName)
			formDataToSend.append('birthPlace', birthPlace)
			formDataToSend.append(
				'birthDate',
				birthDate ? birthDate.toISOString() : ''
			)
			formDataToSend.append(
				'passportDate',
				passportDate ? passportDate.toISOString() : ''
			)
			formDataToSend.append('idNum', idNum)
			formDataToSend.append('Code', Code)
			formDataToSend.append('Provided', Provided)
			formDataToSend.append('registrationAddress', registrationAddress)
			formDataToSend.append('Inn', Inn)
			formDataToSend.append('Phone', Phone)
			formDataToSend.append('Email', Email)

			const isSuccess = await fetchCreatePassportData(formDataToSend)

			if (isSuccess) {
				navigate('/profile')
			} else {
				setModalFillOpen(true)
			}
		}
	}

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value, files } = e.target

		setFormData(prevData => ({
			...prevData,
			[name]: files ? files[0] : value,
		}))
	}

	return (
		<div className={styles['verification']}>
			<h1 className={styles['verification__title']}>Верификация</h1>

			<div className={styles['verification__images']}>
				<ImageField
					text='Добавить фото документа'
					link={PassportData}
					inputName='passportCopy'
				/>
				<ImageField
					text='Добавить страницу регистрации'
					link={SubscribeData}
					inputName='registrationCopy'
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
