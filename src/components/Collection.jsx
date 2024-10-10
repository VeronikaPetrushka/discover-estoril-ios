import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, View, ScrollView, Text, TouchableOpacity, ImageBackground, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAvailability } from '../constants/context/collection.js';
import collection from '../constants/collection.js';
import Icons from './Icons';

const Collection = () => {
    const navigation = useNavigation();
    const { available, setAvailable } = useAvailability();
    const [modalVisible, setModalVisible] = useState(false);
    const [bonusMark, setBonusMark] = useState(null);

    useEffect(() => {
        const availableCount = available.filter(mark => mark).length;
        if (availableCount === 5 && !available[5]) {
            unlockBonusMark();
        }
    }, [available]);

    const unlockBonusMark = () => {
        const newAvailable = [...available];
        newAvailable[5] = true;
        setAvailable(newAvailable);
        setBonusMark(collection[5].mark);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
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
        <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleCloseModal}
            >
                <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>Congratulations!</Text>
                    <Text style={styles.modalText}>You have unlocked 5 marks!</Text>
                    <Text style={styles.modalText}>Here is your bonus mark:</Text>
                    {bonusMark && <Image source={bonusMark} style={styles.bonusMark} />}
                    <TouchableOpacity style={styles.modalButton} onPress={handleCloseModal}>
                        <Icons type={'close'}/>
                    </TouchableOpacity>
                </View>
                </View>
            </Modal>
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
        resizeMode: 'contain',
    },
    locked: {
        ...StyleSheet.absoluteFillObject,
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
    },
    modalView: {
        position: 'absolute',
        top: '27%',
        left: 19,
        width: '90%',
        height: '40%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#6b603e'
    },
    modalText: {
        marginBottom: 10,
        textAlign: 'center',
        color: '#6b603e',
        fontSize: 18
    },
    bonusMark: {
        width: 250,
        height: 190,
        resizeMode: 'contain',
        marginBottom: 15,
    },
    modalButton: {
        padding: 10,
        width: 42,
        height: 42,
        position: 'absolute',
        top: 10,
        right: 10,
    }
});

export default Collection;
