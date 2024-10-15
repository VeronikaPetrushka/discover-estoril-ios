import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import museum from '../constants/museum';
import Icons from './Icons';

const { height } = Dimensions.get('window');

const Map = () => {
    const navigation = useNavigation();
    const mapRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (mapRef.current) {
            const coordinates = museum.map((item) => ({
                latitude: item.coordinates[0].lat,
                longitude: item.coordinates[0].lng,
            }));
            mapRef.current.fitToCoordinates(coordinates, {
                edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                animated: true,
            });
        }
    }, []);

    const handleNextMarker = () => {
        const nextIndex = (currentIndex + 1) % museum.length;
        setCurrentIndex(nextIndex);

        const { lat, lng } = museum[nextIndex].coordinates[0];
        mapRef.current.animateToRegion({
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
        }, 1000);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.iconBack} onPress={() => navigation.goBack()}>
                <Icons type={'back'}/>
            </TouchableOpacity>
            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={{
                    latitude: 38.6997882,
                    longitude: -9.4170954,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
            >
                {museum.map((item) => (
                    <Marker
                        key={item.id}
                        coordinate={{
                            latitude: item.coordinates[0].lat,
                            longitude: item.coordinates[0].lng,
                        }}
                        title={item.name}
                        description={item.description}
                    />
                ))}
            </MapView>
            <TouchableOpacity style={styles.btn} onPress={handleNextMarker}>
                <Text style={styles.btnText}>Next place</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    btn: {
        position: 'absolute',
        bottom: 40,
        left: '35%',
        borderRadius: 10,
        padding: 5,
        paddingHorizontal: 15,
        backgroundColor: '#00b1cc',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500'
    },
    iconBack: {
        width: 40,
        height: 40,
        position: 'absolute',
        top: height * 0.06,
        left: 20,
        zIndex: 10
    },
});

export default Map;
