import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet, ScrollView, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAvailability } from '../constants/context/collection.js';
import collection from '../constants/collection.js';

const { height, width } = Dimensions.get('window');

const MuseumFacts = ({ museum, description, famous, factName, fact, facts, images, reward }) => {
    const navigation = useNavigation();

    const { available, setAvailable } = useAvailability(); 

    const [pageIndex, setPageIndex] = useState(0);

    const totalPages = 6;

    const handleNextPage = () => {
        if (pageIndex < totalPages - 1) {
            setPageIndex(pageIndex + 1);
            if (pageIndex === 4) {
                const markIndex = collection.findIndex(item => item.mark === reward.mark);
                const newAvailable = [...available];
                if (markIndex !== -1) {
                    newAvailable[markIndex] = true;
                    setAvailable(newAvailable);
                }
            }
        }
    };

    const handlePrevPage = () => {
        if (pageIndex > 0) setPageIndex(pageIndex - 1);
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
                        <TouchableOpacity style={styles.btn}>
                            <Text style={styles.btnText}>Continue Exploring</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
            }

            </View>
            <View style={styles.buttonContainer}>
                <Button title="Previous" onPress={handlePrevPage} disabled={pageIndex === 0} />
                <Button title="Next" onPress={handleNextPage} disabled={pageIndex === totalPages - 1} />
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
        paddingTop: height * 0.09
    },
    title: {
        fontSize: 34,
        fontWeight: 'bold',
        color: '#e2d6b1',
        marginBottom: 30,
        width: 400
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
        width: '80%',
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
    }
});

export default MuseumFacts;
