import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ExpertStore from './ExpertStore';
import StoryModal from './StoryModal';
import Icons from './Icons';
import { shuffle } from '../constants/expert';

const { height } = Dimensions.get('window');

const QuizExpert = ({ level, question, events, years, answers, storyName, story }) => {
    const navigation = useNavigation();
    const [score, setScore] = useState(0);
    const [totalScore, setTotalScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [placedYears, setPlacedYears] = useState(Array(events.length).fill(null));
    const [correctlyPlaced, setCorrectlyPlaced] = useState(Array(events.length).fill(false));
    const [quizFinished, setQuizFinished] = useState(false);
    const [storeModalVisible, setStoreModalVisible] = useState(false);
    const [storyModalVisible, setStoryModalVisible] = useState(false);
    const [shuffledYears, setShuffledYears] = useState([]);
    const [availableYears, setAvailableYears] = useState([]);
    const [selectedYear, setSelectedYear] = useState(null);
    const [availableHints, setAvailableHints] = useState(3);
    const [totalHints, setTotalHints] = useState(0);

    useEffect(() => {
        const loadScores = async () => {
            const storedScore = await AsyncStorage.getItem('totalScore');
            if (storedScore) {
                setTotalScore(parseInt(storedScore, 10));
            }
            const storedHints = await AsyncStorage.getItem('totalHints');
            if (storedHints) {
                setTotalHints(parseInt(storedHints, 10));
                setAvailableHints(3);
            }
        };
    
        loadScores();
    }, []);    

    useEffect(() => {
        if (years && years.length) {
            setShuffledYears(shuffle(years));
            setAvailableYears(years);
        }
    }, [years]);

    const handleYearPress = (year) => {
        setSelectedYear(year);
    };

    const handlePlaceholderPress = (index) => {
        const updatedPlacedYears = [...placedYears];
        const correctAnswer = answers[index];
        const eventYear = correctAnswer.year;

        if (selectedYear) {
            updatedPlacedYears[index] = selectedYear;

            setAvailableYears((prev) => prev.filter((yr) => yr !== selectedYear));

            if (selectedYear === eventYear) {
                setCorrectlyPlaced((prev) => {
                    const newCorrectlyPlaced = [...prev];
                    newCorrectlyPlaced[index] = true;
                    return newCorrectlyPlaced;
                });
                setScore(score + 10);
            } else {
                setLives(lives - 1);
                if (lives - 1 === 0) {
                    setTimeout(() => {
                        finishQuiz(score);
                    }, 1000);
                    return;
                }

                setTimeout(() => {
                    const resetYears = updatedPlacedYears.map((yr, idx) => (yr === selectedYear ? null : yr));
                    setPlacedYears(resetYears);
                    setAvailableYears((prev) => [...prev, selectedYear]);
                }, 1000);
            }

            setPlacedYears(updatedPlacedYears);
            setSelectedYear(null);

            if (updatedPlacedYears.every((year, idx) => year === answers[idx].year)) {
                finishQuiz();
            }
        }
    };

    const handleUseHint = () => {
        if (availableHints > 0) {
            const availableIndices = placedYears
                .map((year, index) => (year === null ? index : null))
                .filter(index => index !== null);
    
            if (availableIndices.length > 0) {
                const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
                const correctAnswer = answers[randomIndex].year;
    
                const updatedPlacedYears = [...placedYears];
                updatedPlacedYears[randomIndex] = correctAnswer;
    
                setPlacedYears(updatedPlacedYears);
                setAvailableYears((prev) => prev.filter((year) => year !== correctAnswer));
    
                setCorrectlyPlaced((prev) => {
                    const newCorrectlyPlaced = [...prev];
                    newCorrectlyPlaced[randomIndex] = true;
                    return newCorrectlyPlaced;
                });
    
                setAvailableHints(availableHints - 1);
            }
        }
    };
    

    const handleUseLife = () => {
        if(lives < 3){
            setLives(prevLives => prevLives + 1);
        }
    }

    const finishQuiz = async () => {
        const newTotalScore = totalScore + score;
        setTotalScore(newTotalScore);
    
        await AsyncStorage.setItem('totalScore', newTotalScore.toString());
    
        try {
            const storedResults = await AsyncStorage.getItem('expertResults');
            const results = storedResults ? JSON.parse(storedResults) : [];
    
            const newResult = { level, score: score };
            const updatedResults = [...results, newResult];
    
            await AsyncStorage.setItem('expertResults', JSON.stringify(updatedResults));
    
            console.log("Updated expert results:", updatedResults);
        } catch (error) {
            console.error("Error storing quiz results:", error);
        }
        
        setTimeout(() => {
            setQuizFinished(true);
        }, 1000);
    };

    const handleTryAgain = () => {
        setScore(0);
        setLives(3);
        setAvailableHints(3);
        setPlacedYears(Array(events.length).fill(null));
        setCorrectlyPlaced(Array(events.length).fill(false));
        setShuffledYears(shuffle(years));
        setAvailableYears(years);
        setQuizFinished(false);
    };

    if (quizFinished) {
        return (
            <ImageBackground
        source={require('../assets/background/home2.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
            <View style={styles.container}>
                <Text style={styles.finishTitle}>Quiz Finished!</Text>
                <View style={styles.finishScoreContainer}>
                    <View style={styles.scoreIcon}>
                        <Icons type={'coin'}/>
                    </View>
                    <Text style={styles.finishScore}>{totalScore}</Text>
                </View>
                <Text style={styles.finalScore}>Here is your final score: {score} !</Text>
                <Text style={styles.finishText}>You have successfully completed the level {level} of the quiz!
                    Your knowledge of this charming area is just beginning to unfold!
                    Keep exploring and discovering new interesting facts about Estoril!
                </Text>
                <TouchableOpacity style={styles.readStoryButton} onPress={() => setStoryModalVisible(true)}>
                    <Text style={styles.tryAgainText}>Read the story</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tryAgainButton} onPress={handleTryAgain}>
                    <Text style={styles.tryAgainText}>Try Again</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.goBackText}>Go Back</Text>
                </TouchableOpacity>

                <StoryModal 
                    visible={storyModalVisible}
                    onClose={() => setStoryModalVisible(false)}
                    storyName={storyName}
                    story={story}
                />
            </View>
        </ImageBackground>
        );
    }

    return (
        <ImageBackground
        source={require('../assets/background/home2.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.container}>
            <Text style={styles.topic}>Level {level}</Text>
            <Text style={styles.task}>{question}</Text>

            <View style={styles.scoreContainer}>
                <View style={styles.scoreIcon}>
                    <Icons type={'coin'}/>
                </View>
                <Text style={styles.scoreText}>{score}</Text>
            </View>

            <View style={styles.statsContainer}>
            <View style={styles.livesContainer}>
                {[...Array(3)].map((_, index) => (
                    <View key={index} style={styles.lifeIcon}>
                    <Icons
                        type={index < lives ? 'life' : 'life-gone'}
                    />
                    </View>
                ))}
            </View>

            <View style={styles.livesContainer}>
                {[...Array(3)].map((_, index) => (
                    <View key={index} style={[styles.lifeIcon, { opacity: index < availableHints ? 1 : 0.5 } ]}>
                        <Icons type={'hint'} />
                    </View>
                ))}
            </View>

            </View>

            <View style={styles.contentContainer}>
                {/* Left Column: Events */}
                <View style={styles.eventsColumn}>
                    <ScrollView>
                    {events.map((event, index) => (
                        <View key={index} style={styles.eventOption}>
                            <Text style={styles.eventText}>{event}</Text>
                        </View>
                    ))}
                    </ScrollView>
                </View>

                {/* Middle Column: Placeholders */}
                <View style={styles.placeholdersColumn}>
                    {events.map((_, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => !correctlyPlaced[index] && handlePlaceholderPress(index)}
                            style={[
                                styles.placeholder,
                                correctlyPlaced[index] ? styles.placeholderCorrect : 
                                (placedYears[index] !== null ? styles.placeholderIncorrect : {})
                            ]}
                            disabled={correctlyPlaced[index]}
                        >
                            <Text style={styles.placeholderText}>
                                {placedYears[index] !== null ? placedYears[index] : 'Drop Here'}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Right Column: Shuffled Years */}
                <View style={styles.yearsColumn}>
                    {shuffledYears.map((year, index) => (
                        availableYears.includes(year) && (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handleYearPress(year)}
                            style={[styles.yearOption, selectedYear === year && {backgroundColor: '#6b603e'}]}
                        >
                            <Text style={styles.yearText}>{year}</Text>
                        </TouchableOpacity>
                        )
                    ))}
                </View>
            </View>

            <TouchableOpacity style={styles.storeIcon} onPress={() => setStoreModalVisible(true)}>
                <Icons type={'store'}/>
            </TouchableOpacity>

            <ExpertStore 
                visible={storeModalVisible} 
                onClose={() => setStoreModalVisible(false)} 
                onUseHint={handleUseHint}
                onUseLife={handleUseLife}
                availableHints={availableHints}
                lives={lives}
            />
        </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: height * 0.08,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
      },
    topic: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: 'white'
    },
    task: {
        fontSize: 21,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: 'white'
    },
    statsContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30
    },
    contentContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        height: '64%'
    },
    eventsColumn: {
        flex: 1,
        paddingRight: 10,
    },
    placeholdersColumn: {
        flex: 1,
        paddingRight: 10,
    },
    yearsColumn: {
        flex: 1,
    },
    eventOption: {
        width: '100%',
        backgroundColor: '#4bae94',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
        borderRadius: 5,
        padding: 7
    },
    eventText: {
        fontSize: 16,
        marginBottom: 10,
        color: 'white'
    },
    placeholder: {
        width: '100%',
        height: 60,
        borderColor: '#f9a500',
        borderWidth: 2,
        borderRadius: 5,
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: 'transparent',
    },
    placeholderCorrect: {
        backgroundColor: '#4a8c2e',
    },
    placeholderIncorrect: {
        backgroundColor: '#d60000',
    },
    placeholderText: {
        fontSize: 16,
        color: '#f9a500',
        fontWeight: '500'
    },
    yearOption: {
        width: '100%',
        height: 50,
        backgroundColor: '#cab562',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
        borderRadius: 5,
    },
    yearText: {
        fontSize: 16,
        color: 'white'
    },
    finishTitle: {
        color: '#e2d6b1',
        fontSize: 34,
        fontWeight: '900',
        marginTop: height * 0.03
    },
    finishScoreContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 15,
        borderRadius: 10,
        marginVertical: height * 0.03
    },
    finishScore: {
        color: '#a39361',
        fontSize: 24,
        fontWeight: '700'
    },
    finalScore: {
        color: '#e2d6b1',
        fontSize: 24,
        fontWeight: '700',
        marginBottom: height * 0.035
    },
    finishText: {
        fontSize: height * 0.026,
        fontWeight: '600',
        marginBottom: height * 0.12,
        textAlign: 'center',
        color: '#fff',
    },
    readStoryButton: {
        backgroundColor: '#a39361',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tryAgainButton: {
        backgroundColor: '#bf9000',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tryAgainText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '700',
    },
    goBackButton: {
        backgroundColor: 'gray',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    goBackText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    storeIcon: {
        width: 50,
        height: 50,
        position: 'absolute',
        top: height * 0.06,
        right: 25
    },
    livesContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    lifeIcon: {
        width: 30,
        height: 30,
        marginRight: 5
    },
    scoreContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    scoreIcon: {
        width: 45,
        height: 45,
        marginRight: 5
    },
    scoreText: {
        fontSize: 22,
        fontWeight: '600',
        color: 'white'
    }
});

export default QuizExpert;
