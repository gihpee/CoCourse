import { motion } from 'framer-motion'
import { FC, ReactNode, useEffect } from 'react'
import styles from './BottomSheet.module.css'

interface BottomSheetProps {
	isOpen: boolean
	onClose: () => void
	children: ReactNode
}

const BottomSheet: FC<BottomSheetProps> = ({ isOpen, onClose, children }) => {
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose()
			}
		}

		if (isOpen) {
			document.addEventListener('keydown', handleKeyDown)
		} else {
			document.removeEventListener('keydown', handleKeyDown)
		}

		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [isOpen, onClose])

	if (!isOpen) return null

	return (
		<div className={styles['bottom-sheet']}>
			<div className={styles['bottom-sheet__overlay']} onClick={onClose}></div>

			<motion.div
				className={styles['bottom-sheet__content']}
				initial={{ y: '100%' }}
				animate={{ y: 0 }}
				exit={{ y: '100%' }}
				transition={{ type: 'spring', stiffness: 100, damping: 15 }}
			>
				<button className={styles['bottom-sheet__close']} onClick={onClose}>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='28'
						height='28'
						viewBox='0 0 28 28'
						fill='none'
						className={styles['bottom-sheet__close-svg']}
					>
						<g clip-path='url(#clip0_3670_19612)'>
							<path
								d='M14 28C21.6589 28 28 21.6451 28 14C28 6.34117 21.6451 0 13.9863 0C6.34117 0 0 6.34117 0 14C0 21.6451 6.35489 28 14 28Z'
								fill='black'
								fill-opacity='0.05'
							/>
							<path
								opacity='0.5'
								d='M9.17282 20C8.51489 20 8 19.4702 8 18.8115C8 18.4964 8.11441 18.1957 8.34326 17.9808L12.3051 14L8.34326 10.0334C8.11441 9.8043 8 9.51789 8 9.20286C8 8.52982 8.51489 8.02864 9.17282 8.02864C9.50178 8.02864 9.75923 8.14319 9.98807 8.35799L13.9785 12.3389L17.9976 8.34367C18.2407 8.10024 18.4982 8 18.8128 8C19.4707 8 20 8.51551 20 9.17422C20 9.50358 19.8998 9.76133 19.6423 10.0191L15.6663 14L19.6281 17.9666C19.8713 18.1814 19.9856 18.482 19.9856 18.8115C19.9856 19.4702 19.4565 20 18.7842 20C18.4553 20 18.1549 19.8855 17.9403 19.6563L13.9785 15.6754L10.031 19.6563C9.80214 19.8855 9.50178 20 9.17282 20Z'
								fill='#333333'
							/>
						</g>
						<defs>
							<clipPath id='clip0_3670_19612'>
								<rect width='28' height='28' fill='white' />
							</clipPath>
						</defs>
					</svg>
				</button>
				{children}
			</motion.div>
		</div>
	)
}

export default BottomSheet
