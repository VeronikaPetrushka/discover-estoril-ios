import React, { useState } from 'react'
import { TouchableOpacity, View, Text, StyleSheet, ImageBackground, ScrollView } from "react-native"
import { useNavigation } from '@react-navigation/native';
import newcomer from "../constants/newcomer.js"

const TopicsNewcomer = () => {
    const navigation = useNavigation();
    const [selected, setSelected] = useState(false);

    const handlePress = (item, index) => {
        setSelected(index);
        navigation.navigate('QuizNewcomerScreen', { 
            topic: item.topic,
            level: item.level,
            questions: item.questions
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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 20,
        paddingTop: 70
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
        borderColor: '#e4cd88',
        backgroundColor: ('rgba(39, 116, 241, 0.3)'),
        borderRadius: 12,
        marginBottom: 10,
        zIndex: 10
    },
    topic: {
        fontSize: 20,
        color: '#e4cd88',
        fontWeight: '600'
    }
})

export default TopicsNewcomer;