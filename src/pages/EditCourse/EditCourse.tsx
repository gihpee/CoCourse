import { FC, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { fetchCreateCourse } from 'src/entities/course/model/fetchCreateCourse'
import { publishCourse } from 'src/entities/course/model/fetchEditCourse'
import { filterOptions } from 'src/features/filterOptions'
import MainButton from 'src/shared/components/MainButton/MainButton'
import ModalNotification from 'src/shared/components/ModalNotification/ModalNotification'
import Camera from '../../shared/assets/feedback/Camera.svg'
import MarkedExist from '../../shared/assets/profile/MarkedExist.svg'
import TrashEmpty from '../../shared/assets/profile/Trash_Empty.svg'
import CloseImg from '../../shared/assets/wallet/CloseImg.svg'
import InputWithVariants from '../EditProfile/ui/InputWithVariants/InputWithVariants'
import { optionsSubject } from '../optionsSubject'
import { optionsUniv } from '../optionsUniv'
import { useUserProfile } from '../UserProfile/model/useUserProfile'
import styles from './EditCourse.module.css'

interface FormData {
	Name: string
	Univ: string
	Course: string
	Desc: string
	Subject: string
	topics: any[]
	Price: any
	ChannelUrl: string
	is_draft: boolean
}

const EditCourse: FC = () => {
	const { cid } = useParams()
	const navigate = useNavigate()
	const location = useLocation()
	const data = location.state?.data || {}
	console.log('data', data)

	const { userData, selectedOptionsProfile, uniValueProfile } = useUserProfile()

	console.log('selectedOptionsProfile', selectedOptionsProfile)

	const [selectedOptions, setSelectedOptions] = useState<string[]>([])

	const [uniValue, setUniValue] = useState('')
	const [boxIsVisibleSubject, setBoxIsVisibleSubject] = useState(false)
	const [boxIsVisibleUniv, setBoxIsVisibleUniv] = useState(false)
	const [inputValueSubject, setInputValueSubject] = useState('')
	const [inputValueUniv, setInputValueUniv] = useState('')
	const [verifyed, setVerifyed] = useState(false)
	const [modalText, setModalText] = useState('')
	const [imageSrc, setImageSrc] = useState(null)
	const [modalFillOpen, setModalFillOpen] = useState(false)
	const [modalVOpen, setModalVOpen] = useState(false)

	console.log(modalText)
	console.log(imageSrc)
	console.log(modalFillOpen)
	console.log(modalVOpen)
	console.log(userData)

	function handleFail() {
		setModalFillOpen(false)
		window.document.body.style.overflow = 'visible'
		document.documentElement.style.overflow = 'visible'
	}

	function handleFail2() {
		setModalVOpen(false)
		window.document.body.style.overflow = 'visible'
		document.documentElement.style.overflow = 'visible'
	}

	const [formData, setFormData] = useState<FormData>({
		Name: '',
		Univ: '',
		Course: '1 курс, 1 семестр',
		Desc: '',
		Price: null,
		ChannelUrl: data?.channel?.url || '',
		is_draft: false,
		Subject: '',
		topics: [],
	})

	console.log(boxIsVisibleUniv)

	useEffect(() => {
		setSelectedOptions(selectedOptionsProfile)
	}, [selectedOptionsProfile])

	useEffect(() => {
		setUniValue(uniValueProfile)
	}, [uniValueProfile])

	console.log('selectedOptions', selectedOptions)

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
		if (formData.Subject !== option) {
			setFormData(prevData => {
				return {
					...prevData,
					Subject: option,
				}
			})
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
		if (formData.Univ !== option) {
			setFormData(prevData => {
				return {
					...prevData,
					Univ: option,
				}
			})
		}
		setInputValueUniv('')
		setBoxIsVisibleUniv(false)
	}

	const handleRemoveOptionUniv = () => {
		setUniValue('')
	}

	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const response = await fetch(
					`https://comncoursetest.ru/api/get-courses/?id=${cid}`
				)
				const data = await response.json()

				setFormData(prevData => ({
					...prevData,
					Name: data.channel.name,
					Univ: data.university,
					Desc: data.description,
					Subject: data.subject,
					topics: Array.isArray(data.topics) ? data.topics : [],
					Price: data.price,
					is_draft: data.is_draft,
				}))

				setImageSrc(data.channel.photo)
				setVerifyed(data.user.verifyed)
			} catch (error) {
				console.error('Error fetching data:', error)
			}
		}

		fetchCourses()
	}, [cid])

	const handlePublishDraft = async () => {
		// if (!userFriendlyAddress && !verifyed) {
		// 	setModalText(
		// 		'Для создания курса необходимо пройти верификацию и подключить выплаты'
		// 	)
		// 	setModalLink('/connect-wallet')
		// 	setModalButton('Пройти')
		// 	setModalVOpen(true)
		// }
		// else if (!userFriendlyAddress) {
		// 	setModalText('Для создания курса необходимо подключить выплаты')
		// 	setModalLink('/connect-walletN')
		// 	setModalButton('Подключить')
		// 	setModalVOpen(true)
		// }
		if (!verifyed) {
			setModalText('Для создания курса необходимо пройти верификацию')
			// setModalButton('Пройти')
			setModalVOpen(true)
			window.document.body.style.overflow = 'hidden'
			document.documentElement.style.overflow = 'hidden'
		} else {
			if (
				formData.Name === '' ||
				formData.Univ === '' ||
				formData.Desc === '' ||
				formData.Subject === ''
			) {
				setModalFillOpen(true)
				window.document.body.style.overflow = 'hidden'
				document.documentElement.style.overflow = 'hidden'
				console.log(formData)
			} else {
				if (cid) {
					try {
						await publishCourse(cid, formData)
						navigate('/profile')
					} catch (error) {
						setModalText('Произошла ошибка при публикации курса')
						setModalVOpen(true)
						window.document.body.style.overflow = 'hidden'
						document.documentElement.style.overflow = 'hidden'
					}
				}
			}
		}
	}

	const handlePublish = async () => {
		if (data.user.verifyed !== 'Пройдена') {
		} else {
			if (
				formData.Name === '' ||
				formData.Univ === '' ||
				formData.Desc === '' ||
				formData.Subject === ''
			) {
				console.log(1)
			} else {
				let university = formData.Univ || 'Не указано'
				let description = formData.Desc || 'Не указано'
				let subjects = formData.Subject || 'Не указано'
				let topics = formData.topics
				let price = formData.Price || 0
				let course_id = data.id
				let is_draft = false
				let address = ''

				try {
					await fetchCreateCourse({
						university,
						description,
						subjects,
						topics,
						price,
						course_id,
						is_draft,
						address,
					})

					navigate('/profile')
				} catch (error) {
					console.log('Failed to publish course', error)
				}
			}
		}
		if (!formData.is_draft) {
			if (
				formData.Name === '' ||
				formData.Univ === '' ||
				formData.Desc === '' ||
				formData.Subject === ''
			) {
				console.log(formData)
				setModalFillOpen(true)
				window.document.body.style.overflow = 'hidden'
				document.documentElement.style.overflow = 'hidden'
			} else {
				if (cid) {
					try {
						await publishCourse(cid, formData)
						navigate('/profile')
					} catch (error) {
						setModalText('Произошла ошибка при публикации курса')
					}
				}
			}
		} else {
			if (cid) {
				try {
					await publishCourse(cid, formData)
					navigate('/profile')
				} catch (error) {
					setModalText('Произошла ошибка при публикации курса')
				}
			}
		}
	}

	const filteredOptionsSubject = filterOptions(
		optionsSubject,
		inputValueSubject
	)

	const filteredOptionsUniv = filterOptions(optionsUniv, inputValueUniv)

	const handleTopicChange = (
		index: number,
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target

		const field = name.split('_')[0]

		setFormData(prevData => {
			const newTopics = [...prevData.topics]
			newTopics[index][field] = value
			return {
				...prevData,
				topics: newTopics,
			}
		})
	}

	const handleRemoveTopic = (indexToRemove: number) => {
		setFormData(prevData => ({
			...prevData,
			topics: prevData.topics.filter((_, index) => index !== indexToRemove),
		}))
	}

	const addEl = () => {
		setFormData(prevData => ({
			...prevData,
			topics: Array.isArray(prevData.topics)
				? [...prevData.topics, { topic: '', desc: '' }]
				: [{ topic: '', desc: '' }],
		}))
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

	const varsSubject = filteredOptionsSubject.map(
		(item: string, index: number) => {
			const isSelected = selectedOptions.includes(item)

			return (
				<div
					className={styles['edit-course__ubject-variant']}
					key={index}
					onClick={() => handleOptionClickSubject(item)}
				>
					<p className={styles['edit-course__ubject-variant-text']}>{item}</p>
					{isSelected && (
						<img
							src={MarkedExist}
							alt='Уже выбранный предмет'
							className={styles['edit-course__ubject-variant-img']}
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
				className={styles['edit-course__ubject-variant']}
				key={index}
				onClick={() => handleOptionClickUniv(item)}
			>
				<p className={styles['edit-course__ubject-variant-text']}>{item}</p>
				{isSelected && (
					<img
						src={MarkedExist}
						alt='Уже выбранный университет'
						className={styles['edit-course__ubject-variant-img']}
					/>
				)}
			</div>
		)
	})

	return (
		<div className={styles['edit-course']}>
			<div className={styles['edit-course__wrapper-head']}>
				<h1 className={styles['edit-course__header']}>Детали курса</h1>
				<div className={styles['edit-course__cover']}>
					{imageSrc ? (
						<img
							src={`https://comncoursetest.ru${imageSrc}`}
							alt='Обложка курса'
							className={styles['edit-course__cover-img']}
						/>
					) : data.channel?.photo ? (
						<img
							src={`https://comncoursetest.ru${data.channel.photo}`}
							alt='Обложка курса'
							className={styles['edit-course__cover-img']}
						/>
					) : (
						<div className={styles['edit-course__modal-placeholder']}>
							<img
								src={Camera}
								alt=''
								className={styles['edit-course__modal-placeholder-img']}
							/>
							<p className={styles['edit-course__modal-placeholder-text']}>
								Обложка отсутствует
							</p>
						</div>
					)}
				</div>
				<h2 className={styles['edit-course__title']}>
					{formData.Name
						? formData.Name
						: data.channel?.name
						? data.channel.name
						: 'Нет названия'}
				</h2>
			</div>

			<div className={styles['edit-course__wrapper-info']}>
				<div className={styles['edit-course__field']}>
					<h3 className={styles['edit-course__field-title']}>
						Стоимость курса
					</h3>
					<input
						type='number'
						placeholder='0'
						name='Price'
						value={formData.Price || ''}
						onChange={handleChange}
						className={styles['edit-course__price']}
					/>
				</div>

				<div className={styles['edit-course__field']}>
					<h3 className={styles['edit-course__field-title']}>Университет</h3>
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
							<div className={styles['edit-course__exist-subject']}>
								<p className={styles['edit-course__exist-subject-text']}>
									{uniValue}
								</p>
								<button
									className={styles['edit-course__exist-subject-button']}
									onClick={() => handleRemoveOptionUniv()}
								>
									<img
										src={CloseImg}
										alt='Удалить предмет'
										className={styles['edit-course__exist-subject-img']}
									/>
								</button>
							</div>
						) : (
							<></>
						)}
					</InputWithVariants>
					{boxIsVisibleUniv ? (
						<div className={styles['edit-course__all-subjects']}>
							{varsUniv}
						</div>
					) : (
						<></>
					)}
				</div>
				<div className={styles['edit-course__field']}>
					<h3 className={styles['edit-course__field-title']}>Предмет</h3>
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
									className={styles['edit-course__exist-subject']}
									key={option}
								>
									<p className={styles['edit-course__exist-subject-text']}>
										{option}
									</p>
									<button
										className={styles['edit-course__exist-subject-button']}
										onClick={() => handleRemoveOptionSubject(option)}
									>
										<img
											src={CloseImg}
											alt='Удалить предмет'
											className={styles['edit-course__exist-subject-img']}
										/>
									</button>
								</div>
							))
						) : (
							<></>
						)}
					</InputWithVariants>
					{boxIsVisibleSubject ? (
						<div className={styles['edit-course__all-subjects']}>
							{varsSubject}
						</div>
					) : (
						<></>
					)}
				</div>
				<div className={styles['edit-course__field']}>
					<h3 className={styles['edit-course__field-title']}>Описание</h3>
					<input
						type='text'
						name='Desc'
						value={formData.Desc}
						onChange={handleChange}
						className={styles['edit-course__field-description']}
					/>
				</div>
				<div className={styles['edit-course__field']}>
					<h3 className={styles['edit-course__field-title']}>Содержание</h3>
					{Array.isArray(formData.topics) &&
						formData.topics.length > 0 &&
						formData.topics.map((topic, index) => (
							<div
								key={index}
								className={styles['edit-course__field-column-fields']}
							>
								<div className={styles['edit-course__field-field']}>
									<input
										type='text'
										placeholder={`Название темы`}
										name={`topic_${index}`}
										value={topic.topic}
										onChange={e => handleTopicChange(index, e)}
										className={styles['edit-course__field-input']}
									/>
									<button className={styles['edit-course__field-button']}>
										<img
											src={TrashEmpty}
											alt=''
											onClick={() => handleRemoveTopic(index)}
											className={styles['edit-course__field-button-img']}
										/>
									</button>
								</div>
								<textarea
									placeholder={`Описание темы`}
									name={`desc_${index}`}
									value={topic.desc}
									onChange={e => handleTopicChange(index, e)}
									className={styles['edit-course__field-textarea']}
								/>
							</div>
						))}
					<div
						className={styles['edit-course__field-add-theme']}
						onClick={addEl}
					>
						<p className={styles['edit-course__field-add-theme-text']}>
							+ Добавить тему
						</p>
					</div>
				</div>
			</div>

			{formData.is_draft ? (
				<MainButton text='Опубликовать' onClickEvent={handlePublishDraft} />
			) : (
				<MainButton text='Опубликовать' onClickEvent={handlePublish} />
			)}

			{modalFillOpen && (
				<div className={styles['edit-course__notification']}>
					<ModalNotification
						onClose={handleFail}
						text={modalText}
						title='Внимание'
					/>
				</div>
			)}
			{modalVOpen && (
				<div className={styles['edit-course__notification']}>
					<ModalNotification
						onClose={handleFail2}
						text={modalText}
						title='Внимание'
					/>
				</div>
			)}
		</div>
	)
}

export default EditCourse
