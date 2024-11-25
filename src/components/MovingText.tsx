import { useEffect } from "react";
import Animated, { Easing, StyleProps, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withTiming } from 'react-native-reanimated'

export type MovingTextProps  = {
    text: string,
    style?: StyleProps
}

export const MovingText = ({ text , style }: MovingTextProps) => {
    const translateX = useSharedValue(0)
    const shouldshowanimation = text.length >= 25;
    const withtext = text.length * 3;

    useEffect(() => {

        if (!shouldshowanimation) return 

        translateX.value = withDelay(1000, withRepeat(
            withTiming(-withtext, {
                duration: 5000,
                easing: Easing.linear
            }),
            -1,
            true,
        ),
        )
        return () => {
            translateX.value = 0
        }
    }, [text, shouldshowanimation, translateX])

    const animatedstyle = useAnimatedStyle(() => ({
            transform: [{ translateX: translateX.value }]
    }))

    return (
        <Animated.Text
        style={[
            style,
            animatedstyle,
            shouldshowanimation && {
                width : 9999 ,
                paddingleft: 14 ,
            }
        ]}
            numberOfLines={1}>
            {text}
        </Animated.Text>
    )

}