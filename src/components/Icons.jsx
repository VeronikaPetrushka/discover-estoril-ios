import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Icons = ({ type }) => {

  let imageSource;
  let iconStyle = styles.icon;

  switch (type) {
    case 'close':
      imageSource = require('../assets/common/close.png');
      iconStyle = styles.closeIcon;
      break;
    case 'back':
      imageSource = require('../assets/common/go-back.png');
      iconStyle = styles.backIcon;
      break;
    case 'padlock':
      imageSource = require('../assets/collection/padlock.png');
      break;
    case 'home':
      imageSource = require('../assets/panel/home.png');
      iconStyle = styles.backIcon;
      break;
    case 'settings':
      imageSource = require('../assets/panel/settings.png');
      iconStyle = styles.backIcon;
      break;
    case 'museum':
      imageSource = require('../assets/panel/museum.png');
      iconStyle = styles.backIcon;
      break;
    case 'quiz':
      imageSource = require('../assets/panel/quiz.png');
      iconStyle = styles.backIcon;
      break;
    case 'leaderboard':
      imageSource = require('../assets/panel/leaderboard.png');
      iconStyle = styles.backIcon;
      break;
    case 'arrow':
      imageSource = require('../assets/common/arrow.png');
      iconStyle = styles.backIcon;
      break;
    case 'door':
      imageSource = require('../assets/museum/door.png');
      break;
    case 'walking-1':
      imageSource = require('../assets/museum/walking-1.png');
      iconStyle = styles.backIcon;
      break;
    case 'walking-2':
      imageSource = require('../assets/museum/walking-2.png');
      iconStyle = styles.backIcon;
      break;
  }

  return (
    <Image 
      source={imageSource} 
      style={iconStyle} 
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  closeIcon: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    tintColor: '#8b7e56',
  },
  backIcon: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    tintColor: '#e4cd88',
  }
});

export default Icons;
