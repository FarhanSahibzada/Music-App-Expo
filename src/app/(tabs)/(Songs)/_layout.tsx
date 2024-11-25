import { HeaderwithSearchBar } from '@/constnts/Header'
import { deafaultStyles } from '@/styles'
import { Stack } from 'expo-router'
import { View } from 'react-native'

export default function SongsScreenTab() {
  return (
    <View style={deafaultStyles.container}>
      <Stack>
        <Stack.Screen name='index' options={{
          ...HeaderwithSearchBar,
          headerTitle: 'Songs',
        }} />
      </Stack>
    </View>
  )
}