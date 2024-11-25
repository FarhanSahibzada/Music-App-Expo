import { View,  ScrollView, Platform } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { deafaultStyles } from '@/styles'
import { UseNavigationSearch } from '@/hooks/NavigationSearchbar'
import { useDispatch, useSelector } from 'react-redux'
import {  Href, useRouter } from 'expo-router'
import { SetPLaylistSong } from '@/store/Songslice'
import { RootState } from '@/store/Store'
import { FilterPlaylistSong } from '@/hooks/Filtersong'
import { Playlist } from '@/components/Playlist'
import { screenPadding } from '@/constnts/token'
import { SearchbarAndroid } from '@/components/SearchbarAndroid'

type playlist = {
  name : string
}

export default function PlaylistScreen() {
  const dispatch = useDispatch()
  const router = useRouter()
  const [searchh, setsearch] = useState('')
  const search = UseNavigationSearch({
    Searchbaroptions: {
      placeholder: 'Find Your Playlist'
    }
  })

  useEffect(() => {
    dispatch(SetPLaylistSong())
  }, [])

  const Playlistsong = useSelector((state: RootState) => state.PlaylistSong)

  const filtersong = useMemo(() => {
    if (Platform.OS === 'android' && !searchh) {
      return Playlistsong;
    }
    if (Platform.OS === 'ios' && !search) {
      return Playlistsong;
    }
    if (Platform.OS === 'android' && searchh) {
      return Playlistsong.filter(FilterPlaylistSong(searchh));
    }
    if (Platform.OS === 'ios' && search) {
      return Playlistsong.filter(FilterPlaylistSong(search));
    }

    return Playlistsong;
  }, [Playlistsong, search, searchh])

  const handlepress = (Playlist: playlist) => {
    router.push(`/(tabs)/Playlist/${Playlist.name}` as Href<`/(tabs)/playlist/${string}`>) 
  }

  return (
    <View style={[deafaultStyles.container, { paddingTop: Platform.OS == 'android' ? 100 : 0 }]}>
      {Platform.OS == 'android' && (
        <SearchbarAndroid
          placeholder='Find Your Playlist'
          searchText={searchh}
          setSearchText={setsearch}
        />
      )}
      <ScrollView
        contentInsetAdjustmentBehavior='automatic'
        style={{
          paddingHorizontal: screenPadding.horizontal,
        }}
      >
        <Playlist
          Playlists={filtersong}
          scrollEnabled={false}
          handleplaylistpress={handlepress} />
      </ScrollView>

    </View>
  )
}