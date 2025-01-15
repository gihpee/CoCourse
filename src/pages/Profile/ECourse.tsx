import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import handlePublish from '../../entities/course/model/fetchUpdateCourse'
import { fetchBio } from '../../entities/user/model/fetchBio'
import './Edit.css'

function ECourse() {
	const { id } = useParams()
	const [cValue, setCValue] = useState('')
	const navigate = useNavigate()

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (id) {
					const bioData = await fetchBio(id)
					setCValue(bioData[0].course)
				}
			} catch (error) {
				console.error('Ошибка при запросе к серверу:', error)
			}
		}

		fetchData()
	}, [id])

	const handleCChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { value } = e.target
		setCValue(value)
	}

	const handlePublishClick = () => {
		if (id) {
			handlePublish(id, cValue, navigate)
		}
	}

	return (
		<div className='column'>
			<div className='feedback_top'>
				<div
					className='fback_btn'
					onClick={() => {
						window.history.back()
					}}
				></div>
				<div className='ccourse_billet'>Курс</div>
			</div>
			<span>Выберите Курс:</span>
			<select
				className='billet_course'
				name='Course'
				value={cValue}
				onChange={handleCChange}
			>
				<option>1 курс, 1 семестр</option>
				<option>1 курс, 2 семестр</option>
				<option>2 курс, 1 семестр</option>
				<option>2 курс, 2 семестр</option>
				<option>3 курс, 1 семестр</option>
				<option>3 курс, 2 семестр</option>
				<option>4 курс, 1 семестр</option>
				<option>4 курс, 2 семестр</option>
				<option>5 курс, 1 семестр</option>
				<option>5 курс, 2 семестр</option>
				<option>6 курс, 1 семестр</option>
			</select>
			<div className='publish' style={{ marginTop: '25px' }}>
				<button className='sf_btn' onClick={handlePublishClick}>
					СОХРАНИТЬ
				</button>
			</div>
		</div>
	)
}

export default ECourse
