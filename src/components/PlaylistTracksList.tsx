import { UseNavigationSearch } from "@/hooks/NavigationSearchbar"
import { playlist as playlisttype } from "./PlaylistItem"
import { Image, Platform, StyleSheet, Text, View } from "react-native"
import { deafaultStyles } from "@/styles"
import { SearchbarAndroid } from "./SearchbarAndroid"
import { useMemo, useState } from "react"
import Tracklist from "./Tracklist"
import { fontSize } from "@/constnts/token"
import { QueueControls } from "./QueueControls"
import { FilterPlaylistSong, FilterSong } from "@/hooks/Filtersong"

type PlaylistTracksListprops = {
    playlist: playlisttype
}

export const PlaylistTracksList = ({ playlist }: PlaylistTracksListprops) => {
    const [searchh, setsearch] = useState('')

    const search = UseNavigationSearch({
        Searchbaroptions: {
            hideWhenScrolling: true,
            placeholder: 'Find your song',
        },
    })

    const filtersong = useMemo(() => {
        if (Platform.OS === 'android' && !searchh) {
            return playlist.tracks;
        }
        if (Platform.OS === 'ios' && !search) {
            return playlist.tracks;
        }
        if (Platform.OS === 'android' && searchh) {
            return playlist.tracks.filter(FilterSong(searchh));
        }
        if (Platform.OS === 'ios' && search) {
            return playlist.tracks.filter(FilterSong(search));
        }

        return playlist.tracks;
    }, [playlist.tracks, search, searchh])

    return (
        <View style={deafaultStyles.container}>
            {Platform.OS == 'android' && (
                <SearchbarAndroid
                    placeholder='Find Your Song!'
                    searchText={searchh}
                    setSearchText={setsearch}
                />
            )}
            <Tracklist
                id={playlist.name}
                scrollEnabled={false}
                hideQueueControls={true}
                ListHeaderComponentStyle={styles.playlistHeaderContainer}
                ListHeaderComponent={
                    <View>
                        <View style={styles.artworkImageContainer}>
                            <Image
                                source={{
                                    uri: playlist.artworkPreview,
                                }}
                                style={styles.artworkImage}
                            />
                        </View>

                        <Text numberOfLines={1} style={styles.playlistNameText}>
                            {playlist.name}
                        </Text>

                        {search.length === 0 && searchh.length === 0 && (
                            <QueueControls style={{ paddingTop: 24 }} tracks={playlist.tracks} />
                        )}
                    </View>
                }
                tracks={filtersong}
            />
        </View>
    )

}


const styles = StyleSheet.create({
    playlistHeaderContainer: {
        flex: 1,
        marginBottom: 32,
    },
    artworkImageContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        height: 300,
    },
    artworkImage: {
        width: '85%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 12,
    },
    playlistNameText: {
        ...deafaultStyles.text,
        marginTop: 22,
        textAlign: 'center',
        fontSize: fontSize.lg,
        fontWeight: '800',
    },
})