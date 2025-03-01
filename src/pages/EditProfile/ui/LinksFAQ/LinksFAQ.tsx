import { FC } from 'react'
import LinkArrow from '../../../../shared/assets/wallet/LinkArrow.svg'
import styles from './LinksFAQ.module.css'

interface ILinksFAQ {
	path: string
	text: string
	isSubmit: boolean
	isNotify: boolean
	isNotifyFAQ?: any
}

const LinksFAQ: FC<ILinksFAQ> = ({
	path,
	text,
	isSubmit,
	isNotify,
	isNotifyFAQ,
}) => {
	console.log('isNotifyFAQ', isNotifyFAQ)

	return (
		<div className={styles['linksFAQ']}>
			<div className={styles['linksFAQ__content']}>
				<div className={styles['linksFAQ__image-wrapper']}>
					<img
						src={path}
						alt='Ссылка на документацию'
						className={styles['linksFAQ__image']}
					/>
				</div>
				<h3 className={styles['linksFAQ__text']}>{text}</h3>
			</div>
			{isSubmit ? (
				<img
					className={styles['linksFAQ__arrow']}
					src={LinkArrow}
					alt='Ссылка на документацию'
				/>
			) : (
				<div className={styles['linksFAQ__toggle']}>
					<input
						className={styles['linksFAQ__checkbox']}
						type='checkbox'
						checked={isNotify}
						onChange={isNotifyFAQ}
					/>
					<label className={styles['linksFAQ__label']} htmlFor='toggle'></label>
				</div>
			)}
		</div>
	)
}

export default LinksFAQ
