import React, { useState } from 'react';
import { Image, StyleSheet, View, ScrollView, Text, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import museum from '../constants/museum.js';
import Icons from './Icons';

const { height } = Dimensions.get('window');

const Museum = () => {
    const navigation = useNavigation();
    const [selected, setSelected] = useState(false);

    const handlePress = (item, index) => {
        setSelected(index);
        navigation.navigate('MuseumFactsScreen', { 
            museum: item.name,
            description: item.description,
            famous: item.famous,
            factName: item.factName,
            fact: item.fact,
            facts: item.facts,
            images: item.images,
            reward: item.reward
        });
    };

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
            <TouchableOpacity style={styles.iconMap} onPress={() => navigation.navigate('MapScreen')}>
                <Icons type={'map'}/>
            </TouchableOpacity>
            <Text style={styles.title}>Museum</Text>
            <View style={styles.imageList}>
            <ScrollView style={{width: '100%'}}>
            {
                museum.map((item, index) => (
                    <View key={index} style={{width: '100%'}}>
                    <View style={styles.imgContainer}>
                        <Image source={item.museum} style={styles.image} />
                    </View>
                    <TouchableOpacity 
                        style={styles.textContainer} 
                        onPress={() => handlePress(item, index)}>
                        <Text style={styles.text}>{item.name}</Text>
                    </TouchableOpacity>
                    </View>
                ))
            }
            </ScrollView>

            </View>
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
        paddingTop: height * 0.08,
        alignItems: 'center'
    },
    title: {
        fontSize: 34,
        fontWeight: 'bold',
        color: '#e2d6b1',
        marginBottom: height * 0.03
    },
    imageList: {
        width: '100%',
        height: '70%'
    },
    imgContainer: {
        width: '100%',
        height: height * 0.23,
        marginBottom: 10,
        borderRadius: 2,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    iconBack: {
        width: 40,
        height: 40,
        position: 'absolute',
        top: height * 0.05,
        left: 20,
        zIndex: 10
    },
    iconMap: {
        width: 40,
        height: 40,
        position: 'absolute',
        top: height * 0.05,
        right: 20,
        zIndex: 10
    },
    textContainer: {
        width: '100%',
        padding: 12,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: ('rgba(39, 116, 241, 0.3)'),
        borderRadius: 12,
        marginBottom: height * 0.03,
        zIndex: 10
    },
    text: {
        fontSize: 20,
        color: '#e4cd88',
        fontWeight: '600'
    }
});

export default Museum;
