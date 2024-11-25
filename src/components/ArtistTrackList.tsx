import { UseNavigationSearch } from "@/hooks/NavigationSearchbar"
import { useMemo, useState } from "react"
import Tracklist from "./Tracklist"
import { Image, Platform, StyleSheet, Text, View } from "react-native"
import { SearchbarAndroid } from "./SearchbarAndroid"
import { Track } from "react-native-track-player"
import { FilterSong } from "@/hooks/Filtersong"
import { deafaultStyles } from "@/styles"
import { fontSize } from "@/constnts/token"
import { unknownArtist } from "@/constnts/Image"
import { QueueControls } from "./QueueControls"

type ArtistTrackList = {
    name: string
    tracks: Track[]
}

export const ArtistTrackList = ({ artist }: { artist: ArtistTrackList }) => {
    const [searchh, setsearch] = useState('')

    const search = UseNavigationSearch({
        Searchbaroptions: {
            placeholder: 'Find in artists',
        },
    })


    const filteredArtists = useMemo(() => {
        if (Platform.OS === 'android' && !searchh) {
            return artist.tracks;
        }
        if (Platform.OS === 'ios' && !search) {
            return artist.tracks;
        }
        if (Platform.OS === 'android' && searchh) {
            return artist.tracks.filter(FilterSong(searchh));
        }
        if (Platform.OS === 'ios' && search) {
            return artist.tracks.filter(FilterSong(search));
        }

        return artist.tracks;
    }, [artist.tracks, search, searchh])


    return (
        <View style={{marginBottom : 50 ,}}>
            {Platform.OS == 'android' && (
                <SearchbarAndroid
                    placeholder='Find Your Artitst!'
                    searchText={searchh}
                    setSearchText={setsearch}
                />
            )}
            <Tracklist
                style={{ paddingHorizontal: 15, }}
                id={artist.name || 'unknown'}
                hideQueueControls={true}
                scrollEnabled={true}
                ListHeaderComponentStyle={styles.artistHeaderContainer}
                ListHeaderComponent={
                    <View>
                        <View style={styles.artworkImageContainer}>
                            <Image
                                source={{
                                    uri: unknownArtist,
                                }}
                                style={styles.artistImage}
                            />
                        </View>

                        <Text numberOfLines={1} style={styles.artistNameText}>
                            {artist.name}
                        </Text>
                        {search.length === 0 && searchh.length === 0 && (
                            <QueueControls tracks={filteredArtists} style={{ paddingTop: 24 }} />
                        )}

                    </View>
                }

                tracks={filteredArtists}
            />
        </View>
    )

}


const styles = StyleSheet.create({
    artistHeaderContainer: {
        flex: 1,
        marginBottom: 30,
        marginHorizontal: 14,
    },
    artworkImageContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        height: 200,
    },
    artistImage: {
        width: '60%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 128,
    },
    artistNameText: {
        ...deafaultStyles.text,
        marginTop: 22,
        textAlign: 'center',
        fontSize: fontSize.lg,
        fontWeight: '800',
    },
})