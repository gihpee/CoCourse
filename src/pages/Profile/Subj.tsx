import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { options } from '../../entities/user/model/constants/specialization'
import { fetchBio } from '../../entities/user/model/fetchBio'
import fetchUpdateSubjects from '../../entities/user/model/fetchUpdateSubjects'
import { filterOptions } from '../../features/filterOptions'
import hash from '../../shared/assets/profile/hash.svg'
import './Edit.css'

function Subj() {
	const { id } = useParams()
	const navigate = useNavigate()
	const [selectedOptions, setSelectedOptions] = useState<string[]>([])
	const [boxIsVisible, setBoxIsVisible] = useState(false)
	const [inputValue, setInputValue] = useState('')

	useEffect(() => {
		if (id) {
			const fetchData = async () => {
				try {
					const data = await fetchBio(id)

					if (data[0]?.subjects) {
						setSelectedOptions(data[0].subjects)
					}
				} catch (error) {
					console.error('Ошибка при запросе к серверу:', error)
				}
			}

			fetchData()
		}
	}, [id])

	const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value
		setInputValue(value)
		setBoxIsVisible(true)
	}

	const handleOptionClick = (option: string) => {
		if (!selectedOptions.includes(option)) {
			setSelectedOptions([...selectedOptions, option])
		}
		setInputValue('')
		setBoxIsVisible(false)
	}

	const handleRemoveOption = (optionToRemove: string) => {
		const updatedOptions = selectedOptions.filter(
			option => option !== optionToRemove
		)
		setSelectedOptions(updatedOptions)
	}

	const handlePublish = () => {
		fetchUpdateSubjects(id, selectedOptions, navigate)
	}

	const filteredOptionsSubject = filterOptions(options, inputValue)

	const vars = filteredOptionsSubject.map((item, index) => (
		<div
			className='billet_add'
			key={index}
			onClick={() => handleOptionClick(item)}
		>
			<img src={hash} alt='' />
			<p>{item}</p>
		</div>
	))

	return (
		<div className='column'>
			<div className='feedback_top'>
				<div className='fback_btn' onClick={() => window.history.back()}></div>
				<div className='subj_billet'>Предмет</div>
			</div>
			{selectedOptions.length > 0 ? (
				selectedOptions.map(option => (
					<div
						className='billet_del'
						key={option}
						onClick={() => handleRemoveOption(option)}
					>
						<img src={hash} alt='' />
						<p>{option}</p>
					</div>
				))
			) : (
				<></>
			)}

			<span>выберите Предмет:</span>
			<input
				className='billet_subject'
				onChange={handleSelectChange}
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

export default Subj
