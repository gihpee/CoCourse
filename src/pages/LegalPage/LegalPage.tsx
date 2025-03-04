import { FC } from 'react'
import { Link } from 'react-router-dom'
import styles from './LegalPage.module.css'
import LegalCard from './ui/LegalCard/LegalCard'

const LegalPage: FC = () => {
	var BackButton = window.Telegram.WebApp.BackButton
	BackButton.show()
	BackButton.onClick(function () {
		BackButton.hide()
	})
	window.Telegram.WebApp.onEvent('backButtonClicked', function () {
		window.history.back()
		// navigate(`/course/${id}`)
	})

	return (
		<div className={styles['legal-page']}>
			<h1 className={styles['legal-page__title']}>Правовая информация</h1>

			<div className={styles['legal-page__list']}>
				<Link
					to='https://disk.yandex.ru/i/h6bWlwR6L5B8fg'
					target='_blank'
					onClick={event => {
						event.preventDefault()
						window.open('https://disk.yandex.ru/i/h6bWlwR6L5B8fg')
					}}
				>
					<LegalCard text='Правила пользования' />
				</Link>

				<Link
					to='https://disk.yandex.ru/i/Il8aGfCCgzVbnw'
					target='_blank'
					onClick={event => {
						event.preventDefault()
						window.open('https://disk.yandex.ru/i/Il8aGfCCgzVbnw')
					}}
				>
					<LegalCard text='Политика конфиденциальности' />
				</Link>

				<Link
					to='https://disk.yandex.ru/i/kupfGfO2ADm48g'
					target='_blank'
					onClick={event => {
						event.preventDefault()
						window.open('https://disk.yandex.ru/i/kupfGfO2ADm48g')
					}}
				>
					<LegalCard text='Согласие на обработку персональных данных' />{' '}
				</Link>

				<Link
					to='https://disk.yandex.ru/i/0HfHDg05yeroqQ'
					target='_blank'
					onClick={event => {
						event.preventDefault()
						window.open('https://disk.yandex.ru/i/0HfHDg05yeroqQ')
					}}
				>
					<LegalCard text='Согласие на передачу персональных данных в банк' />
				</Link>
			</div>
		</div>
	)
}

export default LegalPage
