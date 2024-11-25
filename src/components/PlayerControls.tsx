import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native"
import TrackPlayer, { useIsPlaying } from "react-native-track-player"
import {FontAwesome6} from '@expo/vector-icons'
import { colors } from "@/constnts/token"

type playercontrolsprops = {
    style?: ViewStyle
}

type playerbuttonprops = {
    iconsize?: number,
    style?: ViewStyle
}

export const PlayerControls = ({ style }: playercontrolsprops) => {
    return (
        <View style={[styles.container, style]}>
            <View style={styles.row}>
                <SkipToPreviousButton />

                <PlayPauseButton />

                <SkipToNextButton />
            </View>
        </View>
    )
}

export const PlayPauseButton= ({ iconsize=30, style }: playerbuttonprops) => {
    const { playing } = useIsPlaying()

    return (
        <View style={[{ height: iconsize }, style]}>
            <TouchableOpacity

                activeOpacity={0.85}
                onPress={        playing ? TrackPlayer.pause : TrackPlayer.play}
            >
                <FontAwesome6 name={playing ? 'pause' : 'play'} size={iconsize} color={colors.text} />
            </TouchableOpacity>
        </View>
    )

}

export const SkipToPreviousButton = ({ iconsize=30 }: playerbuttonprops) => {
    return (
		<TouchableOpacity activeOpacity={0.7} onPress={() => TrackPlayer.skipToPrevious()}>
			<FontAwesome6 name={'backward'} size={iconsize} color={colors.text} />
		</TouchableOpacity>
	)
}

export const SkipToNextButton = ({ iconsize=30 }: playerbuttonprops ) => {
    return (
		<TouchableOpacity activeOpacity={0.7} onPress={() => TrackPlayer.skipToNext()}>
			<FontAwesome6 name="forward" size={iconsize} color={colors.text} />
		</TouchableOpacity>
	)
}




const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
})