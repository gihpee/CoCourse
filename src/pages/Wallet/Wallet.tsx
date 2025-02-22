import { FC } from 'react'
import { WalletWidget } from 'src/widgets/WalletWidget/WalletWidget'

const Wallet: FC = () => {
	window.scrollTo(0, 0)

	var BackButton = window.Telegram.WebApp.BackButton
	BackButton.show()
	BackButton.onClick(function () {
		BackButton.hide()
	})
	window.Telegram.WebApp.onEvent('backButtonClicked', function () {
		window.history.back()
	})

	return <WalletWidget />
}

export default Wallet
