/* eslint-disable react-hooks/set-state-in-effect */
import { useCallback, useEffect, useState } from 'react'
import TrackPlayer from 'react-native-track-player'

export const useTrackPlayerVolume = () => {
	const [volume, setVolume] = useState<number | undefined>(undefined)

	const updateVolume = useCallback(async (newVolume: number) => {
		if (newVolume < 0 || newVolume > 1) return

		setVolume(newVolume)

		await TrackPlayer.setVolume(newVolume)
	}, [])

	useEffect(() => {
		// 只在组件挂载时获取一次音量
		TrackPlayer.getVolume().then(setVolume)
	}, [])

	return { volume, updateVolume }
}
