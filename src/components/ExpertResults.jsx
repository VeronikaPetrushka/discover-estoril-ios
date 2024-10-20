import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Svg, G, Text as SvgText, Path } from 'react-native-svg';

const { height, width } = Dimensions.get('window');

const ExpertResults = ({onGoBack}) => {
    const [maxScores, setMaxScores] = useState(Array(10).fill(0));

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const storedResults = await AsyncStorage.getItem('expertResults');
                const parsedResults = storedResults ? JSON.parse(storedResults) : [];

                const scores = Array(10).fill(0);
                parsedResults.forEach(result => {
                    const level = parseInt(result.level, 10);
                    if (level >= 1 && level <= 10) {
                        scores[level - 1] = Math.max(scores[level - 1], result.score);
                    }
                });
                setMaxScores(scores);
            } catch (error) {
                console.error('Error fetching expert results:', error);
            }
        };

        fetchResults();
    }, []);

    const radius = height * 0.17;
    const centerX = width * 0.47;
    const centerY = height * 0.215;

    const generateValidColor = () => {
        let color;
        do {
            color = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
        } while (!/^#[0-9A-F]{6}$/i.test(color));
        return color;
    };    

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Expert Results</Text>
            <Svg width={width * 0.94} height={height * 0.41}>
                <G rotation={-90} origin={`${centerX}, ${centerY}`}>
                    {Array.from({ length: 10 }).map((_, index) => {
                        const startAngle = (index * 36) * (Math.PI / 180);
                        const endAngle = ((index + 1) * 36) * (Math.PI / 180);
                        
                        const largeArcFlag = endAngle - startAngle <= Math.PI ? 0 : 1;

                        const startX = centerX + radius * Math.cos(startAngle);
                        const startY = centerY + radius * Math.sin(startAngle);
                        const endX = centerX + radius * Math.cos(endAngle);
                        const endY = centerY + radius * Math.sin(endAngle);

                        const levelScore = maxScores[index];
                        const percentage = levelScore * 10;

                        return (
                            <G key={index}>
                                <Path
                                    d={`M${centerX},${centerY} L${startX},${startY} A${radius},${radius} 0 ${largeArcFlag} 1 ${endX},${endY} Z`}
                                    fill={generateValidColor()}
                                    stroke="#fff"
                                    strokeWidth="1"
                                />
                                <SvgText
                                    x={centerX + (radius / 1.5) * Math.cos((startAngle + endAngle) / 2)}
                                    y={centerY + (radius / 1.5) * Math.sin((startAngle + endAngle) / 2)}
                                    fill="#fff"
                                    fontSize="14"
                                    fontWeight='600'
                                    textAnchor="middle"
                                    transform={`rotate(90 ${centerX + (radius / 1.5) * Math.cos((startAngle + endAngle) / 2)}, ${centerY + (radius / 1.5) * Math.sin((startAngle + endAngle) / 2)})`}
                                >
                                    {percentage} %
                                </SvgText>
                                <SvgText
                                    x={centerX + (radius + 20) * Math.cos((startAngle + endAngle) / 2)}
                                    y={centerY + (radius + 20) * Math.sin((startAngle + endAngle) / 2)}
                                    fill="#fff"
                                    fontSize={height * 0.025}
                                    fontWeight='600'
                                    textAnchor="middle"
                                    transform={`rotate(90 ${centerX + (radius + 20) * Math.cos((startAngle + endAngle) / 2)}, ${centerY + (radius + 20) * Math.sin((startAngle + endAngle) / 2)})`}
                                >
                                    {index + 1}
                                </SvgText>
                            </G>
                        );
                    })}
                </G>
            </Svg>
            <TouchableOpacity style={styles.goBackButton} onPress={onGoBack}>
                <Text style={styles.goBackButtonText}>Go back</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 28,
        marginBottom: height * 0.02,
        marginTop: height * -0.07,
        color: '#e2d6b1',
        fontWeight: '700'
    },
    goBackButton: {
        marginTop: height * 0.02
    },
    goBackButtonText: {
        fontSize: 18,
        color: 'white'
    }
});

export default ExpertResults;
