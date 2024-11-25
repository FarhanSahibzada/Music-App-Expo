import { SafeAreaProvider } from "react-native-safe-area-context"
import { useHeaderHeight } from '@react-navigation/elements'
import { useLocalSearchParams, useRouter } from "expo-router"
import TrackPlayer, { Track } from "react-native-track-player"
import { Playlist } from "@/components/Playlist"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/Store"
import { LogBox, StyleSheet } from "react-native"
import { deafaultStyles } from "@/styles"
import { screenPadding } from "@/constnts/token"
import { useDebugValue, useEffect } from "react"
import { AddtoplayList, SetPLaylistSong } from "@/store/Songslice"
import { playlist } from "@/components/PlaylistItem"

const AddToPlayList = () => {
    const { trackurl } = useLocalSearchParams<{ trackurl: Track['url'] }>()
    const headerHeight = useHeaderHeight()
    const dispatch = useDispatch()
    const router = useRouter()
    const activequeueid = useSelector((state: RootState) => state.activeQueueid)
    const allplaylist = useSelector((state: RootState) => state.PlaylistSong)
    const allsong = useSelector((state: RootState) => state.tracks)
    const currentsong = allsong.find((currenttrack) => currenttrack.url == trackurl)

    if (!currentsong) {
        return null
    }

    const availablePlayList = allplaylist.filter(
        (playlists) => !playlists.tracks.some((currentplaylist) => currentplaylist.url == currentsong.url)
    )


    const handleclick = async (playlists : playlist) => {
        dispatch(AddtoplayList({url : currentsong.url , playlist : playlists.name }))
        dispatch(SetPLaylistSong())
        router.dismiss()

        if (activequeueid?.startsWith(playlists.name)){
            await TrackPlayer.add(currentsong)
        }
    }


    return (
        <SafeAreaProvider style={[styles.modalContainer, { paddingTop: headerHeight }]}>
             <Playlist  Playlists={availablePlayList}  handleplaylistpress={handleclick} />  
        </SafeAreaProvider>
    )
}


const styles = StyleSheet.create({
    modalContainer: {
        ...deafaultStyles.container,
        paddingHorizontal: screenPadding.horizontal,
    },
})



export default AddToPlayList