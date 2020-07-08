import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, ImageBackground,
  TouchableWithoutFeedback, Keyboard
} from 'react-native'
import { Feather } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';

export default function Profile() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.wallpaper}>
          <ImageBackground 
            source={require('../../../assets/study-wallpaper.jpg')} 
            style={{flex: 1}}
          >
            <View style={styles.overlayBackground}></View>
          </ImageBackground>
        </View>
        <View style={styles.photoContainter1}>
          <TouchableOpacity style={styles.photoContainer2}>
            <ImageBackground 
              source={require('../../../assets/user.png')} 
              style={styles.profileImg}
            >
              <View style={{flex: 2}}/>
              <TouchableOpacity style={styles.changeImgBtn}>
                <Feather name="camera" size={24} color="#ffffff90" />
              </TouchableOpacity>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <View style={styles.info}>
          <Text style={styles.label}>Username: </Text>
          <TextInput
            style={styles.input}
            placeholder='name'
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  photoContainter1: {
    position: 'absolute',
    width: '100%',
    top: 75,
    alignItems: 'center',
  },
  photoContainer2: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#fff'
  },
  profileImg: {
    borderRadius: 75,
    width: 150,
    height: 150,
    borderWidth: 2,
    borderColor: '#a9a9a9',
    overflow: 'hidden'
  },
  addImg: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#1e90ff',
    height: 30,
    width: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  wallpaper: {
    height: 150,
    width: '100%',
  }, 
  overlayBackground: {
    flex: 1,
    backgroundColor: '#e76f5130'
  },
  changeImgBtn: {
    flex: 1,
    backgroundColor: '#00000080',
    justifyContent: 'center',
    alignItems: 'center'
  },
  info: {
    flex: 1,
    margin: 20,
    marginTop: 80,
  },
  label: {
    fontFamily: 'sourcesanspro-semibold',
    fontSize: 30,
  }
})
