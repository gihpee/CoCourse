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
					×
				</button>
				{children}
			</motion.div>
		</div>
	)
}

export default BottomSheet
