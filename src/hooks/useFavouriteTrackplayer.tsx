import { toggleFavouriteSong } from "@/store/Songslice"
import { RootState } from "@/store/Store"
import { useCallback } from "react"
import TrackPlayer, { useActiveTrack } from "react-native-track-player"
import { useDispatch, useSelector } from "react-redux"

export const useFavouriteTrack = ()=> {
    const activetrack = useActiveTrack()
    const dispatch = useDispatch()
    const Favourites = useSelector((state : RootState)=> state.favouritetrack)
    const isFavourite = Favourites.find((track)=> track.url === activetrack?.url)?.rating == 1

    const ChangeFavourite = useCallback(async ()=> {
        const id = await TrackPlayer.getActiveTrackIndex()

        if(id == null) return 

        await TrackPlayer.updateMetadataForTrack(id, {
			rating: isFavourite ? 0 : 1,
		})

        if(activetrack){
            dispatch(toggleFavouriteSong(activetrack))
        }
    } , [isFavourite , toggleFavouriteSong ,activetrack])

    return {isFavourite , ChangeFavourite}
}