import { useNavigate } from 'react-router-dom'
import { API_BASE_URL } from '../../../shared/config/api'

export const useUpdatePaymentInfo = (
	formData: { number: string },
	setModalFillOpen: (isOpen: boolean) => void
) => {
	const navigate = useNavigate()

	const updatePaymentInfo = async () => {
		if (!formData.number) {
			setModalFillOpen(true)
			return
		}

		const number = formData.number

		await fetch(`${API_BASE_URL}/update-payment-info/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `tma ${window.Telegram.WebApp.initData}`,
			},
			body: JSON.stringify({ number }),
		})

		navigate('/profile')
	}

	return { updatePaymentInfo }
}
