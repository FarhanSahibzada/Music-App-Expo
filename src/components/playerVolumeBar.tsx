import { View, ViewProps } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { Ionicons } from '@expo/vector-icons'
import { colors } from "@/constnts/token";
import { Slider } from "react-native-awesome-slider";
import { Usetrackplayervolume } from "@/hooks/useTrackPlayerVolume";

export const PlayerVolumeBar = ( {style }: ViewProps) => {
    const { Volume , updateVolume} = Usetrackplayervolume()
    const progress = useSharedValue(0)
    const min = useSharedValue(0)
    const max = useSharedValue(1)

    progress.value = Volume ?? 0 
    return (
        <View style={style}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="volume-low" size={20} color={colors.icon} style={{ opacity: 0.8 }} />
                <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 10, }}>
                    <Slider
                        progress={progress}
                        minimumValue={min}
                        maximumValue={max}
                        renderBubble={() => null}
                        theme={{
                            minimumTrackTintColor : colors.minimumTrackTintColor , 
                            maximumTrackTintColor: colors.maximumTrackTintColor
                        }}
                        onValueChange={(value)=> {
                            updateVolume(value)
                        }}
                        thumbWidth={0}
                    />
                </View>

                <Ionicons name="volume-high" size={20} color={colors.icon} style={{ opacity: 0.8 }} />
            </View>
        </View>
    )
}