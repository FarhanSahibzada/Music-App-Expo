import { View, Text, TouchableOpacity, ViewProps, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import { deafaultStyles } from '@/styles'
import { PlayPauseButton, SkipToNextButton } from './PlayerControls'
import { unknownTrack } from '@/constnts/Image'
import {  useActiveTrack } from 'react-native-track-player'
import UseLastTrackPlayer from '@/hooks/UseLastTrackPlayer'
import { MovingText } from './MovingText'
import { useRouter } from 'expo-router'
import CurrentPlayer from '@/app/Player'

export default function FloatingPlayer({ style }: ViewProps) {
    const router = useRouter()

  
    
    const [modalVisible, setModalVisible] = useState(false);
    const activeTrack = useActiveTrack();
    const lastActiveTrack = UseLastTrackPlayer()
    const displayedTrack = activeTrack ?? lastActiveTrack

    if (!displayedTrack) return null

    const handlePlayerScreen = () => {
      setModalVisible(true)
        //<PlayerScreen  setenable={modalVisible} /> 
      //  router.navigate('/Player')
      //router.navigate('/Player')
    }

    return (
        <>
        <TouchableOpacity onPress={() => handlePlayerScreen()} activeOpacity={0.9} style={[styles.container, style]}>
            <>
                <Image
                    source={{ uri: displayedTrack.artwork ?? unknownTrack }}
                    style={styles.trackArtworkImage}
                />

                <View style={styles.trackTitleContainer}>
                    <MovingText text={displayedTrack.title || ''} style={styles.trackTitle} />
                </View>

                <View style={styles.trackControlsContainer}>
                    <PlayPauseButton iconsize={24} />
                    <SkipToNextButton iconsize={24} />
                </View>
            </>
        </TouchableOpacity>

         {modalVisible ? (
        <CurrentPlayer openmodel={modalVisible} onclose={() => setModalVisible(false)} />
      ) : null} 
</>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#252525',
        paddingHorizontal: 8,
        borderRadius: 12,
        paddingVertical: 10,
    },
    trackArtworkImage: {
        width: 45,
        height: 45,
        borderRadius: 8,
    },
    trackTitleContainer: {
        flex: 1,
        overflow: 'hidden',
        marginLeft: 10,
    },
    trackTitle: {
        ...deafaultStyles.text,
        fontSize: 18,
        fontWeight: '600',
        paddingLeft: 10,
    },
    trackControlsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 20,
        marginRight: 16,
        paddingLeft: 16,
    },
})