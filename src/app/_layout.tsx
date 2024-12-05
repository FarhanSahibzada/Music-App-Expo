import { playbackService } from '@/constnts/PlaybackService';
import { colors } from '@/constnts/token';
import { TrackPlayerSetup } from '@/hooks/TrackPlayerSetup';
import UseLogTrack from '@/hooks/UseLogTrack';
import { Store , Presistor } from '@/store/Store';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TrackPlayer from 'react-native-track-player';
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";

const RootNavigation = () => {
 
  return (
    <Provider store={Store}>
      <PersistGate  loading={null} persistor={Presistor} >
      <Stack>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        <Stack.Screen name="(Modals)/AddToPlayList"
				options={{
					presentation: 'modal',
					headerStyle: {
						backgroundColor: colors.background,
					},
					headerTitle: 'Add to playlist',
					headerTitleStyle: {
						color: colors.text,
					},
				}}
			/>
       <Stack.Screen name="(Modals)/RemoveToPlaylist"
				options={{
					presentation: 'modal',
					headerStyle: {
						backgroundColor: colors.background,
					},
					headerTitle: 'Remove from Playlist',
					headerTitleStyle: {
						color: colors.text,
					},
				}}
			/>
      </Stack>
      </PersistGate>
    </Provider>
  )
}


SplashScreen.preventAutoHideAsync()
TrackPlayer.registerPlaybackService(()=> playbackService)

export default function App() {
  // the splash screen load when the trackplayer loaded
  const handleSplashScreen = useCallback(() => {
    SplashScreen.hideAsync()
  }, [])

  TrackPlayerSetup({
    onload: handleSplashScreen
  })

  UseLogTrack()

 


  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <RootNavigation />

        <StatusBar style='auto' />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}



