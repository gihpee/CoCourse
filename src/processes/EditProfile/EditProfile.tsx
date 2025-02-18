import { FC } from 'react'
import MainButton from 'src/shared/components/MainButton/MainButton'
// import VerificationInput from 'src/shared/components/VerificationInput/VerificationInput'
import InputWithVariants from './ui/InputWithVariants/InputWithVariants'
import LinksFAQ from './ui/LinksFAQ/LinksFAQ'

const EditProfile: FC = () => {
	return (
		<div>
			<div>
				<h2>Детали профиля</h2>

				<div></div>

				<p></p>
			</div>

			<div>
				<div>
					<h3>Университет</h3>
					<InputWithVariants text='Выбери университет' />
				</div>
				<div>
					<h3>Предмет</h3>
					<InputWithVariants text='Выбери предмет' />
				</div>
				<div>
					<h3>Описание</h3>
					{/* <VerificationInput placeholder='Расскажи о себе' /> */}
				</div>
				<div>
					<h3>Курсы</h3>
					<LinksFAQ
						isSubmit={true}
						path=''
						text='Получай уведомления о новых курсах наших преподавателей'
					/>
				</div>
				<div>
					<h3>Обратная связь</h3>
					<LinksFAQ isSubmit={false} path='' text='Сообщить о баге' />
					<LinksFAQ isSubmit={false} path='' text='Предложить идею' />
				</div>
				<div>
					<h3>О проекте</h3>
					<LinksFAQ isSubmit={false} path='' text='Ответы на вопросы' />
					<LinksFAQ isSubmit={false} path='' text='Наш телеграм канал' />
				</div>
				<div>
					<h3>О приложении</h3>
					<LinksFAQ isSubmit={false} path='' text='Правовая информация' />
				</div>
			</div>

			<MainButton text='Сохранить' onClickEvent={() => console.log(1)} />
		</div>
	)
}

export default EditProfile
