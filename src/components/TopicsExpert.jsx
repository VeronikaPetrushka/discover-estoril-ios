import React, { useState } from 'react'
import { TouchableOpacity, View, Text, StyleSheet, ImageBackground, ScrollView } from "react-native"
import { useNavigation } from '@react-navigation/native';
import expert from "../constants/expert.js"
import Icons from './Icons.jsx';

const TopicsExpert = () => {
    const navigation = useNavigation();
    const [selected, setSelected] = useState(false);

    const handlePress = (item, index) => {
        setSelected(index);
        navigation.navigate('QuizExpertScreen', { 
            level: item.level,
            question: item.question,
            events: item.events,
            years: item.years,
            answers: item.answers,
            storyName: item.storyName,
            story: item.story
        });
    };

    return (
        <ImageBackground
        source={require('../assets/background/home.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
        <View style={styles.container}>
            <TouchableOpacity  style={styles.iconBack} onPress={() => navigation.goBack()}>
                <Icons type={'back'}/>
            </TouchableOpacity>
        <Text style={styles.title}>Expert Levels:</Text>
            <ScrollView style={{width: '100%'}}>
            {
                expert.map((item, index) => (
                    <TouchableOpacity key={index} style={styles.btn} onPress={() => handlePress(item, index)}>
                        <Text style={styles.level}>Level {item.level}</Text>
                    </TouchableOpacity>
                ))
            }
            <View style={{height: 100}}></View>
            </ScrollView>
        </View>
        </View>
        </ImageBackground>
    )
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
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 20,
        paddingTop: 70
    },
    iconBack: {
        width: 40,
        height: 40,
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 10
    },
    title: {
        fontWeight: 'bold',
        fontSize: 34,
        textAlign: 'center',
        marginBottom: 30,
        color: '#e2d6b1',
    },
    btn: {
        padding: 12,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 300,
        borderWidth: 2,
        borderColor: '#e4cd88',
        backgroundColor: ('rgba(39, 116, 241, 0.3)'),
        borderRadius: 12,
        marginBottom: 10,
        zIndex: 10
    },
    level: {
        fontSize: 20,
        color: '#e4cd88',
        fontWeight: '600'
    }
})

export default TopicsExpert;