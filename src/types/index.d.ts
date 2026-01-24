declare module '*.png'
declare module '*.jpg'

declare module '@react-native-menu/menu' {
	import { ReactNode } from 'react'

	export type MenuAction = {
		id: string
		title: string
		image?: string
	}

	export type MenuViewProps = {
		onPressAction?: (event: { nativeEvent: { event: string } }) => void
		actions: MenuAction[]
		children?: ReactNode
	}

	export const MenuView: React.FC<MenuViewProps>
}
