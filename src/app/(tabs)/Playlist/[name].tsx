import { PlaylistTracksList } from "@/components/PlaylistTracksList"
import { screenPadding } from "@/constnts/token"
import { RootState } from "@/store/Store"
import { deafaultStyles } from "@/styles"
import { Redirect, useLocalSearchParams } from "expo-router"
import { ScrollView, View } from "react-native"
import { useSelector } from "react-redux"

const PlayListDetailScreen = () => {
    const { name: playlistname } = useLocalSearchParams()
    const Findsong = useSelector((state: RootState) => state.PlaylistSong)
    const playlistsong = Findsong.find((playlist) => playlist.name == playlistname)

    if (!playlistsong) {
        return <Redirect href={'/(tabs)/Playlist'} />
    }

    return (
        <View style={deafaultStyles.container}>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={{ paddingHorizontal: 18 }}
            >
                <PlaylistTracksList playlist={playlistsong} />
            </ScrollView>
        </View>
    )
}


export default PlayListDetailScreen;