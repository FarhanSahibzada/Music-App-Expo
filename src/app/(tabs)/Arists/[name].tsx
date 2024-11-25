import { ArtistTrackList } from "@/components/ArtistTrackList";
import { screenPadding } from "@/constnts/token";
import { RootState } from "@/store/Store";
import { deafaultStyles } from "@/styles";
import { Redirect, useLocalSearchParams } from "expo-router";
import { Platform, ScrollView, View } from "react-native";
import { useSelector  } from "react-redux";


const  ArtistDetailScreen = ()=>{
    const {name }  = useLocalSearchParams()
    const artist = useSelector(( state : RootState)=> state.artistNames)
    const findArtist =  artist.find((artist )=> artist.name === name )   

    if(!findArtist){
        return <Redirect href={'/(tabs)/Arists'} />
    }
    
    return  (
        <View style={{...deafaultStyles.container  , }}>
            <ScrollView
            contentInsetAdjustmentBehavior='automatic'  
            style={{ paddingHorizontal: 24  }}
            />
            <ArtistTrackList  artist={findArtist} /> 
        </View>
    )
}


export default ArtistDetailScreen