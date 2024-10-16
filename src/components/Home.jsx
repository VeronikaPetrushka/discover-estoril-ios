import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ImageBackground, Animated, TextInput, Dimensions, Image } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import WelcomeModal from './WelcomeModal';
import AboutModal from './AboutModal';
import Icons from './Icons';

const { height } = Dimensions.get('window');

const Home = () => {
    const navigation = useNavigation();
    const [aboutModalVisible, setAboutModalVisible] = useState(false);
    const [welcomeModalVisible, setWelcomeModalVisible] = useState(true);
    const [expanded, setExpanded] = useState(false);
    const [animation] = useState(new Animated.Value(0));
    const [selectedImage, setSelectedImage] = useState(null); 
    const [name, setName] = useState('');

    useEffect(() => {
        if (expanded) {
            AsyncStorage.getItem('userProfile').then((data) => {
                if (data) {
                    const { storedImage, storedName } = JSON.parse(data);
                    setSelectedImage(storedImage);
                    setName(storedName);
                } else {
                    setSelectedImage(null);
                    setName('');
                }
            });
        }
    }, [expanded]);
    


    const handleAboutModalClose = () => {
        setAboutModalVisible(false);
    }

    const handleWelcomeModalClose = () => {
        setWelcomeModalVisible(false);
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

    const handleImageUpload = () => {
        const options = {
            mediaType: 'photo',
            includeBase64: false,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.assets) {
                setSelectedImage(response.assets[0].uri);
            }
        });
    };

    const handleSubmit = async () => {
        try {
            const data = {
                storedImage: selectedImage,
                storedName: name,
            };
            await AsyncStorage.setItem('userProfile', JSON.stringify(data));
            console.log('Data stored successfully!');
            handleAccountButtonPress();
        } catch (error) {
            console.error('Failed to store data', error);
        }
    };

    return (
        <ImageBackground
        source={require('../assets/background/home2.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
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

            <TouchableOpacity style={styles.btnFolders} onPress={() => navigation.navigate('FoldersScreen')}>
                <Text style={styles.btnTxt}>Folders</Text>
            </TouchableOpacity>

            <Animated.View style={[styles.accountBackground, { height: heightInterpolation }]}>
            <View style={[styles.accountBtn, expanded && styles.accountBtnExpanded]}>
            {expanded && (
                        <Animated.View style={[styles.expandedContainer, { height: heightInterpolation }]}>
                            {selectedImage ? (
                                        <Image source={{ uri: selectedImage }} style={styles.imagePlaceholder} />
                                    ) : (
                                        <View style={styles.imagePlaceholder} />
                                    )}
                                    
                                    <TouchableOpacity style={styles.uploadButton} onPress={handleImageUpload}>
                                        <Text style={styles.uploadText}>Upload Image</Text>
                                    </TouchableOpacity>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your name"
                                placeholderTextColor="#f9a500"
                                value={name}
                                onChangeText={setName}
                            />
                            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
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

            <WelcomeModal visible={welcomeModalVisible} onClose={handleWelcomeModalClose}/>
            <AboutModal visible={aboutModalVisible} onClose={handleAboutModalClose}/>

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

    btnFolders: {
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
        marginTop: height * 0.03,
        zIndex: 10
    },

    btnTxt: {
        fontSize: 20,
        color: '#f9a500',
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
        backgroundColor: ('rgba(249, 229, 179, 0.95)')
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
        backgroundColor: ('rgba(249, 229, 179, 0.3)'),
        borderRadius: 12,
        marginBottom: 10,
        zIndex: 11,
        position: 'absolute',
        bottom: 140
    },

    expandedContainer: {
        width: '100%',
        padding: 15,
        paddingVertical: height * 0.04,
        alignItems: 'center',
        justifyContent: 'flex-start',
        position: 'relative',
        top: 0
    },

    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#f9a500',
        color: '#f9a500',
        borderRadius: 8,
        padding: 10,
        marginBottom: height * 0.05,
    },

    submitButton: {
        backgroundColor: '#f9a500',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        width: '100%',
    },

    submitText: {
        color: ('rgb(249, 229, 179)'),
        fontWeight: '600',
    },

    imagePlaceholder: {
        width: height * 0.18,
        height: height * 0.18,
        borderColor: '#f9a500',
        borderWidth: 2,
        borderRadius: 100,
        marginBottom: height * 0.025,
        justifyContent: 'center',
        alignItems: 'center',
    },

    uploadButton: {
        backgroundColor: '#f9a500',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        width: '100%',
        marginBottom: 40,
    },

    uploadText: {
        color: 'rgb(249, 229, 179)',
        fontWeight: '600',
    },
});

export default Home;
