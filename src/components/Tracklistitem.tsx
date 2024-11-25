import { unknownTrack } from '../constnts/Image'
import { colors, fontSize } from '@/constnts/token'
import { deafaultStyles } from '@/styles'
import { View, Text, TouchableHighlight, StyleSheet, Image, ViewProps } from 'react-native'
import { Track, useActiveTrack, useIsPlaying } from 'react-native-track-player'
import { Ionicons, Entypo } from '@expo/vector-icons'
import LoaderKit from 'react-native-loader-kit'
import { TrackMenu } from './TrackMenu'
import { StopPagination } from '@/hooks/StopPagination'

export type tracklistitemprops = {
  trackss: Track,
  onTrackSelect: (track: Track) => void
  style?: ViewProps
}


export default function Tracklistitem({ trackss, onTrackSelect, style }: tracklistitemprops) {

  const isActiveTrack = useActiveTrack()?.url == trackss.url;
  const { playing } = useIsPlaying()


  return (
    <TouchableHighlight onPress={() => onTrackSelect(trackss)}>
      <View style={[styles.trackItemContainer, style]}>
        <View>
          <Image
            source={{
              uri: trackss.artwork ?? unknownTrack,
            }}
            style={{
              ...styles.trackArtworkImage,
              opacity: isActiveTrack ? 0.4 : 1,
            }}
          />
          {
            isActiveTrack && (playing ? (
              <LoaderKit
                style={styles.trackPlayingIconIndicator}
                name="LineScaleParty"
                color={colors.icon}
              />
            ) : (
              <Ionicons
                style={styles.trackPausedIndicator}
                name="play"
                size={24}
                color={colors.icon}
              />))
          }
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View style={{ width: '100%' }}>
            <Text
              numberOfLines={1}
              style={{
                ...styles.trackTitleText,
                color: isActiveTrack ? colors.primary : colors.text,
              }}
            >
              {trackss.title}
            </Text>
            <Text numberOfLines={1} style={styles.trackArtistText}>
              {trackss.artist || "Unknown"}
            </Text>
          </View>

          <TrackMenu track={trackss} >
            <StopPagination >
              <Entypo name="dots-three-horizontal" size={18} color={colors.icon} />
            </StopPagination>
          </TrackMenu>

        </View>
      </View>
    </TouchableHighlight>
  )
}


const styles = StyleSheet.create({
  trackItemContainer: {
    flexDirection: 'row',
    columnGap: 12,
    alignItems: 'center',
    paddingRight: 30,
  },
  trackPlayingIconIndicator: {
    position: 'absolute',
    top: 18,
    left: 16,
    width: 16,
    height: 16,
  },
  trackPausedIndicator: {
    position: 'absolute',
    top: 14,
    left: 14,
  },
  trackArtworkImage: {
    borderRadius: 8,
    width: 50,
    height: 50,
  },
  trackTitleText: {
    ...deafaultStyles.text,
    fontSize: fontSize.sm,
    fontWeight: '600',
    maxWidth: '90%',
  },
  trackArtistText: {
    ...deafaultStyles.text,
    color: colors.textMuted,
    fontSize: 14,
    marginTop: 4,
  },
})