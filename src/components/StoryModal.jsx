import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Share } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import Icons from './Icons';

const StoryModal = ({ visible, onClose, storyName, story }) => {
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const checkSavedStatus = async () => {
            try {
                const savedStories = await AsyncStorage.getItem('savedStories');
                if (savedStories) {
                    const savedList = JSON.parse(savedStories);
                    const isSaved = savedList.some(story => story.storyName === storyName);
                    setSaved(isSaved);
                }
            } catch (error) {
                console.error("Error checking saved status:", error);
            }
        };
    
        if (visible) {
            checkSavedStatus();
        }
    }, [visible, storyName]);
    
    const handleSave = async () => {
        try {
            const savedStories = await AsyncStorage.getItem('savedStories');
            let savedList = savedStories ? JSON.parse(savedStories) : [];
    
            if (saved) {
                savedList = savedList.filter(item => item.storyName !== storyName);
            } else {
                savedList.push({ storyName, story });
            }
    
            await AsyncStorage.setItem('savedStories', JSON.stringify(savedList));
            setSaved(!saved);
        } catch (error) {
            console.error("Error updating saved stories:", error);
        }
    };    

    const handleShare = async () => {
        try {
            await Share.share({
                message: `${storyName}\n\n${story}`,
            });
        } catch (error) {
            console.error("Error sharing story:", error);
        }
    };

    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                <ScrollView contentContainerStyle={styles.ScrollView}>
                    <Text style={styles.title}>{storyName}</Text>
                    <Text style={styles.text}>{story}</Text>
                    <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
                        <Text style={styles.btnText}>Share</Text>
                    </TouchableOpacity>
                    </ScrollView>
                    <TouchableOpacity style={styles.savedIcon} onPress={handleSave}>
                        <Icons type={saved ? 'saved' : 'save'}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Icons type={'close'}/>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '90%',
        padding: 20,
        paddingTop: 50,
        backgroundColor: 'white',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    ScrollView: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    text: {
        fontSize: 19,
        marginBottom: 10,
        textAlign: 'center',
        color: '#6b603e',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 22,
        marginBottom: 10,
        textAlign: 'center',
        color: '#6b603e'
    },
    shareButton: {
        padding: 10,
        width: 290,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: '#6b603e',
        marginTop: 10,
    },
    btnText: {
        fontSize: 18,
        fontWeight: '500',
        color: 'white'
    },
    savedIcon: {
        padding: 10,
        width: 50,
        height: 50,
        position: 'absolute',
        top: 10,
        left: 10,
    },
    closeButton: {
        padding: 10,
        width: 42,
        height: 42,
        position: 'absolute',
        top: 10,
        right: 10,
    }
});

export default StoryModal;
