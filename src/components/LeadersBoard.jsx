import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import NewcomerResults from './NewcomerResults';
import ExpertResults from './ExpertResults';
import Top10Users from './Top10Users';
import Icons from './Icons';

const LeadersBoard = () => {
    const navigation = useNavigation();
    const [totalScore, setTotalScore] = useState(0);
    const [newcomerResultsVisible, setNewcomerResultsVisible] = useState(false);
    const [expertResultsVisible, setExpertResultsVisible] = useState(false);
    const [top10Visible, setTop10Visible] = useState(false);

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
        loadTotalScore();
    }, []);

    const handleNewcomerResultsVisible = () => {
        setNewcomerResultsVisible(!newcomerResultsVisible);
    };

    const handleExpertResultsVisible = () => {
        setExpertResultsVisible(!expertResultsVisible);
    }

    const handleTop10Visible = () => {
        setTop10Visible(!top10Visible);
    }


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
            {
                newcomerResultsVisible && 
                    <NewcomerResults onGoBack={() => setNewcomerResultsVisible(false)} /> 
                    || 
                expertResultsVisible && 
                <ExpertResults onGoBack={() => setExpertResultsVisible(false)}/> 
                ||
                top10Visible &&
                <Top10Users onGoBack={() => setTop10Visible(false)}/>
                ||
                <View style={{width: '100%'}}>
                    <View style={styles.progressContainer}>
                <Text style={styles.progressText}>My progress</Text>
                <View style={styles.progressBtnContainer}>
                    <TouchableOpacity style={styles.progressBtn} onPress={() => handleNewcomerResultsVisible()}>
                        <Text style={styles.progressBtnText}>Newcomer</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.progressBtn} onPress={() => handleExpertResultsVisible()}>
                        <Text style={styles.progressBtnText}>Expert</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity style={styles.top10Btn} onPress={() => handleTop10Visible()}>
                <Text style={styles.progressBtnText}>Top 10</Text>
            </TouchableOpacity>
                </View>
            }
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
        width: '100%',
        height: '100%',
        padding: 10,
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
    progressContainer: {
        width: '100%',
        marginTop: 100,
        marginBottom: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    progressText: {
        fontSize: 28,
        fontWeight: '700',
        color: '#e2d6b1',
        textAlign: 'center',
        marginBottom: 30
    },
    progressBtnContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    progressBtn: {
        width: '49%',
        padding: 12,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#e4cd88',
        backgroundColor: ('rgba(39, 116, 241, 0.3)'),
        borderRadius: 12,
        marginBottom: 10,
        zIndex: 10
    },
    top10Btn: {
        width: '100%',
        padding: 12,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#e4cd88',
        backgroundColor: ('rgba(39, 116, 241, 0.3)'),
        borderRadius: 12,
        marginBottom: 10,
        zIndex: 10
    },
    progressBtnText: {
        fontSize: 20,
        color: '#e4cd88',
        fontWeight: '600'
    },
});

export default LeadersBoard;
