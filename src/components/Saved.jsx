import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icons from './Icons';

const Saved = () => {
    const navigation = useNavigation();
    const [savedStories, setSavedStories] = useState([]);
    const [savedStatus, setSavedStatus] = useState({});

    const loadSavedStories = async () => {
        try {
            const savedData = await AsyncStorage.getItem('savedStories');
            const stories = savedData ? JSON.parse(savedData) : [];
            console.log("Loaded stories:", stories); 
            setSavedStories(stories);

            const initialStatus = stories.reduce((status, story) => {
                status[story.storyName] = true;
                return status;
            }, {});
            setSavedStatus(initialStatus);
        } catch (error) {
            console.error("Error loading saved stories:", error);
        }
    };

    const handleRemoveStory = async (storyName) => {
        try {
            const updatedStories = savedStories.filter(story => story.storyName !== storyName);
            await AsyncStorage.setItem('savedStories', JSON.stringify(updatedStories));
            setSavedStories(updatedStories);

            setSavedStatus(prevStatus => ({
                ...prevStatus,
                [storyName]: false,
            }));
        } catch (error) {
            console.error("Error removing story:", error);
        }
    };

    useEffect(() => {
        loadSavedStories();
    }, []);

    const renderStory = ({ item }) => (
        <View style={styles.storyContainer}>
            <Text style={styles.storyTitle}>{item.storyName}</Text>
            <Text style={styles.storyText}>{item.story}</Text>
            <TouchableOpacity onPress={() => handleRemoveStory(item.storyName)} style={styles.removeButton}>
                <Icons type={savedStatus[item.storyName] ? 'saved' : 'save'} />
            </TouchableOpacity>
        </View>
    );

    return (
        <ImageBackground
            source={require('../assets/background/home2.png')}
            style={styles.backgroundImage}
            resizeMode="cover"
        >
                <View style={styles.container}>
                    <TouchableOpacity style={styles.iconBack} onPress={() => navigation.goBack()}>
                        <Icons type={'back'}/>
                    </TouchableOpacity>
                    <Text style={styles.header}>Saved Stories</Text>
                    {savedStories.length === 0 ? (
                        <Text style={styles.noStoriesText}>No saved stories yet.</Text>
                    ) : (
                        <FlatList
                            data={savedStories}
                            keyExtractor={(item) => item.storyName}
                            renderItem={renderStory}
                        />
                    )}
                </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        padding: 20,
        paddingBottom: 40,
        paddingTop: 70
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    iconBack: {
        width: 40,
        height: 40,
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 10
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#e2d6b1',
    },
    storyContainer: {
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 15,
        elevation: 2,
    },
    storyTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#6b603e',
    },
    storyText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
    },
    removeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        padding: 5,
        alignSelf: 'flex-start',
        width: 40,
        height: 40
    },
    noStoriesText: {
        fontSize: 18,
        textAlign: 'center',
        color: '#666',
    },
});

export default Saved;
