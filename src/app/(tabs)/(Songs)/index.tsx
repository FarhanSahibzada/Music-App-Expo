import { View, ScrollView, Platform } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { deafaultStyles } from '@/styles'
import Tracklist from '@/components/Tracklist'
import { UseNavigationSearch } from '@/hooks/NavigationSearchbar'
import { SearchbarAndroid } from '@/components/SearchbarAndroid'
import library from '@/assets/data/library.json'
import { FilterSong } from '@/hooks/Filtersong'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/Store'
import AsyncStorage from '@react-native-async-storage/async-storage'
//import  { swipeable } from 'react-native-gesture-handler'   last ma ya kam karna ha 
// import * as NavigationBar from 'expo-navigation-bar';       iska sat milka  

export default function SongScreen() {

  const search = UseNavigationSearch({    
    Searchbaroptions: {
      placeholder: "Find Your Song!"
    }
  })

  const Allsong =  useSelector((state : RootState)=> state.tracks)
  const [searchh, setsearch] = useState('')

  const filteredSongs = useMemo(() => {
    if (Platform.OS === 'android' && !searchh) {
      return Allsong;
    }
    if (Platform.OS === 'ios' && !search) {
      return Allsong;
    }
    if (Platform.OS === 'android' && searchh) {
      return Allsong.filter(FilterSong(searchh));
    }
    if (Platform.OS === 'ios' && search) {
      return Allsong.filter(FilterSong(search));
    }

    return Allsong;
  }, [searchh, Allsong])


 
    // const [tracks, setTracks] = useState(null);

    // useEffect(() => {
    //     const fetchTracks = async () => {
        
    //         try {
    //             await AsyncStorage.clear();
    //             console.log('All AsyncStorage data cleared successfully!');
    //         } catch (error) {
    //             console.error('Error clearing all data:', error);
    //         }
    //     };
        
    //     fetchTracks();
    // }, []);

    // console.warn("trackdata" , tracks)
    

  return (
    <View style={{ ...deafaultStyles.container, paddingTop: Platform.OS == 'android' ? 90 : 0 }}>
      {Platform.OS == 'android' && (
        <SearchbarAndroid
          placeholder='Find Your Song!'
          searchText={searchh}
          setSearchText={setsearch}
        />
      )}
      <ScrollView
        contentInsetAdjustmentBehavior='automatic'
        style={{ paddingHorizontal: 12 }}>
        <Tracklist id='Allsong' hideQueueControls={false} tracks={filteredSongs} scrollEnabled={false} />
      </ScrollView>
    </View>
  )
}