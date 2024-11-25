import { useCallback, useEffect, useState } from "react"
import TrackPlayer, { RepeatMode } from "react-native-track-player"


export const UseTrackPlayerRepeatmode = ()=>{ 
    const [reapeatMode , setReapeatMode] = useState<RepeatMode>()

    const changeRepeatMode = useCallback(async (repeatMode: RepeatMode) => {
		await TrackPlayer.setRepeatMode(repeatMode)
		setReapeatMode(reapeatMode)
	}, [])

	useEffect(() => {
		TrackPlayer.getRepeatMode().then(setReapeatMode)
	}, [reapeatMode])

	return { reapeatMode, changeRepeatMode }
}