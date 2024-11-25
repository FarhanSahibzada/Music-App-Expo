import { useCallback, useEffect, useState } from "react"
import TrackPlayer from "react-native-track-player"

export const Usetrackplayervolume = () => {
    const [Volume, setVolume] = useState(0)

    const getvolume = useCallback(async () => {
        const currentvolume = await TrackPlayer.getVolume()
        setVolume(currentvolume)
    }, [])

    const updateVolume = useCallback(async (newvolume: number) => {
        if (newvolume < 0 || newvolume > 1) return
        setVolume(newvolume)

        await TrackPlayer.setVolume(newvolume)
    }, [])

    useEffect(() => {
        getvolume()

    }, [getvolume])

    return { Volume, updateVolume}
}