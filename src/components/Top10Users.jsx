import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

const randomNames = [
    'Alice', 'Bob', 'Charlie', 'Daisy', 'Eve', 'Frank', 'Grace', 'Hank', 'Ivy', 'Jack'
];

const Top10Users = ({onGoBack}) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const generateUsers = () => {
            const randomUsers = Array.from({ length: 10 }).map((_, index) => {
                const randomName = randomNames[index];
                return {
                    id: index + 1,
                    name: randomName,
                    score: Math.floor(Math.random() * (540 - 200 + 1)) + 200,
                };
            });
            setUsers(randomUsers);
        };

        generateUsers();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.userContainer}>
            <Text style={styles.userName}>{item.name}</Text>
            <Text style={styles.userScore}>Score: {item.score}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Top 10 Users</Text>
            <FlatList
                data={users}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />
            <TouchableOpacity style={styles.goBackButton} onPress={onGoBack}>
                <Text style={styles.goBackButtonText}>Go back</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        paddingBottom: height * 0.08,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: height * 0.02,
        color: '#e2d6b1',
        marginTop: height * -0.01
    },
    listContainer: {
        paddingBottom: height * 0.03,
        width: '90%',
    },
    userContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: height * 0.019,
        marginVertical: 4,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },
    userName: {
        fontSize: 18,
        color: '#6b603e',
    },
    userScore: {
        fontSize: 16,
        color: '#6b603e',
    },
    goBackButton: {
        marginTop: height * 0.01
    },
    goBackButtonText: {
        fontSize: 18,
        color: 'white'
    }
});

export default Top10Users;
