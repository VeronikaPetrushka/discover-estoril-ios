import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ExpertStore from './ExpertStore';
import StoryModal from './StoryModal';
import Icons from './Icons';
import { shuffle } from '../constants/expert';

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
        const loadTotalScore = async () => {
            const storedScore = await AsyncStorage.getItem('totalScore');
            if (storedScore) {
                setTotalScore(parseInt(storedScore, 10));
            }
            const loadTotalHints = async () => {
                const storedHints = await AsyncStorage.getItem('totalHints');
                if (storedHints) {
                    setTotalHints(parseInt(storedHints, 10));
                    setAvailableHints(3);
                }
            };
    
            loadTotalScore();
            loadTotalHints();
        };
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
                setLives((prevLives) => {
                    if (prevLives > 0) {
                        return prevLives - 1;
                    } else {
                        finishQuiz();
                        return prevLives;
                    }
                });

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
        setQuizFinished(true);
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
            <View style={styles.container}>
                <Text style={styles.finalText}>Quiz Finished!</Text>
                <Text style={styles.finalText}>Your Score: {score}</Text>
                <Text style={styles.finalText}>Total Score: {totalScore}</Text>
                <Text>You have successfully completed the level {level} of the quiz!
                    Your knowledge of this charming area is just beginning to unfold!
                    Keep exploring and discovering new interesting facts about Estoril!
                </Text>
                <TouchableOpacity style={styles.tryAgainButton} onPress={() => setStoryModalVisible(true)}>
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
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.topic}>Level {level}</Text>
            <Text style={styles.topic}>{question}</Text>
            <Text style={styles.topic}>{score}</Text>

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

            <View style={styles.contentContainer}>
                {/* Left Column: Events */}
                <View style={styles.eventsColumn}>
                    {events.map((event, index) => (
                        <Text key={index} style={styles.eventText}>{event}</Text>
                    ))}
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
                            style={styles.yearOption}
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
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 70,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    topic: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'
    },
    contentContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
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
        paddingLeft: 10,
    },
    eventText: {
        fontSize: 18,
        marginBottom: 10,
    },
    placeholder: {
        width: '100%',
        height: 60,
        borderColor: 'blue',
        borderWidth: 2,
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#f0f8ff',
    },
    placeholderCorrect: {
        backgroundColor: 'green',
    },
    placeholderIncorrect: {
        backgroundColor: 'red',
    },
    placeholderText: {
        fontSize: 16,
        color: 'blue',
    },
    yearOption: {
        width: '100%',
        height: 50,
        backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
        borderRadius: 5,
    },
    yearText: {
        fontSize: 16,
    },
    finalText: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    tryAgainButton: {
        backgroundColor: 'blue',
        padding: 15,
        borderRadius: 5,
        marginTop: 20,
    },
    tryAgainText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    goBackButton: {
        backgroundColor: 'gray',
        padding: 15,
        borderRadius: 5,
        marginTop: 20,
    },
    goBackText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    storeIcon: {
        width: 60,
        height: 60,
        alignSelf: 'center'
    },
    livesContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        width: '100%'
    },
    lifeIcon: {
        width: 30,
        height: 30,
        marginRight: 5
    },
});

export default QuizExpert;
