import { useEffect, useRef, useState } from 'react'
import TrackPlayer, { RepeatMode } from 'react-native-track-player'

const setupPlayer = async () => {
	await TrackPlayer.setupPlayer({
		maxCacheSize: 1024 * 10,
	})

	await TrackPlayer.setVolume(0.5)
	await TrackPlayer.setRepeatMode(RepeatMode.Queue)
}

export const useSetupTrackPlayer = ({ onLoad }: { onLoad?: () => void }) => {
	const isInitializedRef = useRef(false)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		// 避免重复初始化
		if (isInitializedRef.current) return

		setupPlayer().then(() => {
			isInitializedRef.current = true
			setIsLoading(false)
			onLoad?.()
		}).catch((error) => {
			isInitializedRef.current = false
			setIsLoading(false)
			console.error('Error setting up Track Player:', error)
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []) // 只在首次挂载时执行

	return { isLoading }
}
