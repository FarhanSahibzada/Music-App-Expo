import { colors } from "@/constnts/token"
import { useEffect, useState } from "react"
import { getColors, ImageColorsResult } from 'react-native-image-colors'
import { AndroidImageColors } from "react-native-image-colors/build/types"

export const UsePlayerBackgroundColor = (imageurl: string) =>{
    const [imageColor , setImageColor] = useState<AndroidImageColors  | null>(null)

    
    
    useEffect(() => {
        getColors(imageurl, {
			fallback: colors.background,
			cache: true,
			key: imageurl,
		}).then((colors) => setImageColor(colors as AndroidImageColors))
        .catch((error) => console.error("Error getting colors:", error));
    },[imageurl])

    return { imageColor }
}