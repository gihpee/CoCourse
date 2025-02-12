import { useEffect, useState } from 'react'

const useTheme = () => {
	const getInitialTheme = (): string => {
		return window.Telegram?.WebApp?.colorScheme || 'light'
	}

	const [theme, setTheme] = useState<string>(getInitialTheme)

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme)
	}, [theme])

	useEffect(() => {
		const updateTheme = () => {
			setTheme(window.Telegram.WebApp.colorScheme)
		}

		window.Telegram.WebApp.onEvent('themeChanged', updateTheme)

		return () => {
			window.Telegram.WebApp.offEvent('themeChanged', updateTheme)
		}
	}, [])

	return { theme }
}

export default useTheme
