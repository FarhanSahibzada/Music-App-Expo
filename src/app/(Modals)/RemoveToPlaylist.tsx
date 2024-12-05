import { playlist } from "@/components/PlaylistItem";
import { screenPadding } from "@/constnts/token";
import { Removetoplaylist, SetPLaylistSong } from "@/store/Songslice";
import { RootState } from "@/store/Store";
import { deafaultStyles, utlisStyles } from "@/styles";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import TrackPlayer, { Track } from "react-native-track-player";
import { useDispatch, useSelector } from "react-redux";
import { useHeaderHeight } from '@react-navigation/elements'
import { Playlist } from "@/components/Playlist";

export default function RemoveToPlaylist() {
    const { trackurl } = useLocalSearchParams<{ trackurl: Track['url'] }>()
    const alltracks = useSelector((state: RootState) => state.tracks)
    const allplaylist = useSelector((state: RootState) => state.PlaylistSong)
    const currentsong = alltracks.find((track) => track.url == trackurl)
    const dispatch = useDispatch()
    const router = useRouter()
    const activeQueueid = useSelector((state: RootState) => state.activeQueueid)
    const headerHeight = useHeaderHeight()

    if (!currentsong) {
        return null
    }
  
    const availableplaylist = allplaylist.filter(
        (playlist) =>  playlist.tracks.some((currentplaylist) => currentplaylist.url === currentsong.url) 
    )

    const handleclick = async (playlists: playlist) => {
        dispatch(Removetoplaylist({ url: currentsong.url, playlistname: playlists.name }))
        dispatch(SetPLaylistSong())
        router.dismiss()

        if (activeQueueid?.startsWith(playlists.name)) {
            await TrackPlayer.add(currentsong)
        }

    }


    return (
        <>
            <SafeAreaProvider style={[styles.modalContainer, { paddingTop: headerHeight }]}>
                <Playlist Playlists={availableplaylist} handleplaylistpress={handleclick} />
            </SafeAreaProvider>
        </>

    )
}

const styles = StyleSheet.create({
    modalContainer: {
        ...deafaultStyles.container,
        paddingHorizontal: screenPadding.horizontal,
    },
})