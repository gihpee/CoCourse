import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchBio } from '../../entities/user/model/fetchBio'
import fetchUpdateBio from '../../entities/user/model/fetchUpdateBio'
import handleBioChange from '../../features/bio-change/handleBioChange'
import './Edit.css'

function Bio() {
	const { id } = useParams()
	const [bioValue, setBioValue] = useState('')
	const navigate = useNavigate()

	useEffect(() => {
		if (id) {
			const fetchData = async () => {
				try {
					const description = await fetchBio(id)
					setBioValue(description[0].description)
				} catch (error) {
					console.error('Ошибка при запросе к серверу:', error)
				}
			}
			fetchData()
		}
	}, [id])

	const handleBioChangeWrapper = (
		e: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		handleBioChange(e, setBioValue)
	}

	const handlePublishWrapper = () => {
		fetchUpdateBio(id, bioValue, navigate)
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
				<div className='bio_billet'>Биография</div>
			</div>
			<span>Биография</span>
			<textarea
				className='bio_text'
				placeholder='Расскажи о себе и своих достижениях...'
				name='bio_text'
				value={bioValue}
				onChange={handleBioChangeWrapper}
			></textarea>
			<div className='publish' style={{ marginTop: '25px' }}>
				<button className='sf_btn' onClick={handlePublishWrapper}>
					СОХРАНИТЬ
				</button>
			</div>
		</div>
	)
}

export default Bio
