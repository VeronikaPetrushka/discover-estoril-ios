import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const QuizNewcomer = ({ topic, level, questions }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [correctOptions, setCorrectOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [placedOption, setPlacedOption] = useState(null);
    const placeholderRef = useRef(null);

    const currentQuestion = questions[currentQuestionIndex];

    const handleOptionPress = (index) => {
        if (placedOption === null) {
            setSelectedOption(index);
        }
    };

    const handlePlaceholderPress = () => {
        if (selectedOption !== null) {
            const isCorrect = currentQuestion.options[selectedOption] === currentQuestion.correctAnswer;
            if (isCorrect) {
                setScore(score + 1);
                setCorrectOptions(prev => [...prev, true]);
            } else {
                setCorrectOptions(prev => [...prev, false]);
            }

            setPlacedOption(selectedOption);

            setTimeout(() => {
                if (currentQuestionIndex < questions.length - 1) {
                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                    setCorrectOptions([]);
                    setSelectedOption(null);
                    setPlacedOption(null);
                } else {
                    alert(`Quiz finished! Your score is ${score + 1}/${questions.length}`);
                }
            }, 1000);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.topic}>Level {level}</Text>
            <Text style={styles.topic}>{topic}</Text>
            <Text style={styles.question}>{currentQuestion.question}</Text>

            <TouchableOpacity
                style={[
                    styles.placeholder,
                    placedOption !== null ? (correctOptions[correctOptions.length - 1] ? styles.placeholderCorrect : styles.placeholderIncorrect) : {}
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
                    if (index === placedOption) return null;
                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handleOptionPress(index)}
                            style={[
                                styles.option,
                                correctOptions[index] === true ? { backgroundColor: 'green' } :
                                correctOptions[index] === false ? { backgroundColor: 'red' } :
                                { backgroundColor: selectedOption === index ? 'lightblue' : 'yellow' }
                            ]}
                        >
                            <Text style={styles.optionText}>{option}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
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
    },
    question: {
        fontSize: 18,
        marginBottom: 20,
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
});

export default QuizNewcomer;
