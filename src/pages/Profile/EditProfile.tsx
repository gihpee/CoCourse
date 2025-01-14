import bell from '@/assets/profile/bell.svg'
import { useUserCourses } from '@/entities/course/model/useUserCourses'
import { fetchUpdateUser } from '@/entities/user/model/fetchUpdateUser'
import handleBioChangeMinus from '@/features/bio-change/handleBioChangeMinus'
import { filterOptions } from '@/features/filterOptions'
import useAutoResizeTextArea from '@/features/useAutoResizeTextArea'
import plus from '@/shared/assets/course/plus.svg'
import lminus from '@/shared/assets/create-course/lminus.png'
import bulb from '@/shared/assets/profile/bulb.svg'
import chat from '@/shared/assets/profile/chat.svg'
import magic from '@/shared/assets/profile/magic.svg'
import sun from '@/shared/assets/profile/sun.svg'
import MainButton from '@twa-dev/mainbutton'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { optionsSubject } from '../optionsSubject'
import { optionsUniv } from '../optionsUniv'
import './EditProfile.css'

function EditProfile() {
	const { id } = useParams()

	const [imageSrc, setImageSrc] = useState('')
	const [isNotify, setIsNotify] = useState(true)
	const [bioValue, setBioValue] = useState('')
	const [uniValue, setUniValue] = useState('')
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [selectedOptions, setSelectedOptions] = useState<string[]>([])
	const [boxIsVisibleSubject, setBoxIsVisibleSubject] = useState(false)
	const [inputValueSubject, setInputValueSubject] = useState('')
	const [boxIsVisibleUniv, setBoxIsVisibleUniv] = useState(false)
	const [inputValueUniv, setInputValueUniv] = useState('')

	const navigate = useNavigate()

	//TODO: возможно вынести
	useEffect(() => {
		const fetchData = async () => {
			const userData = await useUserCourses(window.Telegram.WebApp.initData)
			if (userData && userData[0]) {
				try {
					setImageSrc(userData[0].photo_url || '')
					setIsNotify(userData[0].notify || false)
					setBioValue(userData[0].description || '')
					setUniValue(userData[0].university || '')
					setSelectedOptions(userData[0].subjects || '')
					setFirstName(userData[0].first_name || '')
					setLastName(userData[0].last_name || '')
				} catch (error) {
					console.error('Ошибка при запросе к серверу:', error)
				}
			} else {
				console.log('No user data found.')
			}
			const textarea = document.querySelector(
				'.bio_textarea'
			) as HTMLTextAreaElement
			if (textarea && textarea.scrollHeight > 40) {
				textarea.style.height = 'auto'
				textarea.style.height = textarea.scrollHeight + 'px'
			}
		}

		fetchData()
	}, [id])

	useAutoResizeTextArea(bioValue)

	const handleNotify = () => {
		setIsNotify(!isNotify)
	}

	const handleSave = async () => {
		await fetchUpdateUser(
			isNotify,
			selectedOptions,
			uniValue,
			bioValue,
			window.Telegram.WebApp.initData
		)

		navigate(`/profile`)
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

	const handleRemoveOptionSubject = (optionToRemove: string) => {
		const updatedOptions = selectedOptions.filter(
			option => option !== optionToRemove
		)
		setSelectedOptions(updatedOptions)
	}

	const filteredOptionsSubject = filterOptions(
		optionsSubject,
		inputValueSubject
	)

	const varsSubject = filteredOptionsSubject.map(
		(item: string, index: number) => (
			<div
				className='field'
				key={index}
				onClick={() => handleOptionClickSubject(item)}
			>
				<p>{item}</p>
				<img src={plus} alt='' />
			</div>
		)
	)

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

	const filteredOptionsUniv = filterOptions(optionsUniv, inputValueUniv)

	const varsUniv = filteredOptionsUniv.map((item: string, index: number) => (
		<div
			className='field'
			key={index}
			onClick={() => handleOptionClickUniv(item)}
		>
			<p>{item}</p>
			<img src={plus} alt='' />
		</div>
	))

	const handleBioChangeWrapper = (
		e: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		handleBioChangeMinus(e, setBioValue)
	}

	return (
		<>
			<div
				className='back_btn'
				onClick={() => {
					window.history.back()
				}}
			></div>
			<div
				className='prev'
				style={{
					backgroundImage: `url(https://comncourse.ru${imageSrc}})`,
					marginTop: '-56px',
				}}
			>
				<p style={{ marginTop: '312px' }}>{firstName + ' ' + lastName}</p>
			</div>
			<div className='getContact_container'>
				<span>БИОГРАФИЯ</span>
				<div className='fieldt' style={{ minHeight: '48px' }}>
					<textarea
						placeholder={`Описание`}
						name={`Desc`}
						value={bioValue}
						onChange={handleBioChangeWrapper}
					/>
				</div>
				<span>УНИВЕРСИТЕТ</span>

				<div className='select_col'>
					<div className='select'>
						{uniValue ? (
							<div
								className='selected_row'
								onClick={() => handleRemoveOptionUniv()}
							>
								{' '}
								{uniValue}{' '}
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

				<span>ПРЕДМЕТЫ, КОТОРЫЕ ВЫ ИЗУЧАЕТЕ</span>

				<div className='select_col'>
					<div className='select'>
						{selectedOptions ? (
							selectedOptions.map(option => (
								<div
									className='selected_row'
									key={option}
									onClick={() => handleRemoveOptionSubject(option)}
								>
									{option}
									<img src={lminus} alt='' />
								</div>
							))
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

				<span>Оповещения о новых курсах</span>
				<div className='billet' style={{ paddingRight: '8px' }}>
					<img src={bell} alt='' />
					<p style={{ textAlign: 'left', marginLeft: '12px' }}>Уведомления</p>
					<div className='toggle-switch'>
						<input
							type='checkbox'
							id='toggle'
							checked={isNotify}
							onChange={handleNotify}
						/>
						<label htmlFor='toggle'></label>
					</div>
				</div>
				<span>Обратная связь</span>
				<Link
					to='https://forms.gle/x9KbBitA1AGDPmXY8'
					target='_blank'
					className='billet'
					onClick={event => {
						event.preventDefault()
						window.open('https://forms.gle/x9KbBitA1AGDPmXY8')
					}}
				>
					<img src={magic} alt='' />
					<p style={{ textAlign: 'left', marginLeft: '12px' }}>
						Сообщить о баге
					</p>
				</Link>
				<Link
					to='https://forms.gle/NtaWQe2wuiRpcY2L8'
					target='_blank'
					className='billet'
					onClick={event => {
						event.preventDefault()
						window.open('https://forms.gle/NtaWQe2wuiRpcY2L8')
					}}
				>
					<img src={chat} alt='' />
					<p style={{ textAlign: 'left', marginLeft: '12px' }}>
						Предложить идею
					</p>
				</Link>
				<span>О проекте</span>
				<Link
					to='https://t.me/HowToCommonCourse '
					target='_blank'
					className='billet'
					onClick={event => {
						event.preventDefault()
						window.open('https://t.me/HowToCommonCourse ')
					}}
				>
					<img src={bulb} alt='' />
					<p style={{ textAlign: 'left', marginLeft: '12px' }}>
						Common Course FAQ
					</p>
				</Link>
				<a href='https://t.me/Common_Course' className='billet'>
					<img src={sun} alt='' />
					<p style={{ textAlign: 'left', marginLeft: '12px' }}>Что нового?</p>
				</a>

				<MainButton text='СОХРАНИТЬ' onClick={() => handleSave()} />
			</div>
		</>
	)
}

export default EditProfile