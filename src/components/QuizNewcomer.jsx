import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import StoreModal from './QuizStoreModal';
import StoryModal from './StoryModal';
import Icons from './Icons';

const QuizNewcomer = ({ topic, level, questions, storyName, story }) => {
    const navigation = useNavigation();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [totalScore, setTotalScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [selectedOption, setSelectedOption] = useState(null);
    const [placedOption, setPlacedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [quizFinished, setQuizFinished] = useState(false);
    const [storeModalVisible, setStoreModalVisible] = useState(false);
    const [incorrectOptions, setIncorrectOptions] = useState([]);
    const [hintUsed, setHintUsed] = useState(false);
    const [availableHints, setAvailableHints] = useState(3);
    const [totalHints, setTotalHints] = useState(0);
    const [storyModalVisible, setStoryModalVisible] = useState(false);
    const placeholderRef = useRef(null);

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

    const currentQuestion = questions[currentQuestionIndex];

    const handleOptionPress = (index) => {
        if (placedOption === null) {
            setSelectedOption(index);
        }
    };

    const handlePlaceholderPress = () => {
        if (selectedOption !== null) {
            const wasCorrect = currentQuestion.options[selectedOption] === currentQuestion.correctAnswer;
            setIsCorrect(wasCorrect);
            setPlacedOption(selectedOption);

            if (wasCorrect) {
                setScore(score + 1);
                setTimeout(() => {
                    if (currentQuestionIndex < questions.length - 1) {
                        setCurrentQuestionIndex(currentQuestionIndex + 1);
                        setIsCorrect(null);
                        setSelectedOption(null);
                        setPlacedOption(null);
                        setHintUsed(false);
                    } else {
                        finishQuiz(score + 1);
                    }
                }, 1000);
            } else {
                setLives(lives - 1);
                if (lives - 1 === 0) {
                    finishQuiz(score);
                    return;
                }
                setTimeout(() => {
                    setIsCorrect(null);
                    setSelectedOption(null);
                    setPlacedOption(null);
                }, 1000);
            }
        }
    };

    const handleStoreModalClose = () => {
        setStoreModalVisible(false);
    };

    const handleStoryModalClose = () => {
        setStoryModalVisible(false);
    };

    const handleUseHint = () => {
        if (!hintUsed && availableHints > 0) {
            const currentQuestion = questions[currentQuestionIndex];
            const incorrectAnswers = currentQuestion.options.filter((option) => option !== currentQuestion.correctAnswer);
            const optionsToHide = incorrectAnswers.sort(() => Math.random() - 0.5).slice(0, 2);
            setIncorrectOptions(optionsToHide);
            setHintUsed(true);
            setAvailableHints(availableHints - 1);
        }
    };

    const handleUseLife = () => {
        if(lives <= 3){
            setLives(prevLives => prevLives + 1);
        }
    }

    const finishQuiz = async (finalScore) => {
        const updatedTotalScore = totalScore + finalScore;
        setTotalScore(updatedTotalScore);
        await AsyncStorage.setItem('totalScore', updatedTotalScore.toString());
        setQuizFinished(true);
    };

    const handleTryAgain = () => {
        setScore(0);
        setLives(3);
        setCurrentQuestionIndex(0);
        setSelectedOption(null);
        setPlacedOption(null);
        setIsCorrect(null);
        setIncorrectOptions([]);
        setHintUsed(false);
        setAvailableHints(3);
        setQuizFinished(false);
    };

    if (quizFinished) {
        return (
            <View style={styles.container}>
                <Text style={styles.finalText}>Quiz Finished!</Text>
                <Text style={styles.finalText}>Your Score: {score}/{questions.length}</Text>
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
                onClose={handleStoryModalClose}
                storyName={storyName}
                story={story}
                />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.topic}>Level {level}</Text>
            <Text style={styles.topic}>{topic}</Text>
            <Text style={styles.question}>{currentQuestion.question}</Text>
            <Text style={styles.score}>Score: {score}</Text>

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

            <TouchableOpacity
                style={[
                    styles.placeholder,
                    isCorrect === true ? styles.placeholderCorrect : 
                    isCorrect === false ? styles.placeholderIncorrect : {}
                ]}
                ref={placeholderRef}
                onPress={handlePlaceholderPress}
            >
                {placedOption !== null ? (
                    <Text style={styles.placedOptionText}>{currentQuestion.options[placedOption]}</Text>
                ) : (
                    <Text style={styles.placeholderText}>Drop Here</Text>
                )}
            </TouchableOpacity>

            <View style={styles.optionsContainer}>
                {currentQuestion.options.map((option, index) => {
                    if (incorrectOptions.includes(option) || index === placedOption) return null;
                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handleOptionPress(index)}
                            style={[
                                styles.option,
                                selectedOption === index ? { backgroundColor: 'lightblue' } : { backgroundColor: 'yellow' }
                            ]}
                        >
                            <Text style={styles.optionText}>{option}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>

            <TouchableOpacity style={styles.storeIcon} onPress={() => setStoreModalVisible(true)}>
                <Icons type={'store'}/>
            </TouchableOpacity>

            <StoreModal 
                visible={storeModalVisible} 
                onClose={handleStoreModalClose} 
                onUseHint={handleUseHint} 
                hintUsed={hintUsed}
                availableHints={availableHints}
                onUseLife={handleUseLife}
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
    question: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center'
    },
    score: {
        fontSize: 18,
        color: 'green',
        marginBottom: 10,
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
    placeholder: {
        width: '90%',
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
    placedOptionText: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
    optionsContainer: {
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
    },
    option: {
        width: 260,
        height: 50,
        padding: 15,
        marginVertical: 5,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionText: {
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
    }
});

export default QuizNewcomer;
