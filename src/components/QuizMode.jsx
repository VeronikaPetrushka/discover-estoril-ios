import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ImageBackground, Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

const QuizMode = () => {
    const navigation = useNavigation();

    return (
        <ImageBackground
        source={require('../assets/background/home2.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.container}>

            <Text style={styles.title}>Choose you quiz mode:</Text>

            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('TopicsNewcomerScreen')}>
                <Text style={styles.btnTxt}>Newcomer</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('TopicsExpertScreen')}>
                <Text style={styles.btnTxt}>Expert</Text>
            </TouchableOpacity>

        </View>
        </ImageBackground>
    )
};


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 20,
        paddingTop: height * 0.2
    },

    backgroundImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
      },

    title: {
        fontWeight: 'bold',
        fontSize: 34,
        textAlign: 'center',
        marginBottom: 200,
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

    btnTxt: {
        fontSize: 20,
        color: '#f9a500',
        fontWeight: '600'
    },
});

export default QuizMode;
