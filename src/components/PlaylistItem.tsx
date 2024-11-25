import { colors } from "@/constnts/token"
import { deafaultStyles } from "@/styles"
import { Image, StyleSheet, Text, TouchableHighlight, TouchableHighlightProps, View } from "react-native"
import { Track } from "react-native-track-player"
import { AntDesign } from '@expo/vector-icons'

export type playlist = {
    name  : string ,
    tracks : Track[]
    artworkPreview : string ,
}

type playlistitemprops = {
    Playlist : playlist
} & TouchableHighlightProps

export const PlaylistItem = ({ Playlist , ...props} : playlistitemprops)=> {


    return (
        <TouchableHighlight activeOpacity={0.8} {...props}>
			<View style={styles.playlistItemContainer}>
				<View>
					<Image
						source={{
							uri: Playlist.artworkPreview
							
						}}
						style={styles.playlistArtworkImage}
					/>
				</View>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
						width: '100%',
					}}
				>
					<Text numberOfLines={1} style={styles.playlistNameText}>
						{Playlist.name}
					</Text>
					<AntDesign name="right" size={16} color={colors.icon} style={{ opacity: 0.5 }} />
				</View>
			</View>
		</TouchableHighlight>
    )
}


const styles = StyleSheet.create({
	playlistItemContainer: {
		flexDirection: 'row',
		columnGap: 14,
		alignItems: 'center',
		paddingRight: 90,
	},
	playlistArtworkImage: {
		borderRadius: 8,
		width: 60,
		height: 60,
	},
	playlistNameText: {
		...deafaultStyles.text,
		fontSize: 17,
		fontWeight: '600',
		maxWidth: '80%',
	},
})