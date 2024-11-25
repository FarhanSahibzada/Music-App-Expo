import { unknownTrack } from "@/constnts/Image"
import { utlisStyles } from "@/styles"
import { FlatList, FlatListProps, Image, Text, View } from "react-native"
import { Track } from "react-native-track-player"
import { PlaylistItem } from "./PlaylistItem"

type playlist = {
    name: string
    tracks: Track[]
    artworkPreview: string
}

export type Playlistprops = Partial<FlatListProps<playlist>> & {
    Playlists: playlist[]
    handleplaylistpress : (Playlist : playlist) => void
}

const ItemDivider = () => (
    <View style={{ ...utlisStyles.itemSeparator, marginLeft: 80, marginVertical: 12 }} />
)

export const Playlist = ({ Playlists, handleplaylistpress, ...flatlistprops   }: Playlistprops) => {


    return (
        <FlatList
            contentContainerStyle={{ paddingTop: 10, paddingBottom: 128 }}
            ItemSeparatorComponent={ItemDivider}
            ListFooterComponent={ItemDivider}
            ListEmptyComponent={
				<View>
					<Text style={utlisStyles.emptyContentText}>No playlist found</Text>

					<Image
						source={{ uri: unknownTrack  }}
						style={utlisStyles.emptyContentImage}
					/>
				</View>
			}
            data={Playlists}
            renderItem={({item  :playlistss })=> (
                <PlaylistItem Playlist={playlistss}  onPress={()=> handleplaylistpress(playlistss)}/>
            )}
            {...flatlistprops}
        />
    )
}