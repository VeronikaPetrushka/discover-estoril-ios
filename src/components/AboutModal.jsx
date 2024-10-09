import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icons from './Icons';

const AboutModal = ({ visible, onClose }) => {

    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                <ScrollView style={styles.ScrollView}>
                    <Text style={styles.modalText}>
                    Welcome to <Text style={styles.bold}>Estoril,</Text>  where the magic of the Atlantic intertwines with history. 
                    </Text>
                    <Text style={styles.modalText}>
                    This city dazzles with its golden beaches and ancient palaces that guard the secrets of the past. Strolling through its narrow streets invites you to enjoy an unforgettable atmosphere.
                    </Text>
                    <Text style={styles.modalText}>
                    Discover Estoril is your key to this enchanting place. Explore the interactive museum of landmarks, receive daily bonuses in the form of keys, take quizzes to learn more about the city, and collect postage stamps as tokens of your discoveries.
                    </Text>
                    <Text style={styles.modalText}>
                    Test your knowledge in quizzes with two levels of difficulty and compete with friends on the scoreboard.
                    </Text>
                    <Text style={styles.modalText}>
                    Discover a world where history comes alive, and every step leads to new adventures. Your journey begins here!
                    </Text>
                    </ScrollView>
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
        height: '75%',
        padding: 20,
        paddingTop: 50,
        backgroundColor: 'white',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    modalText: {
        fontSize: 19,
        marginBottom: 10,
        textAlign: 'center',
        color: '#6b603e'
    },
    bold: {
        fontWeight: 'bold'
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

export default AboutModal;
