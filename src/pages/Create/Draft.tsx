import lminus from '../../shared/assets/create-course/lminus.png'

function Draft() {
	return (
		<div className='select_col'>
			<div className='select_subject'>
				<div className='selected_row'>
					пункт 1<img src={lminus} alt='' />
				</div>
				<input
					className='select_input'
					placeholder='Начните вводить название'
				/>
			</div>
		</div>
	)
}

export default Draft
