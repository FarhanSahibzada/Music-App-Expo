import { toggleFavouriteSong } from "@/store/Songslice"
import { RootState } from "@/store/Store"
import { MenuView } from "@react-native-menu/menu"
import { useRouter } from "expo-router"
import { PropsWithChildren, useEffect } from "react"
import { Platform } from "react-native"
import TrackPlayer, { Track } from "react-native-track-player"
import { useDispatch, useSelector } from "react-redux"
import { match } from "ts-pattern"


type trackmenuprops = PropsWithChildren<{ track: Track }>

export const TrackMenu = ({ track, children }: trackmenuprops) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const isFavorite = track.rating === 1
    const fabouritesong = useSelector((state: RootState) => state.favouritetrack)
    const activequeueid = useSelector((state: RootState) => state.activeQueueid)

    const handletoggle = (id: string) => {
        match(id)
            .with('add-to-favorites', async () => {
                dispatch(toggleFavouriteSong(track))

                if (activequeueid?.startsWith('favouritesong')) {
                    await TrackPlayer.add(track)
                }

            })
            .with('remove-from-favorites', async () => {
                dispatch(toggleFavouriteSong(track))

                // agar track favourite queue ma hoa tu remove karna hoga 
                if (activequeueid?.startsWith('favorites')) {
                    const queue = await TrackPlayer.getQueue()
                    const trackToRemove = queue.findIndex((queueTrack) => queueTrack.url === track.url)
                    await TrackPlayer.remove(trackToRemove)
                }
            })
            .with('add-to-playlist', () => {
                router.push({ pathname:'/(Modals)/AddToPlayList', params : {trackurl : track.url} })
            })
            .otherwise(() => console.warn(`Unknown menu action ${id}`))
    }

    return (
        <MenuView
            onPressAction={({ nativeEvent: { event } }) => handletoggle(event)}
            actions={[
                {
                    id: isFavorite ? 'remove-from-favorites' : 'add-to-favorites',
                    title: isFavorite ? 'Remove from favorites' : 'Add to favorites',
                    image: Platform.select({
                        ios: isFavorite ? 'star.fill' : 'star',
                        android: isFavorite ? 'ic_menu_today' : 'ic_menu_today',
                    }),
                    imageColor: '#252525',
                },
                {
                    id: 'add-to-playlist',
                    title: 'Add to playlist',
                    image: Platform.select({
                        ios: 'plus',
                        android: 'ic_menu_add',
                    }),
                    imageColor: '#252525',
                },
            ]}
        >
            {children}
        </MenuView>
    )
}