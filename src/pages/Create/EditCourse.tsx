import MainButton from '@twa-dev/mainbutton'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteCourse } from '../../entities/course/model/fetchDeleteCourse'
import { publishCourse } from '../../entities/course/model/fetchEditCourse'
import plus from '../../shared/assets/course/plus.svg'
import emptyHorizontalImage from '../../shared/assets/course/squareEmptyCourseImage.webp'
import krest from '../../shared/assets/create/ckrest.svg'
import { API_BASE_URL } from '../../shared/config/api'
import { optionsSubject } from '../optionsSubject'
import { optionsUniv } from '../optionsUniv'
import './EditCourse.css'

import { BASE_URL } from '../../shared/config/api'

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

function EditCourse() {
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

	const [isModalOpen, setModalOpen] = useState(false)

	const [modalFillOpen, setModalFillOpen] = useState(false)
	const [modalDraftOpen, setModalDraftOpen] = useState(false)

	// const userFriendlyAddress = useTonAddress()
	const [verifyed, setVerifyed] = useState(false)
	const [modalVOpen, setModalVOpen] = useState(false)
	const [modalText, setModalText] = useState('')
	const [modalLink, setModalLink] = useState('')
	const [modalButton, setModalButton] = useState('')

	const handleDeleteClick = () => {
		setModalOpen(true)
	}

	const handleLaterBtnClick = () => {
		setModalVOpen(false)
	}

	const handleConfirmDelete = async () => {
		setModalOpen(false)
		if (cid) {
			try {
				await deleteCourse(cid)

				navigate('/profile')
			} catch (error) {
				console.log('Failed to delete course', error)
			}
		}
	}

	const handleCancelDelete = () => {
		setModalOpen(false)
	}

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
			setModalLink('/verificationN')
			setModalButton('Пройти')
			setModalVOpen(true)
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
						setModalVOpen(true)
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

	const varsSubject = filteredOptionsSubject.map((item, index) => (
		<div
			className='field'
			key={index}
			onClick={() => handleOptionClickSubject(item)}
		>
			<p>{item}</p>
			<img src={plus} alt='' />
		</div>
	))

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

	const varsUniv = filteredOptionsUniv.map((item, index) => (
		<div
			className='field'
			key={index}
			onClick={() => handleOptionClickUniv(item)}
		>
			<p>{item}</p>
			<img src={plus} alt='' />
		</div>
	))

	const setImagePath = (imgPath: string | null): string => {
		if (!imgPath || imgPath.includes(`https://${BASE_URL}.runull`)) {
			return emptyHorizontalImage
		} else {
			return `url(https://${BASE_URL}.ru${imageSrc})`
		}
	}

	return (
		<>
			<div className='top_panel'>
				<div
					className='top_panel_back_btn'
					onClick={() => setModalDraftOpen(true)}
				></div>
				<div className='delete_btn' onClick={handleDeleteClick}></div>
			</div>

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

			{modalVOpen && (
				<div className='blackout'>
					<div
						className='modal'
						style={{ height: '140px', marginTop: '-280px' }}
					>
						<div className='modal-content'>
							<p>{modalText}</p>
							<div className='mbtns_container'>
								<button className='mbtn' onClick={handleLaterBtnClick}>
									Позже
								</button>
								<button className='mbtn' onClick={() => navigate(modalLink)}>
									{modalButton}
								</button>
							</div>
						</div>
					</div>
				</div>
			)}

			{modalDraftOpen && (
				<div className='blackout'>
					<div
						className='modal'
						style={{ height: '120px', marginTop: '-240px' }}
					>
						<div className='modal-content'>
							<p>Сохранить изменения?</p>
							<div className='mbtns_container'>
								<button className='mbtn' onClick={() => window.history.back()}>
									Нет
								</button>
								<button className='mbtn' onClick={handlePublish}>
									Да
								</button>
							</div>
						</div>
					</div>
				</div>
			)}

			{isModalOpen && (
				<div className='blackout'>
					<div className='modal'>
						<div className='modal-content'>
							<p>Уверены что хотите удалить публикацию?</p>
							<p
								style={{
									color: '#aaaaaa',
									fontSize: '14px',
									fontWeight: '400',
									lineHeight: '18.2px',
									marginTop: '16px',
								}}
							>
								Восстановить публикацию будет невозможно
							</p>
							<div className='mbtns_container'>
								<button className='mbtn' onClick={handleCancelDelete}>
									Нет
								</button>
								<button className='mbtn' onClick={handleConfirmDelete}>
									Да
								</button>
							</div>
						</div>
					</div>
				</div>
			)}

			<div
				className='prev'
				style={{
					backgroundImage: setImagePath(imageSrc),
					marginTop: '-56px',
				}}
			>
				<p>{formData.Name}</p>
			</div>

			<div className='getContact_container'>
				<span>СУММА К ПОЛУЧЕНИЮ (RUB)*</span>
				<input
					className='field'
					style={{ border: 'none', outline: 'none' }}
					type='number'
					placeholder='0'
					name='Price'
					value={formData.Price || ''}
					onChange={handleChange}
				/>

				<span>УНИВЕРСИТЕТ*</span>

				<div className='select_col'>
					<div className='select'>
						{formData.Univ ? (
							<div
								className='selected_row'
								onClick={() => handleRemoveOptionUniv(formData.Univ)}
							>
								{' '}
								{formData.Univ}{' '}
							</div>
						) : (
							<></>
						)}

						<input
							className='select_input'
							placeholder='Начните вводить название университета'
							onChange={handleUniChange}
							onFocus={() => {
								setBoxIsVisibleUniv(true)
								setBoxIsVisibleSubject(false)
							}}
							value={inputValueUniv}
						/>
					</div>
				</div>

				{boxIsVisibleUniv ? <div className='vars_box'>{varsUniv}</div> : <></>}

				<span>ПРЕДМЕТ*</span>

				<div className='select_col'>
					<div className='select'>
						{formData.Subject ? (
							<div
								className='selected_row'
								key={formData.Subject}
								onClick={() => handleRemoveOptionSubject(formData.Subject)}
							>
								{formData.Subject}
							</div>
						) : (
							<></>
						)}

						<input
							className='select_input'
							placeholder='Начните вводить название'
							onChange={handleSelectChangeSubject}
							onFocus={() => {
								setBoxIsVisibleSubject(true)
								setBoxIsVisibleUniv(false)
							}}
							value={inputValueSubject}
						/>
					</div>
				</div>
				{boxIsVisibleSubject ? (
					<div className='vars_box'>{varsSubject}</div>
				) : (
					<></>
				)}

				<span>ОПИСАНИЕ*</span>
				<div className='fieldt' style={{ minHeight: '48px' }}>
					<textarea
						placeholder={`Описание`}
						name={`Desc`}
						value={formData.Desc}
						onChange={handleChange}
					/>
				</div>

				<span>СОДЕРЖАНИЕ</span>
				{Array.isArray(formData.topics) &&
					formData.topics.length > 0 &&
					formData.topics.map((topic, index) => (
						<div key={index} className='column' style={{ width: '100%' }}>
							<div className='field'>
								<input
									type='text'
									placeholder={`Тема ${index + 1}`}
									name={`topic_${index}`}
									value={topic.topic}
									onChange={e => handleTopicChange(index, e)}
								/>
								<img
									src={krest}
									alt=''
									style={{ position: 'absolute', right: '16px' }}
									onClick={() => handleRemoveTopic(index)}
								/>
							</div>
							<div className='fieldt' style={{ minHeight: '48px' }}>
								<textarea
									placeholder={`Описание темы ${index + 1}`}
									name={`desc_${index}`}
									value={topic.desc}
									onChange={e => handleTopicChange(index, e)}
								/>
							</div>
						</div>
					))}
			</div>
			<div className='column' style={{ marginBottom: '200px' }}>
				<div className='field' onClick={addEl}>
					<p>Добавить тему</p>
					<img
						src={plus}
						alt=''
						style={{ position: 'absolute', right: '16px' }}
					/>
				</div>
			</div>
			{formData.is_draft ? (
				<MainButton text='ОПУБЛИКОВАТЬ' onClick={handlePublishDraft} />
			) : (
				<MainButton text='ОПУБЛИКОВАТЬ' onClick={handlePublish} />
			)}
		</>
	)
}

export default EditCourse
