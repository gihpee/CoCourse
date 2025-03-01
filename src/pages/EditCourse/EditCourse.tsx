import React, { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { publishCourse } from 'src/entities/course/model/fetchEditCourse'
import MainButton from 'src/shared/components/MainButton/MainButton'
import ModalNotification from 'src/shared/components/ModalNotification/ModalNotification'
import Camera from '../../shared/assets/feedback/Camera.svg'
import MarkedExist from '../../shared/assets/profile/MarkedExist.svg'
import TrashEmpty from '../../shared/assets/profile/Trash_Empty.svg'
import CloseImg from '../../shared/assets/wallet/CloseImg.svg'
import { API_BASE_URL, BASE_URL } from '../../shared/config/api'
import InputWithVariants from '../EditProfile/ui/InputWithVariants/InputWithVariants'
import { optionsSubject } from '../optionsSubject'
import { optionsUniv } from '../optionsUniv'
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

	const [formData, setFormData] = useState<FormData>({
		Name: '',
		Univ: '',
		Course: '',
		Desc: '',
		Price: null,
		ChannelUrl: '',
		is_draft: false,
		Subject: '',
		topics: [],
	})

	const [imageSrc, setImageSrc] = useState(null)

	const [modalFillOpen, setModalFillOpen] = useState(false)

	// const userFriendlyAddress = useTonAddress()
	const [verifyed, setVerifyed] = useState(false)
	const [modalText, setModalText] = useState('')

	const handleOkBtnClick = () => {
		setModalFillOpen(false)
	}

	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const response = await fetch(`${API_BASE_URL}/get-courses/?id=${cid}`)
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

	/*useEffect(() => {
        const textarea = document.querySelector('.bio_textarea');
        if (textarea && formData.Desc) {
          textarea.style.height = 'auto';
          textarea.style.height = textarea.scrollHeight + 'px';
        }
      }, [formData.Desc]);*/
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target

		// if (type === 'textarea') {
		// 	e.target.style.height = 'auto'
		// 	e.target.style.height = e.target.scrollHeight - 16 + 'px'
		// }

		setFormData(prevData => ({
			...prevData,
			[name]: value,
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

	const handleRemoveTopic = (indexToRemove: number) => {
		setFormData(prevData => ({
			...prevData,
			topics: prevData.topics.filter((_, index) => index !== indexToRemove),
		}))
	}

	const handleTopicChange = (
		index: number,
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target

		const field = name.split('_')[0]

		// if (type === 'textarea') {
		// 	e.target.style.height = 'auto'
		// 	e.target.style.height = e.target.scrollHeight - 16 + 'px'
		// }

		setFormData(prevData => {
			const newTopics = [...prevData.topics]
			newTopics[index][field] = value
			return {
				...prevData,
				topics: newTopics,
			}
		})
	}

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
		} else {
			if (
				formData.Name === '' ||
				formData.Univ === '' ||
				formData.Desc === '' ||
				formData.Subject === ''
			) {
				setModalFillOpen(true)
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
	}

	const handlePublish = async () => {
		if (!formData.is_draft) {
			if (
				formData.Name === '' ||
				formData.Univ === '' ||
				formData.Desc === '' ||
				formData.Subject === ''
			) {
				setModalText('Заполните все обязательные поля')
				setModalFillOpen(true)
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

	const [boxIsVisibleSubject, setBoxIsVisibleSubject] = useState(false)
	const [inputValueSubject, setInputValueSubject] = useState('')

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

	const handleRemoveOptionSubject = (optionToRemove: string) => {
		setFormData(prevData => {
			return {
				...prevData,
				Subject: '',
			}
		})
	}

	const filteredOptionsSubject = optionsSubject.filter(option =>
		option.toLowerCase().includes(inputValueSubject.toLowerCase())
	)

	const [boxIsVisibleUniv, setBoxIsVisibleUniv] = useState(false)
	const [inputValueUniv, setInputValueUniv] = useState('')

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

	const handleRemoveOptionUniv = (optionToRemove: string) => {
		setFormData(prevData => {
			return {
				...prevData,
				Univ: '',
			}
		})
	}

	const filteredOptionsUniv = optionsUniv.filter(option =>
		option.toLowerCase().includes(inputValueUniv.toLowerCase())
	)

	const varsSubject = filteredOptionsSubject.map(
		(item: string, index: number) => {
			const isSelected = formData.Subject === item

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
		const isSelected = formData.Univ === item

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
							src={`https://${BASE_URL}.ru${imageSrc}`}
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
					{formData.Name ? formData.Name : 'Нет названия'}
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
						onClickImg={() => setBoxIsVisibleUniv(false)}
						onClick={() => {
							setBoxIsVisibleUniv(true)
							setBoxIsVisibleSubject(false)
						}}
					>
						{formData.Univ ? (
							<div className={styles['edit-course__exist-subject']}>
								<p className={styles['edit-course__exist-subject-text']}>
									{formData.Univ}
								</p>
								<button
									className={styles['edit-course__exist-subject-button']}
									onClick={() => handleRemoveOptionUniv(formData.Univ)}
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
							{varsUniv.map((item, index) => (
								<React.Fragment key={index}>
									{index > 0 && (
										<div
											className={styles['edit-course__all-subjects-divider']}
										/>
									)}
									{item}
								</React.Fragment>
							))}
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
						onClickImg={() => setBoxIsVisibleSubject(false)}
						onClick={() => {
							setBoxIsVisibleSubject(true)
							setBoxIsVisibleUniv(false)
						}}
					>
						{formData.Subject ? (
							<div
								className={styles['edit-course__exist-subject']}
								key={formData.Subject}
							>
								<p className={styles['edit-course__exist-subject-text']}>
									{formData.Subject}
								</p>
								<button
									className={styles['edit-course__exist-subject-button']}
									onClick={() => handleRemoveOptionSubject(formData.Subject)}
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
					{boxIsVisibleSubject ? (
						<div className={styles['edit-course__all-subjects']}>
							{varsSubject.map((item, index) => (
								<React.Fragment key={index}>
									{index > 0 && (
										<div
											className={styles['edit-course__all-subjects-divider']}
										/>
									)}
									{item}
								</React.Fragment>
							))}
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
						placeholder='Расскажите о курсе'
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
						onClose={handleOkBtnClick}
						text={modalText}
						title='Внимание'
					/>
				</div>
			)}
		</div>
	)
}

export default EditCourse
