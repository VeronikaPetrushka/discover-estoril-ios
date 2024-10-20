import React, {useState, useEffect} from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icons from './Icons';

const { width } = Dimensions.get('window');

const StoreModal = ({ visible, onClose, onUseHint, availableHints, onUseLife, lives }) => {
    const [totalScore, setTotalScore] = useState(0);
    const [totalLives, setTotalLives] = useState(0);
    const [totalHints, setTotalHints] = useState(0);

    const [hintRegulator, setHintRegulator] = useState(0);
    const [livesRegulator, setLivesRegulator] = useState(0);

    useEffect(() => {
        const loadStats = async () => {
            const storedScore = await AsyncStorage.getItem('totalScore');
            const storedLives = await AsyncStorage.getItem('totalLives');
            const storedHints = await AsyncStorage.getItem('totalHints');

            if (storedScore) {
                setTotalScore(parseInt(storedScore, 10));
            }
            if (storedLives) {
                setTotalLives(parseInt(storedLives, 10));
            }
            if (storedHints) {
                setTotalHints(parseInt(storedHints, 10));
            }
        };

        if (visible) {
            loadStats();
        }
    }, [visible]);

    const increaseHints = () => {
        setHintRegulator(prev => prev + 1);
    };

    const decreaseHints = () => {
        if (hintRegulator > 0) {
            setHintRegulator(prev => prev - 1);
        }
    };

    const hintPrice = hintRegulator * 5;

    const increaseLives = () => {
        setLivesRegulator(prev => prev + 1);
    };

    const decreaseLives = () => {
        if (livesRegulator > 0) {
            setLivesRegulator(prev => prev - 1);
        }
    };

    const livesPrice = livesRegulator * 5;

    const buyHints = async () => {
        if (totalScore < hintPrice) {
            alert("Insufficient balance, you have not enough in-app coins to buy a hint :(");
            return;
        }
        if (totalScore >= hintPrice) {
            setTotalHints(prev => prev + hintRegulator);
            setTotalScore(prev => prev - hintPrice);
            setHintRegulator(0);
            await AsyncStorage.setItem('totalHints', (totalHints + hintRegulator).toString());
            await AsyncStorage.setItem('totalScore', (totalScore - hintPrice).toString());
        }
    };

    const buyLives = async () => {
        if (totalScore >= livesPrice) {
            setTotalLives(prev => prev + livesRegulator);
            setTotalScore(prev => prev - livesPrice);
            setLivesRegulator(0);
            await AsyncStorage.setItem('totalLives', (totalLives + livesRegulator).toString());
            await AsyncStorage.setItem('totalScore', (totalScore - livesPrice).toString());
        }
    };

    const handleUseHint = async () => {

        if (availableHints === 0) {
            alert("You have already used 3 hints for this quiz.");
            return;
        }

        if (totalHints > 0) {
            await AsyncStorage.setItem('totalHints', (totalHints - 1).toString());
            onUseHint();
            onClose();
        }
    };

    const handleUseLife = async () => {
        if (lives >= 3) {
            alert("You have already topped up your lives to maximum.");
            return;
        }

        if (totalLives > 0) {
            await AsyncStorage.setItem('totalLives', (totalLives - 1).toString());
            onUseLife();
            onClose();
        } else {
            alert("No more lives available.");
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
                <View style={[styles.modalContentTimer]}>
                    
                    <ScrollView>
                    <Text style={styles.modalTitle}>Store</Text>

                    <View style={styles.statsContainer}>

                    <View style={styles.scoreContainer}>
                        <Text style={styles.statsText}>{totalHints}</Text>
                        <View style={styles.hintStatsIcon}>
                                <Icons type={'hint'}/>
                        </View>
                    </View>

                    <View style={styles.scoreContainer}>
                        <Text style={styles.statsText}>{totalLives}</Text>
                        <View style={styles.lifeStatsIcon}>
                                <Icons type={'life'}/>
                        </View>
                    </View>

                    <View style={styles.scoreContainer}>
                        <Text style={styles.statsText}>{totalScore}</Text>
                        <View style={styles.coinStatsIcon}>
                                <Icons type={'coin'}/>
                        </View>
                    </View>

                    </View>

                    <View style={styles.hintContainer}>
                        <View style={styles.hintIcon}>
                            <Icons type={'hint'}/>
                        </View>
                        <Text style={styles.regulatorTxt}>{hintPrice}</Text>
                        <View style={styles.regulatorContainer}>
                            <TouchableOpacity 
                                style={[styles.regulatorIcon, hintRegulator <= 0 && styles.disabledButton]} 
                                onPress={decreaseHints}
                                disabled={hintRegulator <= 0}
                                >
                                <Icons type={'minus'}/>
                            </TouchableOpacity>
                            <Text style={styles.regulatorTxt}>{hintRegulator}</Text>
                            <TouchableOpacity 
                                style={[styles.regulatorIcon]} 
                                onPress={increaseHints}
                                >
                                <Icons type={'plus'}/>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.btnContainer}>
                    <TouchableOpacity style={[styles.buyBtn, totalScore < hintPrice || hintRegulator <= 0 && styles.disabledButton]} onPress={buyHints}>
                        <Text style={styles.buyBtnTxt}>Buy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.buyBtn, totalHints <= 0 && styles.disabledButton]} 
                        onPress={handleUseHint}
                        disable={totalHints <= 0}
                        >
                        <Text style={styles.buyBtnTxt}>Use</Text>
                    </TouchableOpacity>
                    </View>

                    <View style={styles.hintContainer}>
                        <View style={styles.hintIcon}>
                            <Icons type={'life'}/>
                        </View>
                        <Text style={styles.regulatorTxt}>{livesPrice}</Text>
                        <View style={styles.regulatorContainer}>
                            <TouchableOpacity 
                                style={[styles.regulatorIcon, livesRegulator <= 0 && styles.disabledButton]}
                                onPress={decreaseLives}
                                disabled={livesRegulator <= 0}
                                >
                                <Icons type={'minus'}/>
                            </TouchableOpacity>
                            <Text style={styles.regulatorTxt}>{livesRegulator}</Text>
                            <TouchableOpacity 
                                style={[styles.regulatorIcon]}  
                                onPress={increaseLives}
                                >
                                <Icons type={'plus'}/>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.btnContainer}>
                    <TouchableOpacity style={[styles.buyBtn, totalScore < livesPrice || livesRegulator <= 0 && styles.disabledButton]} onPress={buyLives}>
                        <Text style={styles.buyBtnTxt}>Buy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.buyBtn, totalLives <= 0 && styles.disabledButton]} 
                        onPress={handleUseLife} 
                        disable={totalLives <= 0}
                        >
                        <Text style={styles.buyBtnTxt}>Use</Text>
                    </TouchableOpacity>
                    </View>

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
    modalContentTimer: {
        width: '90%',
        height: '66%',
        padding: 20,
        paddingTop: 30,
        backgroundColor: 'white',
        borderRadius: 15,
        alignItems: 'center',
    },
    modalTitle: {
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20,
        color: '#1e3949'
    },
    closeButton: {
        padding: 10,
        width: 40,
        height: 40,
        position: 'absolute',
        top: 10,
        right: 10,
    },
    statsContainer: {
        width: width * 0.79,
        padding: 10,
        paddingHorizontal: 15,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 15,
        backgroundColor: '#6b603e',
        marginBottom: 30,
    },
    statsMiniText: {
        fontSize: 10,
        color: 'white'
    },
    scoreContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    hintStatsIcon: {
        width: 40,
        height: 40,
        marginLeft: 10,
    },
    lifeStatsIcon: {
        width: 35,
        height: 35,
        marginLeft: 10,
    },
    coinStatsIcon: {
        width: 45,
        height: 45,
        marginLeft: 10
    },
    statsText: {
        fontSize: 21,
        fontWeight: 'bold',
        color: '#fff'
    },
    hintContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 25,
        width: width * 0.79
    },
    hintIcon: {
        width: 70,
        height: 70,
        marginRight: width * 0.04
    },
    regulatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    regulatorIcon: {
        width: 50,
        height: 50,
        padding: 10
    },
    regulatorTxt: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#6b603e',
        marginHorizontal: 2,
        width: width * 0.1,
        textAlign: 'center'
    },
    btnContainer: {
        marginBottom: 40,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        width: '100%'
    },
    buyBtn: {
        width: '45%',
        backgroundColor: '#e4cd88',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 15,
    },
    buyTimeBtn: {
        width: '100%',
        backgroundColor: '#e4cd88',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 15,
        marginBottom: 30
    },
    useTimeBtn: {
        width: '100%',
        backgroundColor: '#e4cd88',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 15,
        marginTop: 30
    },
    buyBtnTxt: {
        fontSize: 20,
        fontWeight: '600',
        color: '#fff'
    },
    disabledButton: {
        opacity: 0.5,
      },
});

export default StoreModal;
