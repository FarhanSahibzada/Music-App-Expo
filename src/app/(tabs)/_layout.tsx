import { colors, fontSize } from '@/constnts/token'
import { BlurView } from 'expo-blur'
import { Tabs } from 'expo-router'
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native'
import { FontAwesome, FontAwesome6, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import FloatingPlayer from '@/components/FloatingPlayer'
import React, { useEffect } from 'react'
import { Favouritesong, SetPLaylistSong } from '@/store/Songslice'
import { useDispatch } from 'react-redux'



export default function TabNavigation() {

  const dispatch = useDispatch()
 
  useEffect(() => {
    dispatch(Favouritesong() )
    dispatch(SetPLaylistSong()) 
  }, [])


  return (
    <>
      <Tabs screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarLabelStyle: {
          fontSize: fontSize.xs,
          fontWeight: '700',
        },
        // tabBarBackground: () => (
        // <BlurView intensity={100} 
        // tint='dark'
        //   style={{
        //     ...StyleSheet.absoluteFillObject,
        //     overflow: 'hidden',
        //     borderTopLeftRadius: 20,
        //     borderTopRightRadius: 20
        //   }} />
        // ),
        tabBarStyle: {
          position: 'absolute',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderTopWidth: 0,
          paddingTop: 2,
          paddingBottom: 4,
          backgroundColor: '#252525',
        }
      }}

      >
        <Tabs.Screen name="Favourite" options={{ title: 'Favourite', tabBarIcon: ({ color }) => <FontAwesome name="heart" size={20} color={color} /> }} />
        <Tabs.Screen name="Playlist" options={{ title: 'Playlist', tabBarIcon: ({ color }) => <MaterialCommunityIcons name="playlist-music" size={20} color={color} /> }} />
        <Tabs.Screen name="(Songs)" options={{ title: 'Songs', tabBarIcon: ({ color }) => <Ionicons name="musical-notes-sharp" size={20} color={color} /> }} />
        <Tabs.Screen name="Arists" options={{ title: 'Arists', tabBarIcon: ({ color }) => <FontAwesome6 name="users-line" size={20} color={color} /> }} />

      </Tabs>

      <FloatingPlayer style={{
        position: 'absolute',
        left: 8,
        right: 8,
        bottom: Platform.OS == 'ios'? 60 : 53 , //and 53 ios 60
      }} />
    </>
  )
}