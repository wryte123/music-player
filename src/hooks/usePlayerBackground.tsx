import { colors } from '@/constants/tokens'
import { useEffect, useState } from 'react'
import { getColors } from 'react-native-image-colors'
import { IOSImageColors } from 'react-native-image-colors/build/types'

export const usePlayerBackground = (imageUrl: string) => {
	const [imageColors, setImageColors] = useState<IOSImageColors | null>(null)

	useEffect(() => {
		let isMounted = true

		getColors(imageUrl, {
			fallback: colors.background,
			cache: true,
			key: imageUrl,
		}).then((colors) => {
			if (isMounted) {
				setImageColors(colors as IOSImageColors)
			}
		}).catch((error) => {
			console.warn('Error getting image colors:', error)
		})

		return () => {
			isMounted = false
		}
	}, [imageUrl])

	return { imageColors }
}
