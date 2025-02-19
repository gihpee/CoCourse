import { FC } from 'react'
import { useUserProfile } from 'src/pages/UserProfile/model/useUserProfile'
import MainButton from 'src/shared/components/MainButton/MainButton'
import VerificationInput from 'src/shared/components/VerificationInput/VerificationInput'
import Bell from '../../shared/assets/profile/Bell.svg'
import Bulb from '../../shared/assets/profile/Bulb.svg'
import Error from '../../shared/assets/profile/Error.svg'
import Faq from '../../shared/assets/profile/Faq.svg'
import Naming from '../../shared/assets/profile/Naming.svg'
import Warning from '../../shared/assets/profile/Warning.svg'
import styles from './EditProfile.module.css'
import InputWithVariants from './ui/InputWithVariants/InputWithVariants'
import LinksFAQ from './ui/LinksFAQ/LinksFAQ'

const EditProfile: FC = () => {
	const { userData } = useUserProfile()

	return (
		<div className={styles['edit-profile']}>
			<div className={styles['edit-profile__details']}>
				<h2 className={styles['edit-profile__title']}>Детали профиля</h2>

				<div
					className={styles['edit-profile__avatar']}
					style={{
						backgroundImage: `url(https://comncoursetest.ru${userData?.photo_url})`,
					}}
				/>

				<p className={styles['edit-profile__name']}>
					{userData?.first_name} {userData?.last_name}
				</p>
			</div>

			<div className={styles['edit-profile__sections']}>
				<div className={styles['edit-profile__section']}>
					<h3 className={styles['edit-profile__subtitle']}>Университет</h3>
					<InputWithVariants text='Выбери университет' />
				</div>

				<div className={styles['edit-profile__section']}>
					<h3 className={styles['edit-profile__subtitle']}>Предмет</h3>
					<InputWithVariants text='Выбери предмет' />
				</div>

				<div className={styles['edit-profile__section']}>
					<h3 className={styles['edit-profile__subtitle']}>Описание</h3>
					<VerificationInput
						placeholder='Расскажи о себе'
						inputFunction={() => console.log(2)}
						inputName='about'
						inputValue=''
					/>
				</div>

				<div className={styles['edit-profile__section']}>
					<h3 className={styles['edit-profile__subtitle']}>Курсы</h3>
					<LinksFAQ
						isSubmit={false}
						path={Bell}
						text='Получай уведомления о новых курсах наших преподавателей'
					/>
				</div>

				<div className={styles['edit-profile__section']}>
					<h3 className={styles['edit-profile__subtitle']}>Обратная связь</h3>
					<LinksFAQ isSubmit={true} path={Error} text='Сообщить о баге' />
					<LinksFAQ isSubmit={true} path={Bulb} text='Предложить идею' />
				</div>

				<div className={styles['edit-profile__section']}>
					<h3 className={styles['edit-profile__subtitle']}>О проекте</h3>
					<LinksFAQ isSubmit={true} path={Faq} text='Ответы на вопросы' />
					<LinksFAQ isSubmit={true} path={Naming} text='Наш телеграм канал' />
				</div>

				<div className={styles['edit-profile__section']}>
					<h3 className={styles['edit-profile__subtitle']}>О приложении</h3>
					<LinksFAQ
						isSubmit={false}
						path={Warning}
						text='Правовая информация'
					/>
				</div>
			</div>

			<MainButton text='Сохранить' onClickEvent={() => console.log(1)} />
		</div>
	)
}

export default EditProfile
