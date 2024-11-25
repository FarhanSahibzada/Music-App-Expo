import { Slider } from 'react-native-awesome-slider';
import { StyleSheet, Text, View, ViewProps } from 'react-native';
import TrackPlayer, { useProgress } from 'react-native-track-player';
import { useSharedValue } from 'react-native-reanimated';
import { Formattime } from '@/hooks/formatTimeToMinutes';
import { deafaultStyles, utlisStyles } from '@/styles';
import { colors, fontSize } from '@/constnts/token';


export const PlayerProgressBar = ({ style }: ViewProps) => {
    const { duration, position } = useProgress(250)
    const isSliding = useSharedValue(false)
    const progress = useSharedValue(0)
    const min = useSharedValue(0)
    const max = useSharedValue(1)


    const trackruningtime = Formattime(position)
    const trackRemainingTime = Formattime(duration)

    //console.log("duration", duration - position)
    

    if (!isSliding.value) {
        progress.value = duration > 0 ? position / duration : 0
    }

    return (
        <View style={style}>
            <Slider
                progress={progress}
                minimumValue={min}
                maximumValue={max}
                containerStyle={utlisStyles.slider}
                renderBubble={() => null}
                thumbWidth={0}
                theme={{
                    minimumTrackTintColor: colors.maximumTrackTintColor,
                    maximumTrackTintColor: colors.maximumTrackTintColor
                }}
                onSlidingStart={() => (isSliding.value = true )}
                onValueChange={async (value) => {
                    await TrackPlayer.seekTo(value * duration)
                }}
                onSlidingComplete={async (value) => {
                    if (!isSliding.value) return

                    isSliding.value = false
                    await TrackPlayer.seekTo(value * duration)
                }}

            />
            <View style={styles.timeRow}>
                <Text style={styles.timeText}>{trackruningtime}</Text>

                <Text style={styles.timeText}>
                    {trackRemainingTime}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    timeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginTop: 20,
    },
    timeText: {
        ...deafaultStyles.text,
        color: colors.text,
        opacity: 0.75,
        fontSize: fontSize.xs,
        letterSpacing: 0.7,
        fontWeight: '500',
    },
})