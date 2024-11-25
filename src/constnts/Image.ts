import { Image } from "react-native";
import unknownArtistImage from '@/assets/unknown_artist.jpg'
import unknownTrackImage from '@/assets/unknown_track.png'

export const unknownArtist =  Image.resolveAssetSource(unknownArtistImage).uri;
export const unknownTrack =  Image.resolveAssetSource(unknownTrackImage).uri;