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
    case 'folder':
      imageSource = require('../assets/common/folder.png');
      break;
    case 'edit':
      imageSource = require('../assets/common/edit.png');
      break;
    case 'delete':
      imageSource = require('../assets/common/delete.png');
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
      iconStyle = styles.manIcon;
      break;
    case 'walking-2':
      imageSource = require('../assets/museum/walking-2.png');
      iconStyle = styles.manIcon;
      break;
    case 'map':
      imageSource = require('../assets/museum/map.png');
      break;
    case 'life-gone':
      imageSource = require('../assets/quiz/life.png');
      iconStyle = styles.lifeIcon;
      break;
    case 'life':
      imageSource = require('../assets/quiz/life.png');
      break;
    case 'hint':
      imageSource = require('../assets/quiz/hint.png');
      break;
    case 'coin':
      imageSource = require('../assets/quiz/coin.png');
      break;
    case 'plus':
      imageSource = require('../assets/quiz/plus.png');
      iconStyle = styles.backIcon;
      break;
    case 'minus':
      imageSource = require('../assets/quiz/minus.png');
      iconStyle = styles.backIcon;
      break;
    case 'store':
      imageSource = require('../assets/quiz/store.png');
      break;
    case 'save':
      imageSource = require('../assets/quiz/save.png');
      break;
    case 'saved':
      imageSource = require('../assets/quiz/saved.png');
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
    tintColor: '#f9a500',
  },
  manIcon: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    tintColor: '#e4cd88',
  },
  lifeIcon: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    tintColor: '#d6d1d0',
  }
});

export default Icons;
