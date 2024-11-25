import { Event, useTrackPlayerEvents } from "react-native-track-player"

const events = [Event.PlaybackError , Event.PlaybackState , Event.PlaybackActiveTrackChanged]

export default function UseLogTrack() {
    useTrackPlayerEvents(events, async (event) => {
		if (event.type === Event.PlaybackError) {
			console.log('An error occurred: ', event)
		}

		if (event.type === Event.PlaybackState) {
			console.log('Playback state: ', event.state)
		}

		if (event.type === Event.PlaybackActiveTrackChanged) {
			console.log('Track changed', event.index)
		}
	})
}