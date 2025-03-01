import { useTonAddress } from '@tonconnect/ui-react'
import MainButton from '@twa-dev/mainbutton'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { fetchCreateCourse } from '../../entities/course/model/fetchCreateCourse'
import { deleteCourse } from '../../entities/course/model/fetchDeleteCourse'
import handleBioChangeMinus from '../../features/bio-change/handleBioChangeMinus'
import emptyHorizontalImage from '../../shared/assets/course/horizontalEmptyCourseImage.webp'
import plus from '../../shared/assets/course/plus.svg'
import krest from '../../shared/assets/create/ckrest.svg'
import { optionsSubject } from '../optionsSubject'
import { optionsUniv } from '../optionsUniv'
import './CreateCourse.css'

import { BASE_URL } from '../../shared/config/api'

function CreateCourse() {
	const location = useLocation()
	const data = location.state?.data || {}

	const navigate = useNavigate()

	const [formData, setFormData] = useState<{
		Name: string
		Univ: string
		Course: string
		Desc: string
		Price: number | null
		ChannelUrl: string
		Subject: string
		topics: { topic: string; desc: string }[]
	}>({
		Name: data?.channel?.name || '',
		Univ: '',
		Course: '1 курс, 1 семестр',
		Desc: '',
		Price: null,
		ChannelUrl: data?.channel?.url || '',
		Subject: '',
		topics: [],
	})

	const [modalFillOpen, setModalFillOpen] = useState(false)
	const [modalDraftOpen, setModalDraftOpen] = useState(false)
	// const userFriendlyAddress = useTonAddress()
	const [modalOpen, setModalOpen] = useState(false)
	const [modalText, setModalText] = useState('')
	const [modalLink, setModalLink] = useState('')
	const [modalButton, setModalButton] = useState('')

	const address = useTonAddress()

	const handleChange = (
		e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		const { name, value, type } = e.target

		if (type === 'textarea') {
			handleBioChangeMinus(
				e as React.ChangeEvent<HTMLTextAreaElement>,
				newValue => {
					setFormData(prevData => ({
						...prevData,
						[name]: newValue,
					}))
				}
			)
		} else {
			setFormData(prevData => ({
				...prevData,
				[name]: value,
			}))
		}
	}

	const addEl = () => {
		setFormData(prevData => ({
			...prevData,
			topics: [...prevData.topics, { topic: '', desc: '' }],
		}))
	}

	const handleRemoveTopic = (indexToRemove: number) => {
		setFormData(prevData => ({
			...prevData,
			topics: prevData.topics.filter(
				(_, index) => index !== Number(indexToRemove)
			),
		}))
	}

	const handleOkBtnClick = () => {
		setModalFillOpen(false)
	}

	const handleLaterBtnClick = () => {
		setModalOpen(false)
	}

	const handleTopicChange = (
		index: number,
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target

		// if (type === 'textarea') {
		// 	e.target.style.height = 'auto'
		// 	e.target.style.height = e.target.scrollHeight - 16 + 'px'
		// }

		setFormData(prevData => {
			const newTopics = [...prevData.topics]

			const [field] = name.split('_') as ['topic' | 'desc']

			newTopics[index][field] = value

			return {
				...prevData,
				topics: newTopics,
			}
		})
	}

	const handlePublish = async () => {
		// if (!userFriendlyAddress && data.user.verifyed !== 'Пройдена') {
		// 	setModalText(
		// 		'Для создания курса необходимо пройти верификацию и подключить выплаты'
		// 	)
		// 	setModalLink('/connect-wallet')
		// 	setModalButton('Пройти')
		// 	setModalOpen(true)
		// }
		// else if (!userFriendlyAddress) {
		// 	setModalText('Для создания курса необходимо подключить выплаты')
		// 	setModalLink('/connect-walletN')
		// 	setModalButton('Подключить')
		// 	setModalOpen(true)
		// }
		if (data.user.verifyed !== 'Пройдена') {
			setModalText('Для создания курса необходимо пройти верификацию')
			setModalLink('/verificationN')
			setModalButton('Пройти')
			setModalOpen(true)
		} else {
			if (
				formData.Name === '' ||
				formData.Univ === '' ||
				formData.Desc === '' ||
				formData.Subject === ''
			) {
				setModalFillOpen(true)
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
	}

	const handleSaveDraft = async () => {
		let university = formData.Univ
		let description = formData.Desc
		let subjects = formData.Subject
		let topics = formData.topics
		let price = formData.Price || 0
		let course_id = data.id
		let is_draft = true

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
	}

	const handleDelete = async () => {
		let cid = data.id

		try {
			await deleteCourse(cid)

			navigate('/connect-bot')
		} catch (error) {
			console.log('Failed to delete course', error)
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
			return `url(https://${BASE_URL}.ru${data.channel.photo})`
		}
	}

	return (
		<>
			<div className='back_btn' onClick={() => setModalDraftOpen(true)}></div>

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

			{modalDraftOpen && (
				<div className='blackout'>
					<div className='modal'>
						<div className='modal-content'>
							<p>Сохранить черновик?</p>
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
								<button className='mbtn' onClick={handleDelete}>
									Нет
								</button>
								<button className='mbtn' onClick={handleSaveDraft}>
									Да
								</button>
							</div>
						</div>
					</div>
				</div>
			)}

			{modalOpen && (
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

			<div
				className='prev'
				style={{
					backgroundImage: data?.channel?.photo
						? setImagePath(data.channel.photo)
						: 'none',
					marginTop: '-56px',
				}}
			>
				<p>{formData?.Name || 'Default Name'}</p>
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
						{formData.Univ.length > 0 ? (
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
						{formData.Subject.length > 0 ? (
							<div
								className='selected_row'
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
				{formData.topics.map((topic, index) => (
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
			<MainButton text='ОПУБЛИКОВАТЬ' onClick={handlePublish} />
		</>
	)
}

export default CreateCourse
