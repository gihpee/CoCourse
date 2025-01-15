import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { options } from '../../entities/user/model/constants/places'
import { fetchBio } from '../../entities/user/model/fetchBio'
import fetchUpdateUniversity from '../../entities/user/model/fetchUpdateUniversity'
import { filterOptions } from '../../features/filterOptions'
import nb from '../../shared/assets/profile/nb.svg'
import './Edit.css'

function Univ() {
	const { id } = useParams()
	const [uniValue, setUniValue] = useState('')
	const navigate = useNavigate()
	const [boxIsVisible, setBoxIsVisible] = useState(false)
	const [inputValue, setInputValue] = useState('')

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (id) {
					const uniData = await fetchBio(id)
					setUniValue(uniData[0].university)
				}
			} catch (error) {
				console.error('Ошибка при запросе к серверу:', error)
			}
		}

		fetchData()
	}, [id])

	const handleUniChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value
		setInputValue(value)
		setBoxIsVisible(true)
	}

	const handleOptionClick = (option: string) => {
		if (uniValue !== option) {
			setUniValue(option)
		}
		setInputValue('')
		setBoxIsVisible(false)
	}

	const handleRemoveOption = (optionToRemove: string) => {
		setUniValue('')
	}

	const handlePublish = () => {
		fetchUpdateUniversity(id, uniValue, navigate)
	}

	const filteredOptionsSubject = filterOptions(options, inputValue)

	const vars = filteredOptionsSubject.map((item, index) => (
		<div
			className='billet_add'
			key={index}
			onClick={() => handleOptionClick(item)}
		>
			<img src={nb} alt='' />
			<p>{item}</p>
		</div>
	))

	return (
		<div className='column'>
			<div className='feedback_top'>
				<div
					className='fback_btn'
					onClick={() => {
						window.history.back()
					}}
				></div>
				<div className='univ_billet'>Университет</div>
			</div>
			{uniValue.length > 0 ? (
				<div
					className='billet_del'
					onClick={() => handleRemoveOption(uniValue)}
				>
					<img src={nb} alt='' />
					<p>{uniValue}</p>
				</div>
			) : (
				<></>
			)}

			<span>выберите университет:</span>
			<input
				className='billet_univ'
				onChange={handleUniChange}
				onFocus={() => setBoxIsVisible(true)}
				value={inputValue}
				style={{ width: '80%' }}
			/>
			{boxIsVisible ? <div className='vars_box'>{vars}</div> : <></>}

			<div className='publish' style={{ marginTop: '25px' }}>
				<button className='sf_btn' onClick={handlePublish}>
					СОХРАНИТЬ
				</button>
			</div>
		</div>
	)
}

export default Univ
