import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icons from './Icons';

const LeadersBoard = () => {
    const navigation = useNavigation();
    const [randomUsers, setRandomUsers] = useState([]);
    const [totalScore, setTotalScore] = useState(0);

    const generateRandomUsers = () => {
        const firstNames = ['Ethan', 'Isabella', 'Alexander', 'Mia', 'Benjamin', 'Chloe', 'Elijah'];
        const lastNames = ['Anderson', 'Martinez', 'Taylor', 'White', 'Moore', 'Thomas', 'Jackson'];
            
        const users = [];
        for (let i = 1; i <= 7; i++) {
            const randomScore = Math.floor(Math.random() * 9001) + 1000;
            const correctAnswers = Math.floor(Math.random() * 100) + 1;
    
            const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
            const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    
            users.push({
                id: i.toString(),
                username: `${firstName} ${lastName}`,
                score: randomScore,
                correctAnswers,
            });
        }
        setRandomUsers(users);
    };
    

    const loadTotalScore = async () => {
        try {
            const storedScore = await AsyncStorage.getItem('totalScore');
            if (storedScore !== null) {
                setTotalScore(parseInt(storedScore));
            }
        } catch (e) {
            console.error('Failed to load total score from storage.');
        }
    };

    useEffect(() => {
        generateRandomUsers();
        loadTotalScore();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.userRow}>
            <Text style={styles.username}>{item.username}</Text>
            <View style={{width: '100%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
            <Text style={styles.score}>Score: {item.score}</Text>
            </View>
        </View>
    );

    return (
        <ImageBackground
        source={require('../assets/background/home.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
        <View style={styles.container}>
            <TouchableOpacity style={styles.backIcon} onPress={() => navigation.navigate('HomeScreen')}>
                <Icons type={'back'}/>
            </TouchableOpacity>
            <Text style={styles.header}>LeadersBoard</Text>
            <Text style={styles.totalScore}>Your Total Score: {totalScore}</Text>
            <FlatList
                data={randomUsers}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
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
        padding: 20,
        paddingTop: 70,
        paddingBottom: 140,
    },
    backIcon: {
        width: 40,
        height: 40,
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 10
    },
    header: {
        fontSize: 34,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#e2d6b1'
    },
    totalScore: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#e2d6b1'
    },
    userRow: {
        width: 330,
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginVertical: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    username: {
        fontSize: 18,
        fontWeight: '500',
        color: '#6b603e',
        marginBottom: 12
    },
    score: {
        fontSize: 17,
        color: '#6b603e'
    },
    correctAnswers: {
        fontSize: 17,
        color: '#6b603e'
    },
});

export default LeadersBoard;
