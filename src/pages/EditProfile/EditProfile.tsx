import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { filterOptions } from 'src/features/filterOptions'
import { useUserProfile } from 'src/pages/UserProfile/model/useUserProfile'
import MainButton from 'src/shared/components/MainButton/MainButton'
import VerificationInput from 'src/shared/components/VerificationInput/VerificationInput'
import Bell from '../../shared/assets/profile/Bell.svg'
import Bulb from '../../shared/assets/profile/Bulb.svg'
import Error from '../../shared/assets/profile/Error.svg'
import Faq from '../../shared/assets/profile/Faq.svg'
import MarkedExist from '../../shared/assets/profile/MarkedExist.svg'
import Naming from '../../shared/assets/profile/Naming.svg'
import Warning from '../../shared/assets/profile/Warning.svg'
import CloseImg from '../../shared/assets/wallet/CloseImg.svg'
import { optionsSubject } from '../optionsSubject'
import { optionsUniv } from '../optionsUniv'
import styles from './EditProfile.module.css'
import InputWithVariants from './ui/InputWithVariants/InputWithVariants'
import LinksFAQ from './ui/LinksFAQ/LinksFAQ'

const EditProfile: FC = () => {
	const { userData, isNotify, selectedOptionsProfile, uniValueProfile } =
		useUserProfile()

	console.log('selectedOptionsProfile', selectedOptionsProfile)

	const [selectedOptions, setSelectedOptions] = useState<string[]>(
		selectedOptionsProfile
	)
	console.log('selectedOptions', selectedOptions)
	const [uniValue, setUniValue] = useState(uniValueProfile)
	const [boxIsVisibleSubject, setBoxIsVisibleSubject] = useState(false)
	const [boxIsVisibleUniv, setBoxIsVisibleUniv] = useState(false)
	const [inputValueSubject, setInputValueSubject] = useState('')
	const [inputValueUniv, setInputValueUniv] = useState('')

	console.log(boxIsVisibleUniv)

	const handleRemoveOptionSubject = (optionToRemove: string) => {
		const updatedOptions = selectedOptions.filter(
			option => option !== optionToRemove
		)
		setSelectedOptions(updatedOptions)
	}

	const handleSelectChangeSubject = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const value = event.target.value
		setInputValueSubject(value)
		setBoxIsVisibleSubject(true)
	}

	const handleOptionClickSubject = (option: string) => {
		if (!selectedOptions.includes(option)) {
			setSelectedOptions([...selectedOptions, option])
		}
		setInputValueSubject('')
		setBoxIsVisibleSubject(false)
	}

	const handleUniChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value
		setInputValueUniv(value)
		setBoxIsVisibleUniv(true)
	}

	const handleOptionClickUniv = (option: string) => {
		if (uniValue !== option) {
			setUniValue(option)
		}
		setInputValueUniv('')
		setBoxIsVisibleUniv(false)
	}
	const handleRemoveOptionUniv = () => {
		setUniValue('')
	}

	const filteredOptionsSubject = filterOptions(
		optionsSubject,
		inputValueSubject
	)

	const filteredOptionsUniv = filterOptions(optionsUniv, inputValueUniv)

	const varsSubject = filteredOptionsSubject.map(
		(item: string, index: number) => {
			const isSelected = selectedOptions.includes(item)

			return (
				<div
					className={styles['edit-profile__ubject-variant']}
					key={index}
					onClick={() => handleOptionClickSubject(item)}
				>
					<p className={styles['edit-profile__ubject-variant-text']}>{item}</p>
					{isSelected && (
						<img
							src={MarkedExist}
							alt='Уже выбранный предмет'
							className={styles['edit-profile__ubject-variant-img']}
						/>
					)}
				</div>
			)
		}
	)
	const varsUniv = filteredOptionsUniv.map((item: string, index: number) => {
		const isSelected = selectedOptions.includes(item)

		return (
			<div
				className={styles['edit-profile__ubject-variant']}
				key={index}
				onClick={() => handleOptionClickUniv(item)}
			>
				<p className={styles['edit-profile__ubject-variant-text']}>{item}</p>
				{isSelected && (
					<img
						src={MarkedExist}
						alt='Уже выбранный университет'
						className={styles['edit-profile__ubject-variant-img']}
					/>
				)}
			</div>
		)
	})

	return (
		<div className={styles['edit-profile']}>
			<div className={styles['edit-profile__details']}>
				<h2 className={styles['edit-profile__title']}>Детали профиля</h2>

				<div
					className={styles['edit-profile__avatar']}
					style={{
						backgroundImage: `url(https://comncoursetest.ru${userData?.photo_url})`,
					}}
				/>

				<p className={styles['edit-profile__name']}>
					{userData?.first_name} {userData?.last_name}
				</p>
			</div>

			<div className={styles['edit-profile__sections']}>
				<div className={styles['edit-profile__section']}>
					<h3 className={styles['edit-profile__subtitle']}>Университет</h3>
					<InputWithVariants
						text='Выбери университет'
						inputValueSubjectComponent={inputValueUniv}
						onChange={handleUniChange}
						isValue={boxIsVisibleUniv ? true : false}
						onClick={() => {
							setBoxIsVisibleUniv(true)
							setBoxIsVisibleSubject(false)
						}}
					>
						{uniValue ? (
							<div className={styles['edit-profile__exist-subject']}>
								<p className={styles['edit-profile__exist-subject-text']}>
									{uniValue}
								</p>
								<button
									className={styles['edit-profile__exist-subject-button']}
									onClick={() => handleRemoveOptionUniv()}
								>
									<img
										src={CloseImg}
										alt='Удалить предмет'
										className={styles['edit-profile__exist-subject-img']}
									/>
								</button>
							</div>
						) : (
							<></>
						)}
					</InputWithVariants>
					{boxIsVisibleUniv ? (
						<div className={styles['edit-profile__all-subjects']}>
							{varsUniv}
						</div>
					) : (
						<></>
					)}
				</div>

				<div className={styles['edit-profile__section']}>
					<h3 className={styles['edit-profile__subtitle']}>Предмет</h3>
					<InputWithVariants
						text='Выбери предмет'
						inputValueSubjectComponent={inputValueSubject}
						onChange={handleSelectChangeSubject}
						isValue={boxIsVisibleSubject ? true : false}
						onClick={() => {
							setBoxIsVisibleSubject(true)
							setBoxIsVisibleUniv(false)
						}}
					>
						{selectedOptions ? (
							selectedOptions.map(option => (
								<div
									className={styles['edit-profile__exist-subject']}
									key={option}
								>
									<p className={styles['edit-profile__exist-subject-text']}>
										{option}
									</p>
									<button
										className={styles['edit-profile__exist-subject-button']}
										onClick={() => handleRemoveOptionSubject(option)}
									>
										<img
											src={CloseImg}
											alt='Удалить предмет'
											className={styles['edit-profile__exist-subject-img']}
										/>
									</button>
								</div>
							))
						) : (
							<></>
						)}
					</InputWithVariants>
					{boxIsVisibleSubject ? (
						<div className={styles['edit-profile__all-subjects']}>
							{varsSubject}
						</div>
					) : (
						<></>
					)}
				</div>

				<div className={styles['edit-profile__section']}>
					<h3 className={styles['edit-profile__subtitle']}>Описание</h3>
					<VerificationInput
						placeholder='Расскажи о себе'
						inputFunction={() => console.log(2)}
						inputName='about'
						inputValue=''
					/>
				</div>

				<div className={styles['edit-profile__section']}>
					<h3 className={styles['edit-profile__subtitle']}>Курсы</h3>
					<LinksFAQ
						isSubmit={false}
						path={Bell}
						isNotify={isNotify}
						text='Получай уведомления о новых курсах наших преподавателей'
					/>
				</div>

				<div className={styles['edit-profile__section']}>
					<h3 className={styles['edit-profile__subtitle']}>Обратная связь</h3>
					<Link
						to='https://forms.gle/x9KbBitA1AGDPmXY8'
						target='_blank'
						onClick={event => {
							event.preventDefault()
							window.open('https://forms.gle/x9KbBitA1AGDPmXY8')
						}}
					>
						<LinksFAQ
							isSubmit={true}
							path={Error}
							isNotify={isNotify}
							text='Сообщить о баге'
						/>
					</Link>
					<Link
						to='https://forms.gle/NtaWQe2wuiRpcY2L8'
						target='_blank'
						onClick={event => {
							event.preventDefault()
							window.open('https://forms.gle/NtaWQe2wuiRpcY2L8')
						}}
					>
						<LinksFAQ
							isSubmit={true}
							path={Bulb}
							isNotify={isNotify}
							text='Предложить идею'
						/>
					</Link>
				</div>

				<div className={styles['edit-profile__section']}>
					<h3 className={styles['edit-profile__subtitle']}>О проекте</h3>
					<Link
						to='https://t.me/HowToCommonCourse '
						target='_blank'
						onClick={event => {
							event.preventDefault()
							window.open('https://t.me/HowToCommonCourse ')
						}}
					>
						<LinksFAQ
							isSubmit={true}
							path={Faq}
							isNotify={isNotify}
							text='Ответы на вопросы'
						/>
					</Link>
					<Link
						to='https://t.me/HowToCommonCourse '
						target='_blank'
						onClick={event => {
							event.preventDefault()
							window.open('https://t.me/HowToCommonCourse ')
						}}
					>
						<LinksFAQ
							isSubmit={true}
							path={Naming}
							isNotify={isNotify}
							text='Наш телеграм канал'
						/>
					</Link>
				</div>

				<div className={styles['edit-profile__section']}>
					<h3 className={styles['edit-profile__subtitle']}>О приложении</h3>
					<LinksFAQ
						isSubmit={true}
						path={Warning}
						isNotify={isNotify}
						text='Правовая информация'
					/>
				</div>
			</div>

			<MainButton text='Сохранить' onClickEvent={() => console.log(1)} />
		</div>
	)
}

export default EditProfile
