import { useEffect, useRef } from "react";
import TrackPlayer, { AppKilledPlaybackBehavior, Capability, RatingType, RepeatMode } from "react-native-track-player";

const setupplayer = async () => {
    await TrackPlayer.setupPlayer({
        maxCacheSize: 1024 * 10,
    })

    await TrackPlayer.updateOptions({
        android: {
            appKilledPlaybackBehavior: AppKilledPlaybackBehavior.ContinuePlayback, 
        }, 
        ratingType: RatingType.Heart,
        capabilities: [
            Capability.Play,
            Capability.Pause,
            Capability.SkipToNext,
            Capability.SkipToPrevious,
            Capability.Stop
          ],
    });

    await TrackPlayer.setVolume(0.5)
    await TrackPlayer.setRepeatMode(RepeatMode.Queue)
  
}


export const TrackPlayerSetup = ({onload } : {onload? : ()=> void}) => {

    
    const Setintialized  = useRef(false)
    useEffect(() => {
        setupplayer().then(()=> {
            Setintialized.current = true ;
            onload?.()
        })
        .catch((error)=>{
            Setintialized.current = false ;
            console.log("error in trackplayer hanhan ", error)
            
        })
    }, [onload])
}


