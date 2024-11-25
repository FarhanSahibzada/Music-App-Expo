import { Track } from "react-native-track-player"
import { playlist } from "@/components/PlaylistItem"

type Artist = {
  name : string ,
  tracks : Track[]
}


export const FilterSong = ( title: string ) => ( track : any) =>  {
  return   track.title?.toLowerCase().includes(title.toLowerCase())
}

export const ArtistName = (name : string) => (artist : Artist) => {
 return artist.name.toLowerCase().includes(name.toLowerCase())

}

export const FilterPlaylistSong = (name : string)=> (playlist : playlist)=> {
  return playlist.name.toLowerCase().includes(name.toLowerCase())
}
