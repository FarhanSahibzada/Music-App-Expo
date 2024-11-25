import { SearchbarAndroid } from '@/components/SearchbarAndroid'
import { unknownArtist } from '@/constnts/Image'
import { ArtistName } from '@/hooks/Filtersong'
import { UseNavigationSearch } from '@/hooks/NavigationSearchbar'
import { SetAritistName } from '@/store/Songslice'
import { RootState } from '@/store/Store'
import { deafaultStyles, utlisStyles } from '@/styles'
import { Link } from 'expo-router'
import { useEffect, useMemo, useState } from 'react'
import { View, Text, Platform, FlatList, Image, ScrollView, StyleSheet, TouchableHighlight, Touchable } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSelector, useDispatch } from 'react-redux'


const ItemSeparatorComponent = () => {
  return <View style={[utlisStyles.itemSeparator, { marginLeft: 50, marginVertical: 12 }]} />
}

export default function AristsScreen() {
  const [searchh, setsearch] = useState('')

  const dispatch = useDispatch()
  const search = UseNavigationSearch({
    Searchbaroptions: {
      placeholder: 'Find your artists',
    },
  })
  useEffect(() => {
    dispatch(SetAritistName())
  }, [])

  const artistName = useSelector((state: RootState) => state.artistNames)

  const filteredArtists = useMemo(() => {
    if (Platform.OS === 'android' && !searchh) {
      return artistName;
    }
    if (Platform.OS === 'ios' && !search) {
      return artistName;
    }
    if (Platform.OS === 'android' && searchh) {
      return artistName.filter(ArtistName(searchh));
    }
    if (Platform.OS === 'ios' && search) {
      return artistName.filter(ArtistName(search));
    }

    return artistName;
  }, [artistName, search, searchh])



  return (
    <View style={[deafaultStyles.container, { paddingTop: Platform.OS == 'android' ? 90 : 0 }]}>
      {Platform.OS == 'android' && (
        <SearchbarAndroid
          placeholder='Find Your Artitst!'
          searchText={searchh}
          setSearchText={setsearch}
        />
      )}
      <ScrollView
        contentInsetAdjustmentBehavior='automatic'
        style={{ paddingHorizontal: 14, paddingVertical: 10 }}
      >
        <FlatList
          scrollEnabled={false}
          style={{ paddingTop: 10, paddingBottom: 120 }}
          ItemSeparatorComponent={ItemSeparatorComponent}
          ListFooterComponent={ItemSeparatorComponent}
          ListEmptyComponent={
            <View >
              <Text>No artist found</Text>
              <Image
                source={{
                  uri: unknownArtist,
                }}
                style={utlisStyles.emptyContentImage}
              />
            </View>}
          data={filteredArtists}
          renderItem={({ item: artist }) => {
            return (
              <Link href={`/Arists/${artist.name}`} asChild >
                <TouchableHighlight activeOpacity={0.8}>
                  <View style={styles.artistItemContainer}>
                    <View>
                      <Image
                        source={{
                          uri: unknownArtist,
                        }}
                        style={styles.artistImage}
                      />
                    </View>

                    <View style={{ width: '100%' }}>
                      <Text numberOfLines={1} style={styles.artistNameText}>
                        {artist.name}
                      </Text>
                    </View>
                  </View>
                </TouchableHighlight>
              </Link>
            )
          }}
        />

      </ScrollView >
    </View >
  )
}


const styles = StyleSheet.create({
  artistItemContainer: {
    flexDirection: 'row',
    columnGap: 14,
    alignItems: 'center',
  },
  artistImage: {
    borderRadius: 32,
    width: 40,
    height: 40,
  },
  artistNameText: {
    ...deafaultStyles.text,
    fontSize: 17,
    maxWidth: '80%',
  },
})