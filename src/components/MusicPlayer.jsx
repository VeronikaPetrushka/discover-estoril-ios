import React from 'react';
import { View } from 'react-native';
import { useMusic } from '../constants/context/music.js';

const MusicPlayer = () => {
    const { isPlaying, togglePlay } = useMusic();

    return <View />;
};

export default MusicPlayer;
