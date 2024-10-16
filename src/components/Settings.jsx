import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Share, Alert, Vibration, ImageBackground, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMusic } from '../constants/context/music.js';

const { height } = Dimensions.get('window');

const Settings = () => {
    const { isPlaying, togglePlay } = useMusic();
    const [totalBalance, setTotalBalance] = useState(0);
    const [showResetConfirmation, setShowResetConfirmation] = useState(false);
    const [vibrationEnabled, setVibrationEnabled] = useState(true);

    useEffect(() => {
        const loadSettings = async () => {
            try {
                const storedVibration = await AsyncStorage.getItem('vibrationEnabled');
                if (storedVibration !== null) {
                    setVibrationEnabled(JSON.parse(storedVibration));
                }
            } catch (error) {
                console.log('Error loading settings:', error);
            }
        };

        loadSettings();
        retrieveBalance();

    }, []);

    const retrieveBalance = async () => {
        try {
            const balance = await AsyncStorage.getItem('totalScore');
            if (balance !== null) {
                setTotalBalance(parseInt(balance, 10));
            }
        } catch (error) {
            console.log('Error retrieving balance:', error);
        }
    };

    const handleToggleLoudness = async () => {
        togglePlay();
    };

    const handleToggleVibration = async () => {
        const newVibrationState = !vibrationEnabled;
        setVibrationEnabled(newVibrationState);

        try {
            await AsyncStorage.setItem('vibrationEnabled', JSON.stringify(newVibrationState));
            if (newVibrationState) {
                Vibration.vibrate();
            }
        } catch (error) {
            console.log('Error saving vibration setting:', error);
        }
    };

    const handleShare = async () => {
        try {
            await Share.share({
                message: `Look! I have reached ${totalBalance} score in Estoril Discovery!`,
            });
        } catch (error) {
            console.log('Error sharing:', error);
        }
    };


    const handleReset = async () => {
        try {
            await AsyncStorage.setItem('userProfile', '');

            await AsyncStorage.removeItem('totalScore');
            await AsyncStorage.removeItem('totalHints');
            await AsyncStorage.removeItem('total100Hints');
            await AsyncStorage.removeItem('totalLives');
            await AsyncStorage.removeItem('newcomerResults');
            await AsyncStorage.removeItem('expertResults');
            await AsyncStorage.removeItem('savedStories');
            await AsyncStorage.removeItem('UserFolders');

            setTotalBalance(0);
            setShowResetConfirmation(false);

            Alert.alert('Progress Reset', 'Your progress has been reset successfully!', [
                { text: 'OK', onPress: () => console.log('OK Pressed') }
            ]);

            if (vibrationEnabled) {
                Vibration.vibrate();
            }
        } catch (error) {
            console.error('Error resetting progress:', error);
            Alert.alert('Error', 'There was a problem resetting your progress. Please try again later.');
        }
    };

    return (
        <ImageBackground
        source={require('../assets/background/home2.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
                <View style={styles.container}>
                    {showResetConfirmation ? (
                        <>
                            <Text style={styles.confirmationText}>
                                Are you sure you want to reset your progress? It will reset your account, score, mode results, purchased hints and lives, saved stories, and folders along with uploaded images !
                            </Text>
                            <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
                                <Text style={styles.btnText}>Reset</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.cancelReset} onPress={() => setShowResetConfirmation(false)}>
                                <Text style={styles.btnText}>Close</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <Text style={styles.title}>Settings</Text>

                            <View style={styles.regulatorContainer}>
                                <Text style={styles.regulatorText}>Loudness</Text>
                                <Text style={[styles.toggleText, isPlaying ? styles.toggleTextOn : styles.toggleTextOff]}>
                                    {isPlaying ? 'On' : 'Off'}
                                </Text>
                                <TouchableOpacity style={[styles.toggleContainer, isPlaying ? styles.toggleContainer : styles.toggleContainerOff]} onPress={handleToggleLoudness}>
                                    <View style={[styles.toggle, isPlaying ? styles.toggleOn : styles.toggleOff]}></View>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.regulatorContainer}>
                                <Text style={styles.regulatorText}>Vibration</Text>
                                <Text style={[styles.toggleText, vibrationEnabled ? styles.toggleTextOn : styles.toggleTextOff]}>
                                    {vibrationEnabled ? 'On' : 'Off'}
                                </Text>
                                <TouchableOpacity style={[styles.toggleContainer, vibrationEnabled ? styles.toggleContainer : styles.toggleContainerOff]} onPress={handleToggleVibration}>
                                    <View style={[styles.toggle, vibrationEnabled ? styles.toggleOn : styles.toggleOff]}></View>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity style={styles.shareBtn} onPress={handleShare}>
                                <Text style={styles.btnText}>Share</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.resetBtn} onPress={() => setShowResetConfirmation(true)}>
                                <Text style={styles.btnText}>Reset</Text>
                            </TouchableOpacity>
                        </>
                    )}
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
    container: {
        width: '100%',
        height: '100%',
        padding: 20,
        paddingTop: height * 0.08,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 34,
        textAlign: 'center',
        marginBottom: height * 0.11,
        color: '#e2d6b1',
    },
    regulatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-around',
        marginBottom: 15,
    },
    regulatorText: {
        fontSize: 22,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#f9a500'
    },
    toggleContainer: {
        padding: 7,
        width: 100,
        height: 50,
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#f9a500',
    },
    toggleContainerOff: {
        borderColor: '#ccc',
    },
    toggleText: {
        fontSize: 16,
    },
    toggleTextOn: {
        color: '#e2d6b1',
    },
    toggleTextOff: {
        color: '#ccc',
    },
    toggle: {
        borderRadius: 30,
        width: '45%',
        height: '100%',
    },
    toggleOn: {
        backgroundColor: '#f9a500',
        alignSelf: 'flex-end',
    },
    toggleOff: {
        backgroundColor: '#ccc',
        alignSelf: 'flex-start',
    },
    shareBtn: {
        width: '100%',
        backgroundColor: '#b9a76f',
        borderRadius: 15,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
        marginTop: height * 0.15,
    },
    btnText: {
        fontSize: 19,
        fontWeight: '500',
        color: 'white',
    },
    resetBtn: {
        width: '100%',
        backgroundColor: '#6b603e',
        borderRadius: 15,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    confirmationText: {
        fontSize: 20,
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: height * 0.1,
        marginTop: height * 0.15,
        color: '#e2d6b1'
    },
    cancelReset: {
        width: '100%',
        backgroundColor: '#b9a76f',
        borderRadius: 15,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    }
});

export default Settings;
