import { View, FlatList, FlatListProps, Image, Text, ViewProps } from 'react-native'
import Tracklistitem from './Tracklistitem'
import { utlisStyles } from '@/styles';
import TrackPlayer, { Track } from 'react-native-track-player';
import { unknownTrack } from '@/constnts/Image';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/Store';
import { SetActiveQueueid } from '@/store/Songslice';
import { QueueControls } from './QueueControls';


export type Tracklistprops = Partial<FlatListProps<Track>> & {
    id: string 
    tracks: Track[]
    hideQueueControls: boolean
    style? : ViewProps
};

export default function Tracklist({ id, style , tracks, hideQueueControls, ...flatlistprop }: Tracklistprops) {
    const queueref = useRef(0)
    const dispatch = useDispatch()

    const activeQueueId = useSelector((state: RootState) => state.activeQueueid)


    const itemDivder = () => (
        <View style={{ ...utlisStyles.itemSeparator, marginVertical: 9, }} />
    )

    const handleTrackSelect = async (selectedSong: Track) => {
        const trackindex = tracks.findIndex((track) => track.url == selectedSong.url)

        if (trackindex == -1) return
        const isChangingQueue = id !== activeQueueId;

        if (isChangingQueue) {
            //skip previous skipafter 
            const beforeIndex = tracks.slice(0, trackindex)
            const afterIndex = tracks.slice(trackindex + 1)

            await TrackPlayer.reset()

            // we construct the new 
            await TrackPlayer.add(selectedSong)
            await TrackPlayer.add(afterIndex)
            await TrackPlayer.add(beforeIndex)

            await TrackPlayer.play()

            queueref.current = trackindex

            dispatch(SetActiveQueueid(id))

        } else {
            // const queue = await TrackPlayer.getQueue();
            // console.log('Player Queue:', queue);
            const nextTrackindex = trackindex - queueref.current < 0 ?
                tracks.length + trackindex - queueref.current :
                trackindex - queueref.current

            // console.log('nextsong' , nextTrackindex)
            await TrackPlayer.skip(nextTrackindex)
            TrackPlayer.play()
        }

    }


    return (
        <FlatList
            data={tracks}
            contentContainerStyle={{ paddingTop: 20, paddingBottom: 140 }}
            ListHeaderComponent={!hideQueueControls ? (
            <QueueControls tracks={tracks} style={{ paddingBottom: 20 }} 
            /> ) : undefined}
            ListEmptyComponent={
                <View>
                    <Text style={utlisStyles.emptyContentText}>No songs found</Text>
                    <Image
                        source={{ uri: unknownTrack }}
                        style={utlisStyles.emptyContentImage}
                    />
                </View>
            }
            ItemSeparatorComponent={itemDivder}
            renderItem={({ item: track }) => (
                <Tracklistitem style={style} onTrackSelect={handleTrackSelect} trackss={track} />
            )}

            {...flatlistprop}
        />
    )
}