import { useFavorites } from '@/store/library'
import { useCallback } from 'react'
import TrackPlayer, { useActiveTrack } from 'react-native-track-player'

export const useTrackPlayerFavorite = () => {
	const activeTrack = useActiveTrack()

	const { favorites, toggleTrackFavorite } = useFavorites()

	const isFavorite = favorites.find((track) => track.url === activeTrack?.url)?.rating === 1

	// we're updating both the track player internal state and application internal state
	const toggleFavorite = useCallback(async () => {
		// 在函数内部重新获取当前 track，避免闭包问题
		const currentTrack = await TrackPlayer.getActiveTrack()
		if (!currentTrack) return

		const id = await TrackPlayer.getActiveTrackIndex()
		if (id == null) return

		// 基于当前状态计算新的 rating
		const currentRating = favorites.find((track) => track.url === currentTrack.url)?.rating === 1
		const newRating = currentRating ? 0 : 1

		// update track player internal state
		await TrackPlayer.updateMetadataForTrack(id, {
			rating: newRating,
		})

		// update the app internal state
		toggleTrackFavorite(currentTrack)
	}, [toggleTrackFavorite, favorites])

	return { isFavorite, toggleFavorite }
}
