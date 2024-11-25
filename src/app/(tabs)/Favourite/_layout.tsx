import { HeaderwithSearchBar } from '@/constnts/Header'
import { deafaultStyles } from '@/styles'
import { Stack } from 'expo-router'
import React from 'react'
import { View } from 'react-native'

export default function FavouriteScreenTab() {
  return (
    <View style={deafaultStyles.container}>
      <Stack>
        <Stack.Screen name='index' options={{
          ...HeaderwithSearchBar,
          headerTitle: "Favourite"
        }} />
      </Stack>
    </View>
  )
}