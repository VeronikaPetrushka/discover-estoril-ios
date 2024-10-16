import React, { useState, useEffect, useRef } from 'react';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Animated, View, ImageBackground, StyleSheet, Text, Dimensions } from 'react-native';
import * as Progress from 'react-native-progress';
import HomeScreen from './src/screens/HomeScreen.jsx';
import SavedScreen from './src/screens/SavedScreen.jsx'
import CollectionScreen from './src/screens/CollectionScreen.jsx';
import FoldersScreen from './src/screens/FoldersScreen.jsx';
import FolderDetailsScreen from './src/screens/FolderDetailsScreen.jsx';
import SettingsScreen from './src/screens/SettingsScreen.jsx';
import MuseumScreen from './src/screens/MuseumScreen.jsx';
import MapScreen from './src/screens/MapScreen.jsx';
import MuseumFactsScreen from './src/screens/MuseumFactsScreen.jsx'
import LeadersBoardScreen from './src/screens/LeadersBoardScreen.jsx';
import QuizModeScreen from './src/screens/QuizModeScreen.jsx';
import TopicsExpertScreen from './src/screens/TopicsExpertScreen.jsx';
import TopicsNewcomerScreen from './src/screens/TopicsNewcomerScreen.jsx';
import QuizExpertScreen from './src/screens/QuizExpertScreen.jsx';
import QuizNewcomerScreen from './src/screens/QuizNewcomerScreen.jsx';

import { CollectionProvider } from './src/constants/context/collection.js';
import { MusicProvider } from './src/constants/context/music.js';
import MusicPlayer from './src/components/MusicPlayer.jsx';

enableScreens();

const Stack = createStackNavigator();

const { height, width } = Dimensions.get('window');

const App = () => {
    const [loaderIsEnded, setLoaderIsEnded] = useState(false);
    const [prog, setProg] = useState(0);
    const [indeterminate, setIndeterminate] = useState(true);
  
    const firstImageAnim = useRef(new Animated.Value(0)).current;
    const loaderImageAnim = useRef(new Animated.Value(0)).current;

    const firstLoaderImage = require('./src/assets/loader/loader1.png');
    const loaderImage = require('./src/assets/loader/loader2.png');

    useEffect(() => {
        Animated.timing(firstImageAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
        }).start(() => {
                Animated.timing(loaderImageAnim, {
                    toValue: 1,
                    duration: 1500,
                    useNativeDriver: true,
                }).start(() => {
                        setLoaderIsEnded(true);
                });
        });
    }, []);
  
    return (
      <MusicProvider>
      <CollectionProvider>
      <MusicPlayer />
        <NavigationContainer>
        {
                !loaderIsEnded ? (
                    <View style={{ flex: 1 }}>
                        <ImageBackground style={{ flex: 1 }} source={loaderImage}>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                                <Animated.View style={[styles.imageContainer, { opacity: firstImageAnim }]}>
                                    <ImageBackground source={firstLoaderImage} style={styles.image} />
                                </Animated.View>

                                <Animated.View style={[styles.imageContainer, { opacity: loaderImageAnim }]}>
                                    <ImageBackground source={loaderImage} style={styles.image} />
                                </Animated.View>
                                
                            </View>
                        </ImageBackground>
                    </View>
                ) : (
                    <Stack.Navigator initialRouteName="HomeScreen">
                        <Stack.Screen 
                            name="HomeScreen" 
                            component={HomeScreen} 
                            options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                            name="SavedScreen" 
                            component={SavedScreen} 
                            options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                            name="CollectionScreen" 
                            component={CollectionScreen} 
                            options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                            name="FoldersScreen" 
                            component={FoldersScreen} 
                            options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                            name="FolderDetailsScreen" 
                            component={FolderDetailsScreen} 
                            options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                            name="SettingsScreen" 
                            component={SettingsScreen} 
                            options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                            name="MuseumScreen" 
                            component={MuseumScreen} 
                            options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                            name="MapScreen" 
                            component={MapScreen} 
                            options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                            name="MuseumFactsScreen" 
                            component={MuseumFactsScreen} 
                            options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                            name="LeadersBoardScreen" 
                            component={LeadersBoardScreen} 
                            options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                            name="QuizModeScreen" 
                            component={QuizModeScreen} 
                            options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                            name="TopicsExpertScreen" 
                            component={TopicsExpertScreen} 
                            options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                            name="TopicsNewcomerScreen" 
                            component={TopicsNewcomerScreen} 
                            options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                            name="QuizExpertScreen" 
                            component={QuizExpertScreen} 
                            options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                            name="QuizNewcomerScreen" 
                            component={QuizNewcomerScreen} 
                            options={{ headerShown: false }} 
                        />
                    </Stack.Navigator>
                )
            }
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
    image: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default App;
