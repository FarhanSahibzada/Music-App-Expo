import { View, ScrollView, Platform } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { deafaultStyles } from '@/styles'
import Tracklist from '@/components/Tracklist'
import { UseNavigationSearch } from '@/hooks/NavigationSearchbar'
import { SearchbarAndroid } from '@/components/SearchbarAndroid'
import { FilterSong } from '@/hooks/Filtersong'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/Store'
import { Favouritesong } from '@/store/Songslice'
import library from '@/assets/data/library.json'

export default function FavouriteScreen() {
  const dispatch = useDispatch()
  const search = UseNavigationSearch({
    Searchbaroptions: {
      placeholder: "Find Your Song!"
    }
  })

  useEffect(() => {
    dispatch(Favouritesong())
  }, [])

  const filtersong = useSelector((state: RootState) => state.favouritetrack)

  const [searchh, setsearch] = useState('')


  const filtersongs = useMemo(() => {
    if (Platform.OS === 'android' && !searchh) {
      return filtersong;
    }
    if (Platform.OS === 'ios' && !search) {
      return filtersong;
    }
    if (Platform.OS === 'android' && searchh) {
      return filtersong.filter(FilterSong(searchh));
    }
    if (Platform.OS === 'ios' && search) {
      return filtersong.filter(FilterSong(search));
    }

    return filtersong;
  }, [searchh, filtersong])




  return (
    <View style={[deafaultStyles.container, { paddingTop: Platform.OS == 'android' ? 90 : 0 }]}>
      {Platform.OS == 'android' && (
        <SearchbarAndroid
          placeholder='Find Your Song!'
          searchText={searchh}
          setSearchText={setsearch}
        />
      )}
      <ScrollView
        contentInsetAdjustmentBehavior='automatic'
        style={{ paddingHorizontal: 12, }}
      >
        <Tracklist id='favouritesong' hideQueueControls={false} tracks={filtersongs} scrollEnabled={false} />
      </ScrollView>
    </View>
  )
}