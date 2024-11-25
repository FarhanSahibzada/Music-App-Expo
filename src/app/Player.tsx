import React, {  useMemo, useState } from "react";
import { Image, Modal, Platform, StyleSheet, Text, View } from "react-native";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { unknownTrack } from "@/constnts/Image";
import { useActiveTrack } from "react-native-track-player";
import { deafaultStyles } from "@/styles";
import { colors, fontSize, screenPadding } from "@/constnts/token";
import { FontAwesome } from '@expo/vector-icons'
import { PlayerControls } from "@/components/PlayerControls";
import { PlayerProgressBar } from '../components/playerProgressbar'
import { PlayerVolumeBar } from '@/components/playerVolumeBar'
import { PlayerRepeatToggle } from "@/components/PlayerReapeattoggle";
import { UsePlayerBackgroundColor } from "@/hooks/Useplayerbackgroundcolor";
import { LinearGradient } from "expo-linear-gradient";
import { useFavouriteTrack } from "@/hooks/useFavouriteTrackplayer";

export type modelprops = {
    openmodel?: boolean,
    onclose?: () => void
}

export default function CurrentPlayer({ openmodel, onclose }: modelprops) {
    const {isFavourite , ChangeFavourite } = useFavouriteTrack()
    const { top, bottom } = useSafeAreaInsets()
    const activetrack = useActiveTrack()
    const { imageColor } = UsePlayerBackgroundColor(activetrack?.artwork ?? unknownTrack)

    
    const Content = useMemo(() =>
        // gestureHandlerRootHOC to work properly on Android
        gestureHandlerRootHOC(() => (
             <LinearGradient
                 style={{ flex: 1 }}
                 colors={imageColor ? [imageColor.average , imageColor.lightVibrant] : ['#252525', '#F6F7C4']}
             >
                <View
                    style={styles.overlayContainer}
                >
                    <View style={{ flex: 1, marginTop: top , marginBottom: bottom }}>
                        {/* Artwork */}
                        <View style={styles.artworkImageContainer}>
                            <Image
                                source={{ uri: activetrack?.artwork ?? unknownTrack }}
                                style={styles.artworkImage}
                            />
                        </View>

                        {/* Content */}
                        <View style={{ flex: 1 }}>
                            <View style={{ marginTop: 20 }}>
                                <View style={{ height: 70 }}>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                        }}
                                    >
                                        {/* Track Title */}
                                        <View style={styles.trackTitleContainer}>
                                            <Text style={styles.trackTitleText}>
                                                {activetrack?.title || "Unknown Title"}
                                            </Text>
                                        </View>
                                        {/* Favourite Button */}
                                        <FontAwesome
                                            name={isFavourite ? "heart" : "heart-o"}
                                            size={20}
                                            color={isFavourite ? colors.primary : colors.icon}
                                            style={{ marginHorizontal: 14 }}
                                            onPress={ChangeFavourite}
                                        />
                                    </View>

                                    {/* Artist Name */}
                                    <Text
                                        numberOfLines={1}
                                        style={[styles.trackArtistText, { marginTop: 7 }]}
                                    >
                                        {activetrack?.artist || "Unknown Artist"}
                                    </Text>
                                </View>

                                {/* Player Controls */}
                                <PlayerProgressBar style={{ marginTop: 34 }} />
                                <PlayerControls style={{ marginTop: 40 }} />
                            </View>

                            {/* Volume & Repeat */}
                            <PlayerVolumeBar style={{ marginTop: "auto", marginBottom: 30 }} />
                            <View style={styles.centeredRow}>
                                <PlayerRepeatToggle size={30} style={{ marginBottom: 6 }} />
                            </View>
                        </View>
                    </View>
                </View>
            </LinearGradient> 
        )), [activetrack, imageColor , isFavourite ]);






    return (
        <Modal
            visible={openmodel}
            animationType="slide"
            transparent={true}
            onRequestClose={onclose}
        >
            <Content />
        </Modal>

    )
}

const styles = StyleSheet.create({
    overlayContainer: {
		...deafaultStyles.container,
		paddingHorizontal: screenPadding.horizontal,
		backgroundColor: 'rgba(0,0,0,0.5)',
	},
    artworkImageContainer: {
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 11.0,
        elevation: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        height: '45%',
    },
    artworkImage: {
        width: '100%',
        height: '100%',
        resizeMode : 'cover',
        borderRadius: 20,
    },
    trackTitleContainer: {
        flex: 1,
        overflow: 'hidden',
    },
    trackTitleText: {
        ...deafaultStyles.text,
        fontSize: 22,
        fontWeight: '700',
    },
    trackArtistText: {
        ...deafaultStyles.text,
        fontSize: fontSize.base,
        opacity: 0.8,
        maxWidth: '90%',
    },
    centeredRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
})