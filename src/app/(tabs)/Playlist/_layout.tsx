import { HeaderwithSearchBar } from '@/constnts/Header'
import { colors } from '@/constnts/token'
import { deafaultStyles } from '@/styles'
import { Stack } from 'expo-router'
import { View } from 'react-native'

export default function PlaylistScreenTab() {
  return (
    <View style={deafaultStyles.container}>
      <Stack>
        <Stack.Screen name='index' options={{
          ...HeaderwithSearchBar,
          headerTitle: "Playlist"
        }} />
        <Stack.Screen name='[name]' options={{
          headerTitle: '',
          headerBackVisible: true,
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.primary,
        }} />
      </Stack>
    </View>
  )
}