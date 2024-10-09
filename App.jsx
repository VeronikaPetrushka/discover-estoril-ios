import React, { useState, useEffect, useRef } from 'react';
import { Animated, View, ImageBackground, StyleSheet, Text, Dimensions } from 'react-native';
// import * as Progress from 'react-native-progress';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen.jsx';
import CollectionScreen from './src/screens/CollectionScreen.jsx';

import { CollectionProvider } from './src/constants/collectionContext.js';

enableScreens();

const Stack = createStackNavigator();

const { height, width } = Dimensions.get('window');


const App = () => {
    // const [loaderIsEnded, setLoaderIsEnded] = useState(false);
    // const [prog, setProg] = useState(0);
    // const [indeterminate, setIndeterminate] = useState(true);
  
    // const firstImageAnim = useRef(new Animated.Value(0)).current;
    // const secondImageAnim = useRef(new Animated.Value(0)).current;
    // const loaderImageAnim = useRef(new Animated.Value(0)).current;

    // const firstLoaderImage = require('./src/assets/loader/loader1.png');
    // const secondLoaderImage = require('./src/assets/loader/loader2.png');
    // const loaderImage = require('./src/assets/loader/loader3.png');

    // useEffect(() => {
    //     Animated.timing(firstImageAnim, {
    //         toValue: 1,
    //         duration: 2000,
    //         useNativeDriver: true,
    //     }).start(() => {
    //         Animated.timing(secondImageAnim, {
    //             toValue: 1,
    //             duration: 2000,
    //             useNativeDriver: true,
    //         }).start(() => {
    //             Animated.timing(loaderImageAnim, {
    //                 toValue: 1,
    //                 duration: 1000,
    //                 useNativeDriver: true,
    //             }).start(() => {
    //                 setTimeout(() => {
    //                     setLoaderIsEnded(true);
    //                 }, 4500);
    //             });
    //         });
    //     });
    // }, []);
  
    // useEffect(() => {
    //     let interval;
    //     const timer = setTimeout(() => {
    //         setIndeterminate(false);
            
    //         interval = setInterval(() => {
    //             setProg(prevProg => Math.min(1, prevProg + 1 / (7500 / 500))); 
    //         }, 500);
    //     }, 1000);
    //     return () => {
    //         clearTimeout(timer);
    //         clearInterval(interval);
    //     };
    // }, []);
  
    return (
      <CollectionProvider>
        <NavigationContainer>
            {/* {
                !loaderIsEnded ? (
                    <View style={{ flex: 1 }}>
                        <ImageBackground style={{ flex: 1 }} source={loaderImage}>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                                <Animated.View style={[styles.imageContainer, { opacity: firstImageAnim }]}>
                                    <ImageBackground source={firstLoaderImage} style={styles.image} />
                                </Animated.View>

                                <Animated.View style={[styles.imageContainer, { opacity: secondImageAnim }]}>
                                    <ImageBackground source={secondLoaderImage} style={styles.image} />
                                </Animated.View>

                                <Animated.View style={[styles.imageContainer, { opacity: loaderImageAnim }]}>
                                    <ImageBackground source={loaderImage} style={styles.image} />
                                    <View style={styles.overlay} />
                                    <View style={styles.textContainer}>
                                        <Text style={styles.congratText}>Welcome to Fishing Time</Text>
                                        <Progress.Bar
                                            width={250}
                                            height={10}
                                            color="#d2f0bc"
                                            progress={prog}
                                            indeterminate={indeterminate}
                                            style={{ alignSelf: 'center', marginTop: 10 }}
                                        />
                                    </View>
                                </Animated.View>
                                
                            </View>
                        </ImageBackground>
                    </View>
                ) : ( */}
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
                    </Stack.Navigator>
                {/* )
            } */}
        </NavigationContainer>
      </CollectionProvider>
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
