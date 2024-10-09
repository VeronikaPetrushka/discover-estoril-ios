import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ImageBackground, Animated, TextInput, Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';
import AboutModal from './AboutModal';
import Icons from './Icons';

const { height } = Dimensions.get('window');

const Home = () => {
    const navigation = useNavigation();
    const [aboutModalVisible, setAboutModalVisible] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [animation] = useState(new Animated.Value(0));
    const [name, setName] = useState('');


    const handleAboutModalClose = () => {
        setAboutModalVisible(false);
    }

    const handleAccountButtonPress = () => {
        setExpanded(!expanded);
        Animated.timing(animation, {
            toValue: expanded ? 0 : 1,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    const heightInterpolation = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [50, height * 0.6],
    });

    return (
        <ImageBackground
        source={require('../assets/background/home.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
        <View style={styles.container}>

            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('SavedScreen')}>
                <Text style={styles.btnTxt}>Saved</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('CollectionScreen')}>
                <Text style={styles.btnTxt}>Collection</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn} onPress={() => setAboutModalVisible(true)}>
                <Text style={styles.btnTxt}>About us</Text>
            </TouchableOpacity>

            <Animated.View style={[styles.accountBackground, { height: heightInterpolation }]}>
            <View style={[styles.accountBtn, expanded && styles.accountBtnExpanded]}>
            {expanded && (
                        <Animated.View style={[styles.expandedContainer, { height: heightInterpolation }]}>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your name"
                                placeholderTextColor="#e4cd88"
                                value={name}
                                onChangeText={setName}
                            />
                            <TouchableOpacity style={styles.submitButton}>
                                <Text style={styles.submitText}>Submit</Text>
                            </TouchableOpacity>
                        </Animated.View>
                    )}
                    <TouchableOpacity style={styles.accountIcon} onPress={handleAccountButtonPress}>
                        <Animated.View style={{ transform: [{ rotate: expanded ? '180deg' : '0deg' }] }}>
                            <Icons type={'arrow'} />
                        </Animated.View>
                    </TouchableOpacity>
            </View>
            </Animated.View>

            <AboutModal visible={aboutModalVisible} onClose={handleAboutModalClose}/>

        </View>
        </View>
        </ImageBackground>
    )
};


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
    },

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

    btnTxt: {
        fontSize: 20,
        color: '#e4cd88',
        fontWeight: '600'
    },

    accountBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        padding: 6,
        paddingHorizontal: 20,
        borderRadius: 12,
    },

    accountBtnExpanded: {
        backgroundColor: ('rgba(39, 116, 241, 0.95)')
    },

    accountIcon: {
        width: 55,
        height: 55,
        position: 'absolute',
        bottom: -2,
        padding: 15
    },

    accountBackground: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: ('rgba(39, 116, 241, 0.3)'),
        borderRadius: 12,
        marginBottom: 10,
        zIndex: 11,
        position: 'absolute',
        bottom: 140
    },

    expandedContainer: {
        width: '100%',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        top: 0
    },

    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#e4cd88',
        color: '#e4cd88',
        borderRadius: 8,
        padding: 10,
        marginBottom: 30,
    },

    submitButton: {
        backgroundColor: '#e4cd88',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        width: '100%',
    },

    submitText: {
        color: ('rgb(39, 116, 241)'),
        fontWeight: '600',
    }
});

export default Home;
