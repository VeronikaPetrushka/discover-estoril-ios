import React, { useState, useEffect, useRef } from 'react';
import { Animated, View, ImageBackground, StyleSheet, Text, Dimensions } from 'react-native';
// import * as Progress from 'react-native-progress';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen.jsx';
import CollectionScreen from './src/screens/CollectionScreen.jsx';
import SettingsScreen from './src/screens/SettingsScreen.jsx';

import { CollectionProvider } from './src/constants/context/collection.js';
import { MusicProvider } from './src/constants/context/music.js';
import MusicPlayer from './src/components/MusicPlayer.jsx';

enableScreens();

const Stack = createStackNavigator();

const { height, width } = Dimensions.get('window');


const App = () => {
  
    return (
      <MusicProvider>
      <CollectionProvider>
      <MusicPlayer />
        <NavigationContainer>
                    <Stack.Navigator initialRouteName="HomeScreen">
                        <Stack.Screen 
                            name="HomeScreen" 
                            component={HomeScreen} 
                            options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                            name="CollectionScreen" 
                            component={CollectionScreen} 
                            options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                            name="SettingsScreen" 
                            component={SettingsScreen} 
                            options={{ headerShown: false }} 
                        />
                    </Stack.Navigator>
        </NavigationContainer>
      </CollectionProvider>
      </MusicProvider>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      zIndex: 1,
  },
    textContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: height * 0.35,
        left: 0,
        right: 0,
        zIndex: 2
    },
    congratText: {
        fontSize: width * 0.2,
        fontWeight: 'bold',
        color: '#d2f0bc',
        textAlign: 'center',
        marginBottom: 10,
    },
    image: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default App;
