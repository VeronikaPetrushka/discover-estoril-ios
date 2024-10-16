import React, { useEffect, useState } from 'react';
import { SafeAreaView, TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Icons from './Icons';

const MenuPanel = () => {
    const navigation = useNavigation();
    const [activeButton, setActiveButton] = useState('HomeScreen');

    const handleNavigate = (screen) => {
        setActiveButton(screen);
        navigation.navigate(screen);
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const currentRoute = navigation.getState().routes[navigation.getState().index].name;
            setActiveButton(currentRoute);
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.btnContainer}>
                <TouchableOpacity 
                    style={[styles.button, activeButton === 'HomeScreen' && styles.activeButton]} 
                    onPress={() => handleNavigate('HomeScreen')}>
                    <Icons type={'home'} />
                </TouchableOpacity>
                <Text style={styles.btnTxt}>Home</Text>
            </View>

            <View style={styles.btnContainer}>
                <TouchableOpacity 
                    style={[styles.button, activeButton === 'SettingsScreen' && styles.activeButton]} 
                    onPress={() => handleNavigate('SettingsScreen')}>
                    <Icons type={'settings'} />
                </TouchableOpacity>
                <Text style={styles.btnTxt}>Settings</Text>
            </View>

            <View style={styles.btnContainer}>
                <TouchableOpacity 
                    style={[styles.button, activeButton === 'MuseumScreen' && styles.activeButton]} 
                    onPress={() => handleNavigate('MuseumScreen')}>
                    <Icons type={'museum'} />
                </TouchableOpacity>
                <Text style={styles.btnTxt}>Museum</Text>
            </View>

            <View style={styles.btnContainer}>
                <TouchableOpacity 
                    style={[styles.button, activeButton === 'QuizModeScreen' && styles.activeButton]} 
                    onPress={() => handleNavigate('QuizModeScreen')}>
                    <Icons type={'quiz'} />
                </TouchableOpacity>
                <Text style={styles.btnTxt}>Quiz</Text>
            </View>

            <View style={styles.btnContainer}>
                <TouchableOpacity 
                    style={[styles.button, activeButton === 'LeadersBoardScreen' && styles.activeButton]} 
                    onPress={() => handleNavigate('LeadersBoardScreen')}>
                    <Icons type={'leaderboard'} />
                </TouchableOpacity>
                <Text style={styles.btnTxt}>Leaders</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 100,
        justifyContent: "space-around",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 10,
        flexDirection: 'row',
        backgroundColor: ('rgba(249, 229, 179, 0.3)'),
        alignSelf: "center",
    },
    btnContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: 45,
        height: 45,
        padding: 3
    },
    activeButton: {
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    btnTxt: {
        color: '#e4cd88',
        fontSize: 13,
        marginTop: 5
    }
});

export default MenuPanel;
