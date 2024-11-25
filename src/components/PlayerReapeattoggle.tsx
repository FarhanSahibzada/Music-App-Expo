import { ComponentProps } from "react"
import { RepeatMode } from "react-native-track-player"
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { colors } from "@/constnts/token"
import { UseTrackPlayerRepeatmode } from "@/hooks/useTrackplayerReapeatmode"
import { match } from 'ts-pattern'

type iconProps = Omit<ComponentProps<typeof MaterialCommunityIcons>, 'name'>
type IconName = ComponentProps<typeof MaterialCommunityIcons>['name']

const repeatorder = [RepeatMode.Off, RepeatMode.Track, RepeatMode.Queue] as const;

export const PlayerRepeatToggle = ({ ...iconProps }: iconProps) => {
    const { reapeatMode, changeRepeatMode } = UseTrackPlayerRepeatmode()

    const toggleRepeatMode = () => {
        console.log("repeatmode", reapeatMode)
        if (reapeatMode == null) return
        const currentindex = repeatorder.indexOf(reapeatMode)
        const nextindex = (currentindex + 1) % repeatorder.length
        changeRepeatMode(repeatorder[nextindex])
    }


    const icon = match(reapeatMode)
        .returnType<IconName>()
        .with(RepeatMode.Off, () => 'repeat-off')
        .with(RepeatMode.Track, () => 'repeat-once')
        .with(RepeatMode.Queue, () => 'repeat')
        .otherwise(() => 'repeat-off');

    

    return (
        <MaterialCommunityIcons
            name={icon}
            onPress={toggleRepeatMode}
            color={colors.icon}
            {...iconProps}
        />
    )
}