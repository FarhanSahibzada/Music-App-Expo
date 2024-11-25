import { StyleSheet, Text, TouchableOpacity, View, ViewProps } from "react-native"
import TrackPlayer, { Track } from "react-native-track-player"
import { Ionicons } from '@expo/vector-icons'
import { colors } from "@/constnts/token"
import { deafaultStyles } from "@/styles"

export type  queueControlsprops = {
    tracks : Track[]   
} & ViewProps


export const QueueControls = ({tracks , style } : queueControlsprops)=> {

    const handlePlay  = async ()=> {
        await TrackPlayer.setQueue(tracks)
        TrackPlayer.play()
    }

    const handleShufflePlay = async ()=> {
        const sorttracklist  = [...tracks].sort(()=> Math.random() - 0.5)
        await TrackPlayer.setQueue(sorttracklist)
        TrackPlayer.play()
    }
    
    return  (
        <View style={[{ flexDirection: 'row', columnGap: 16 }, style]} >
			{/* Play button */}
			<View style={{ flex: 1 }}>
				<TouchableOpacity onPress={handlePlay} activeOpacity={0.8} style={styles.button}>
					<Ionicons name="play" size={22} color={colors.primary} />

					<Text style={styles.buttonText}>Play</Text>
				</TouchableOpacity>
			</View>

			{/* Shuffle button */}
			<View style={{ flex: 1 }}>
				<TouchableOpacity onPress={handleShufflePlay} activeOpacity={0.8} style={styles.button}>
					<Ionicons name={'shuffle-sharp'} size={24} color={colors.primary} />

					<Text style={styles.buttonText}>Shuffle</Text>
				</TouchableOpacity>
			</View>
		</View>    
    )
}


const styles = StyleSheet.create({
	button: {
		padding: 12,
		backgroundColor: 'rgba(47, 47, 47, 0.5)',
		borderRadius: 8,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		columnGap: 8,
	},
	buttonText: {
		...deafaultStyles.text,
		color: colors.primary,
		fontWeight: '600',
		fontSize: 18,
		textAlign: 'center',
	},
})