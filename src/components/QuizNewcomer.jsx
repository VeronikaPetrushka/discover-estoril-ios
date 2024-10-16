import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import StoreModal from './QuizStoreModal';
import StoryModal from './StoryModal';
import Icons from './Icons';

const { height } = Dimensions.get('window');

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
                    setTimeout(() => {
                        finishQuiz(score);
                    }, 1000);
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

    const handleUse100Hint = () => {
        if (!hintUsed && availableHints > 0) {
            const currentQuestion = questions[currentQuestionIndex];
            const correctAnswer = currentQuestion.correctAnswer;
    
            const optionsToHide = currentQuestion.options.filter(option => option !== correctAnswer);
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
    
        try {
            const storedResults = await AsyncStorage.getItem('newcomerResults');
            const results = storedResults ? JSON.parse(storedResults) : [];
    
            const newResult = { level, score: finalScore };
            const updatedResults = [...results, newResult];
    
            await AsyncStorage.setItem('newcomerResults', JSON.stringify(updatedResults));
    
            console.log("Updated newcomer results:", updatedResults);
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
            <ImageBackground
        source={require('../assets/background/home2.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
            <View style={styles.container}>
            <Text style={styles.finishTitle}>Quiz Finished!</Text>
            <Text style={styles.finishTopic}>{topic}</Text>
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
                onClose={handleStoryModalClose}
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
            <Text style={styles.level}>Level {level}</Text>
            <View style={{
                width: '100%',
                padding: 10,
                paddingVertical: 15,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
                borderRadius: 10,
                marginBottom: 20,
            }}>
                <Text style={styles.topic}>{topic}</Text>
                <Text style={styles.question}>{currentQuestion.question}</Text>
            </View>

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
                                selectedOption === index ? { backgroundColor: '#6b603e' } : { backgroundColor: '#cab562' }
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
                onUse100Hint={handleUse100Hint}
                hintUsed={hintUsed}
                availableHints={availableHints}
                onUseLife={handleUseLife}
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
    level: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: 'white'
    },
    topic: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: '#6b603e'
    },
    finishTopic: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: '#fff'
    },
    question: {
        fontSize: 20,
        fontWeight: '500',
        textAlign: 'center',
        color: '#6b603e',
        textAlign: 'center'
    },
    statsContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30
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
    },
    livesContainer: {
        flexDirection: 'row',
    },
    lifeIcon: {
        width: 30,
        height: 30,
        marginRight: 5
    },
    placeholder: {
        width: '85%',
        height: 60,
        borderColor: '#f9a500',
        borderWidth: 2,
        borderRadius: 5,
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: height * 0.08,
        backgroundColor: 'transparent',
    },
    placeholderCorrect: {
        backgroundColor: '#4a8c2e',
    },
    placeholderIncorrect: {
        backgroundColor: '#d60000',
    },
    placeholderText: {
        fontSize: 18,
        color: '#f9a500',
        fontWeight: '600'
    },
    placedOptionText: {
        fontSize: 18,
        color: 'white',
        fontWeight: '600',
    },
    optionsContainer: {
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
    },
    option: {
        width: '85%',
        height: height * 0.06,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
        borderRadius: 5,
    },
    optionText: {
        fontSize: 18,
        color: 'white',
        fontWeight: '600'
    },
    finishTitle: {
        color: '#e2d6b1',
        fontSize: 34,
        fontWeight: '900',
        marginTop: height * 0.03,
        marginBottom: height * 0.03,
    },
    finishScoreContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 15,
        borderRadius: 10,
        marginBottom: height * 0.03
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
        marginBottom: height * 0.09,
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
        top: height * 0.055,
        right: 25
    },
});

export default QuizNewcomer;
