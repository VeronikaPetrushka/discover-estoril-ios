import React, { useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ImageBackground, Dimensions, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAvailability } from '../constants/context/collection.js';
import collection from '../constants/collection.js';
import Icons from './Icons.jsx';

const { height, width } = Dimensions.get('window');

const MuseumFacts = ({ museum, description, famous, factName, fact, facts, images, reward }) => {
    const navigation = useNavigation();

    const { available, setAvailable } = useAvailability(); 

    const [pageIndex, setPageIndex] = useState(0);
    const [walkingIcon, setWalkingIcon] = useState('walking-1');
    const [isAnimating, setIsAnimating] = useState(false);

    const walkPosition = useRef(new Animated.Value(0)).current;

    const totalPages = 6;

    const handlePageChange = (direction) => {
        if (isAnimating) return;

        setIsAnimating(true);
        let animationFrame = 0;

        const endPosition = direction === 'next' ? width * 0.56 : -width * 0.1;

        const iconInterval = setInterval(() => {
            setWalkingIcon(prevIcon => (prevIcon === 'walking-1' ? 'walking-2' : 'walking-1'));
            animationFrame++;

            if (animationFrame >= 4) {
                clearInterval(iconInterval);
                setIsAnimating(false);

                if (direction === 'next' && pageIndex < totalPages - 1) {
                    setPageIndex(pageIndex + 1);
                    if (pageIndex === 4) {
                        const markIndex = collection.findIndex(item => item.mark === reward.mark);
                        const newAvailable = [...available];
                        if (markIndex !== -1) {
                            newAvailable[markIndex] = true;
                            setAvailable(newAvailable);
                        }
                    }
                } else if (direction === 'prev' && pageIndex > 0) {
                    setPageIndex(pageIndex - 1);
                }
            }
        }, 150);

        Animated.timing(walkPosition, {
            toValue: endPosition,
            duration: 1000,
            useNativeDriver: false,
        }).start(() => {
            walkPosition.setValue(0);
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
            <Text style={styles.title}>{museum}</Text>
            <View style={styles.page}>
            {pageIndex === 0 && (
                <ScrollView contentContainerStyle={styles.imagesContainer}>
                    {images.map((image, index) => (
                        <View key={index} style={styles.imgContainer}>
                            <Image source={image} style={styles.image} />
                        </View>
                    ))}
                </ScrollView>
            )}

            {pageIndex === 1 && 
            <View style={{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'flex-start'}}>
                <Text style={styles.pageTitle}>Description</Text>
                <Text style={styles.text}>{description}</Text>
            </View>
            }

            {pageIndex === 2 && 
            <View style={{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'flex-start'}}>
                <Text style={styles.pageTitle}>Famous For</Text>
                <Text style={styles.text}>{famous}</Text>
            </View>
            }
            
            {pageIndex === 3 && 
            <View style={{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'flex-start'}}>
                <Text style={styles.pageTitle}>{factName}</Text>
                <Text style={styles.text}>{fact}</Text>
            </View>
            }

            {pageIndex === 4 && 
            <View style={{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'flex-start'}}>
                <Text style={styles.pageTitle}>Fun Facts</Text>
                <ScrollView contentContainerStyle={styles.factsContainer}>
                    {facts.map((factItem, index) => (
                        <Text key={index} style={styles.text}>{factItem}</Text>
                    ))}
                </ScrollView>
            </View>
            }

            {pageIndex === 5 && 
            <View style={{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'flex-start'}}>
                <ScrollView contentContainerStyle={styles.factsContainer}>
                    <Text style={styles.pageTitle}>Congratulations !</Text>
                    <Text style={styles.text}>{reward.description}</Text>
                    <View style={styles.markContainer}>
                        <Image source={reward.mark} style={styles.mark} />
                    </View>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('CollectionScreen')}>
                            <Text style={styles.btnText}>View Collection</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('MuseumScreen')}>
                            <Text style={styles.btnText}>Continue Exploring</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
            }

            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                            style={styles.doorIcon} 
                            onPress={() => handlePageChange('prev')}
                            disabled={pageIndex === 0 || isAnimating}
                        >
                            <Icons type="door" />
                        </TouchableOpacity>
                        <View style={{width: '70%'}}>
                        <Animated.View style={[styles.walkingIcon, { left: walkPosition }]}>
                            <Icons type={walkingIcon} />
                        </Animated.View>
                        </View>
                        <TouchableOpacity 
                            style={styles.doorIcon} 
                            onPress={() => handlePageChange('next')}
                            disabled={pageIndex === totalPages - 1 || isAnimating}
                        >
                            <Icons type="door" />
                        </TouchableOpacity>
            </View>
        </View>
        </View>
        </ImageBackground>
    );
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
        flex: 1,
        justifyContent: 'start',
        alignItems: 'center',
        padding: 20,
        paddingTop: height * 0.07
    },
    title: {
        fontSize: 34,
        fontWeight: 'bold',
        color: '#e2d6b1',
        marginBottom: 20,
    },
    page: {
        width: width * 0.9,
        height: height * 0.6,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    pageTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#6b603e',
        marginBottom: 10
    },
    imagesContainer: {
        alignItems: 'center',
        width: '100%',
    },
    imgContainer: {
        width: width * 0.82,
        height: height * 0.23,
        marginBottom: 10,
        borderRadius: 10,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    markContainer: {
        width: width * 0.82,
        height: height * 0.21,
        marginBottom: 10,
        borderRadius: 10,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center'
    },
    mark: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    text: {
        fontSize: 18,
        textAlign: 'center',
        marginVertical: 20,
        color: '#6b603e'
    },
    factsContainer: {
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-around'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10
    },
    btnContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    btn: {
        width: '49%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#6b603e',
        marginTop: 10,
    },
    btnText: {
        fontSize: 14,
        color: 'white',
        fontWeight: '500',
    },
    doorIcon: {
        width: 60,
        height: 60
    },
    walkingIcon: {
        width: 60,
        height: 60
    }
});

export default MuseumFacts;
