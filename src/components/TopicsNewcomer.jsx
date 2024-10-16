import React, { useState } from 'react'
import { TouchableOpacity, View, Text, StyleSheet, ImageBackground, ScrollView } from "react-native"
import { useNavigation } from '@react-navigation/native';
import newcomer from "../constants/newcomer.js"
import Icons from './Icons.jsx';

const TopicsNewcomer = () => {
    const navigation = useNavigation();
    const [selected, setSelected] = useState(false);

    const handlePress = (item, index) => {
        setSelected(index);
        navigation.navigate('QuizNewcomerScreen', { 
            topic: item.topic,
            level: item.level,
            questions: item.questions,
            storyName: item.storyName,
            story: item.story
        });
    };

    return (
        <ImageBackground
        source={require('../assets/background/home2.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.container}>
        <TouchableOpacity  style={styles.iconBack} onPress={() => navigation.goBack()}>
                <Icons type={'back'}/>
            </TouchableOpacity>
        <Text style={styles.title}>Newcomer Topics:</Text>
            <ScrollView style={{width: '100%'}}>
            {
                newcomer.map((item, index) => (
                    <TouchableOpacity key={index} style={styles.btn} onPress={() => handlePress(item, index)}>
                        <Text style={styles.topic}>{item.topic}</Text>
                    </TouchableOpacity>
                ))
            }
            <View style={{height: 100}}></View>
            </ScrollView>
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
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 20,
        paddingTop: 80
    },
    iconBack: {
        width: 40,
        height: 40,
        position: 'absolute',
        top: 40,
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
        width: '100%',
        borderWidth: 2,
        borderColor: '#f9a500',
        backgroundColor: ('rgba(249, 229, 179, 0.3)'),
        borderRadius: 12,
        marginBottom: 10,
        zIndex: 10
    },
    topic: {
        fontSize: 20,
        color: '#f9a500',
        fontWeight: '600'
    }
})

export default TopicsNewcomer;