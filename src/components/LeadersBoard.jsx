import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import NewcomerResults from './NewcomerResults';
import ExpertResults from './ExpertResults';
import Top10Users from './Top10Users';
import Icons from './Icons';

const { height } = Dimensions.get('window');

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
            <View style={styles.scoreContainer}>
                    <View style={styles.scoreIcon}>
                        <Icons type={'coin'}/>
                    </View>
                    <Text style={styles.scoreText}>{totalScore}</Text>
                </View>
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
        paddingTop: height * 0.08,
        paddingBottom: height * 0.12,
    },
    backIcon: {
        width: 40,
        height: 40,
        position: 'absolute',
        top: height * 0.055,
        left: 20,
        zIndex: 10
    },
    scoreContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 15,
        borderRadius: 10,
        marginBottom: 40,
        width: 200,
        alignSelf: 'center'
    },
    scoreIcon: {
        width: 45,
        height: 45,
        marginRight: 5
    },
    scoreText: {
        color: '#a39361',
        fontSize: 24,
        fontWeight: '700'
    },
    header: {
        fontSize: 34,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15,
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
        marginTop: height * 0.08,
        marginBottom: height * 0.04,
        alignItems: 'center',
        justifyContent: 'center'
    },
    progressText: {
        fontSize: 28,
        fontWeight: '700',
        color: '#e2d6b1',
        textAlign: 'center',
        marginBottom: height * 0.03
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
