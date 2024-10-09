import React from 'react';
import { Image, StyleSheet, View, ScrollView, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAvailability } from '../constants/collectionContext.js';
import collection from '../constants/collection';
import Icons from './Icons';

const Collection = () => {
    const navigation = useNavigation();
    const { available, setAvailable } = useAvailability();

    return (
        <ImageBackground
        source={require('../assets/background/home.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
        <View style={styles.container}>
            <TouchableOpacity style={styles.iconBack} onPress={() => navigation.navigate('HomeScreen')}>
                <Icons type={'back'}/>
            </TouchableOpacity>
            <Text style={styles.title}>Collection</Text>
            <ScrollView style={{width: '100%'}}>
            {
                collection.map((item, index) => (
                    <View key={index} style={styles.imgContainer}>
                        <Image source={item.mark} style={styles.image} />
                        {!available[index] && (
                        <View style={styles.locked}>
                            <View style={styles.lockedIcon}>
                                <Icons type={'padlock'}/>
                            </View>
                        </View>
                        )}
                    </View>
                ))
            }
            <View style={{height: 100}}></View>
            </ScrollView>
        </View>
        </View>
        </ImageBackground>
    )
};

const styles = StyleSheet.create({
    backgroundImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
      },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      },
    container: {
        width: '100%',
        height: '100%',
        padding: 20,
        paddingTop: 70,
        alignItems: 'center'
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#a0e9f9',
        marginBottom: 30
    },
    imgContainer: {
        width: '100%',
        marginBottom: 20,
        borderRadius: 2,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: 250,
        resizeMode: 'cover',
    },
    locked: {
        ...StyleSheet.absoluteFillObject,
        // width: '100%',
        // height: 250,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(160, 233, 249, 0.95)',
    },
    lockedIcon: {
        width: 60,
        height: 60,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
        elevation: 5,
    },
    iconBack: {
        width: 40,
        height: 40,
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 10
    }
});

export default Collection;
