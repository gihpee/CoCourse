import MainButton from '@twa-dev/mainbutton'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { fetchUpdateUser } from '../../entities/user/model/fetchUpdateUser'
import handleBioChangeMinus from '../../features/bio-change/handleBioChangeMinus'
import { filterOptions } from '../../features/filterOptions'
import plus from '../../shared/assets/course/plus.svg'
import lminus from '../../shared/assets/create-course/lminus.png'
import toggle from '../../shared/assets/profile/toggle.svg'
import { BASE_URL } from '../../shared/config/api'
import { optionsSubject } from '../optionsSubject'
import { optionsUniv } from '../optionsUniv'

function Registration() {
	const navigate = useNavigate()

	const location = useLocation()
	const { data } = location.state || {}

	const [imageSrc, setImageSrc] = useState(data.photo_url)
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

	// const userFriendlyAddress = useTonAddress()

	// useAutoResizeTextArea(bioValue)

	useEffect(() => {
		if (data && data.photo_url) {
			setImageSrc(data.photo_url)
			setFirstName(data.first_name)
			setLastName(data.last_name)
		}
	}, [data])

	const handleNotify = () => {
		setIsNotify(!isNotify)
	}

	const handleSelectChangeSubject = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

	const handleRemoveOptionUniv = (optionToRemove: string) => {
		setUniValue('')
	}

	const filteredOptionsUniv = filterOptions(optionsUniv, inputValueUniv)

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

	const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		handleBioChangeMinus(e, setBioValue)
	}

	const handleSave = async () => {
		await fetchUpdateUser(
			isNotify,
			selectedOptions,
			uniValue,
			bioValue,
			window.Telegram.WebApp.initData
		)

		navigate(`/verification`)

		// if (userFriendlyAddress) {
		// 	navigate(`/verification`)
		// } else {
		// 	navigate(`/connect-wallet`)
		// }
	}

	return (
		<>
			<div
				className='prev'
				style={{
					backgroundImage: `url(https://${BASE_URL}.ru${imageSrc})`,
					marginTop: '-56px',
				}}
			>
				<p style={{ marginTop: '312px' }}>{firstName + ' ' + lastName}</p>
			</div>
			<div className='getContact_container'>
				<span>УНИВЕРСИТЕТ</span>
				<div className='select_col'>
					<div className='select'>
						{uniValue ? (
							<div
								className='selected_row'
								onClick={() => handleRemoveOptionUniv(uniValue)}
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

				<span>ПРЕДМЕТЫ</span>
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

				<span>ОПИСАНИЕ</span>
				<div className='fieldt' style={{ minHeight: '48px' }}>
					<textarea
						placeholder={`Описание`}
						name={`Desc`}
						value={bioValue}
						onChange={handleBioChange}
					/>
				</div>

				<span>ОСНОВНЫЕ</span>
				<div className='field'>
					<p>Уведомления</p>
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

				<span>НАЖИМАЯ "ПРОДОЛЖИТЬ" ВЫ СОГЛАШАЕТЕСЬ:</span>
				<Link
					to='https://disk.yandex.ru/i/h6bWlwR6L5B8fg'
					target='_blank'
					className='field'
					onClick={event => {
						event.preventDefault()
						window.open('https://disk.yandex.ru/i/h6bWlwR6L5B8fg')
					}}
				>
					<p>Правила пользования</p>
					<img
						src={toggle}
						alt=''
						style={{ position: 'absolute', right: '16px' }}
					/>
				</Link>
				<Link
					to='https://disk.yandex.ru/i/Il8aGfCCgzVbnw'
					target='_blank'
					className='field'
					onClick={event => {
						event.preventDefault()
						window.open('https://disk.yandex.ru/i/Il8aGfCCgzVbnw')
					}}
				>
					<p>Политика конфиденциальности</p>
					<img
						src={toggle}
						alt=''
						style={{ position: 'absolute', right: '16px' }}
					/>
				</Link>
				<Link
					to='https://disk.yandex.ru/i/kupfGfO2ADm48g'
					target='_blank'
					className='field'
					onClick={event => {
						event.preventDefault()
						window.open('https://disk.yandex.ru/i/kupfGfO2ADm48g')
					}}
				>
					<p>Согласие на обработку персональных данных</p>
					<img
						src={toggle}
						alt=''
						style={{ position: 'absolute', right: '16px' }}
					/>
				</Link>
				<a href='https://disk.yandex.ru/i/0HfHDg05yeroqQ' className='field'>
					<p>Согласие на передачу персональных данных в банк</p>
					<img
						src={toggle}
						alt=''
						style={{ position: 'absolute', right: '16px' }}
					/>
				</a>

				<MainButton text='ПРОДОЛЖИТЬ' onClick={() => handleSave()} />
			</div>
		</>
	)
}

export default Registration
