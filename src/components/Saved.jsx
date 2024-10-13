import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icons from './Icons';

const Saved = () => {
    const [savedStories, setSavedStories] = useState([]);
    const [saved, setSaved] = useState(true);

    const loadSavedStories = async () => {
        try {
            const savedData = await AsyncStorage.getItem('savedStories');
            const stories = savedData ? JSON.parse(savedData) : [];
            console.log("Loaded stories:", stories); 
            setSavedStories(stories);
        } catch (error) {
            console.error("Error loading saved stories:", error);
        }
    };

    const handleRemoveStory = async (storyName) => {
        try {
            const updatedStories = savedStories.filter(story => story.storyName !== storyName);
            await AsyncStorage.setItem('savedStories', JSON.stringify(updatedStories));
            setSavedStories(updatedStories);
            setSaved(false);
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
                <Icons type={saved ? 'saved' : 'save'} />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
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
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 70
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#6b603e',
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
