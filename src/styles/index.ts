import { StyleSheet } from "react-native";
import { colors , fontSize } from "@/constnts/token";

export const deafaultStyles = StyleSheet.create({
    container: {
		flex: 1,
		backgroundColor: colors.background,
	},
	text: {
		fontSize: fontSize.base,
		color: colors.text,
	},
})


export const utlisStyles = StyleSheet.create({
	simplecontainer : {
		display : 'flex',
		justifyContent : 'center',
		alignItems : 'center'
	},
    centeredRow: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
    slider: {
		height: 7,
		borderRadius: 16,
	},
    itemSeparator : {
        borderColor : colors.textMuted,
        borderWidth : StyleSheet.hairlineWidth,
        opacity : 0.3 
    },
    emptyContentText: {
		...deafaultStyles.text,
		color: colors.textMuted,
		textAlign: 'center',
		marginTop: 20,
	},
    emptyContentImage: {
		width: 200,
		height: 200,
		alignSelf: 'center',
		marginTop: 40,
		opacity: 0.3,
	},
})