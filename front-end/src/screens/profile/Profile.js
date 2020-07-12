import React, { useEffect, useState } from 'react'
import {View, Text, StyleSheet, TouchableOpacity, ImageBackground,
  TouchableWithoutFeedback, Keyboard
} from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions'; 
import { Feather } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';

export default function Profile() {
  const [uri, setUri] = useState('../../../assets/user.png')
  useEffect(() => {
    getPermissionAsync()
  }, [])

  async function getPermissionAsync() {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };
  async function pickImage() {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.cancelled) {
        setUri(result.uri)
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };
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
              source={{uri: uri}} 
              style={styles.profileImg}
            >
              <View style={{flex: 2}}/>
              <TouchableOpacity style={styles.changeImgBtn} onPress={pickImage}>
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
