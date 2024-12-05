import { createSlice } from "@reduxjs/toolkit";
import library from '@/assets/data/library.json'
import { Track } from "react-native-track-player";
import { unknownTrack } from "@/constnts/Image";


type Artist = {
    name: string
    tracks: Track[]
}
export type Playlist = {
    name: string
    tracks: Track[]
    artworkPreview: string
}

const initialState: { tracks: Track[]; favouritetrack: Track[]; activeQueueid: string | null, artistNames: Artist[], PlaylistSong: Playlist[] } = {
    tracks: library as Track[],
    favouritetrack: [],
    activeQueueid: null,
    artistNames: [],
    PlaylistSong: []

}

const SongSlice = createSlice({
    name: 'Song',
    initialState,
    reducers: {
        Getfullsong: (state) => {
            state.tracks
        },
        Favouritesong: (state) => {
            state.favouritetrack = state.tracks.filter((track) => track.rating == 1)
        },
        SetActiveQueueid: (state, action) => {
            state.activeQueueid = action.payload
        },
        SetAritistName: (state) => {
            state.artistNames = state.tracks.reduce((acc, track) => {
                const existingValue = acc.find((artist) => artist.name === track.artist)

                if (existingValue) {
                    existingValue.tracks.push(track)
                } else {
                    acc.push({
                        name: track.artist ?? 'Unknown',
                        tracks: [track],
                    })
                }

                return acc
            }, [] as Artist[])
        },
        SetPLaylistSong: (state) => {
            state.PlaylistSong = state.tracks.reduce((acc, track) => {
                track.playlist?.forEach((platlistName: string) => {
                    const existingPlaylist = acc.find((playlist) => playlist.name == platlistName)
                    if (existingPlaylist) {
                        existingPlaylist.tracks.push(track)
                    } else {
                        acc.push({
                            name: platlistName,
                            tracks: [track],
                            artworkPreview: track.artwork ?? unknownTrack
                        })
                    }
                })

                return acc
            }, [] as Playlist[])
        },
        toggleFavouriteSong: (state, action) => {
            state.tracks = state.tracks.map((track) => {
                if (track.url == action.payload.url) {
                    return {
                        ...track,
                        rating: track.rating === 1 ? 0 : 1
                    }
                } else {
                    return track
                }
            });
            state.favouritetrack = state.tracks.filter((track) => track.rating === 1)
        },
        AddtoplayList: (state, action) => {
            state.tracks = state.tracks.map((currenttrack) => {
                if (currenttrack.url == action.payload.url) {
                    return {
                        ...currenttrack,
                        playlist: [...(currenttrack.playlist ?? []), action.payload.playlist]
                    }
                }
                return currenttrack
            })
        },
        Removetoplaylist: (state, action) => {
            state.tracks = state.tracks.map((currenttrack) => {
                if (currenttrack.url == action.payload.url) {
                    return {
                        ...currenttrack,
                        playlist: currenttrack.playlist.filter((playlisttt : string) => playlisttt !== action.payload.playlistname)
                    }
                }
                return currenttrack
            })
        }
    }
})


export const { Getfullsong, Favouritesong, SetActiveQueueid, SetAritistName, SetPLaylistSong, toggleFavouriteSong, AddtoplayList  , Removetoplaylist} = SongSlice.actions


export default SongSlice.reducer