import React from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { TouchableHighlight } from 'react-native-gesture-handler';

export default function Profile() {
  return (
    <View style={styles.container}>
      <View style={styles.photoContainter1}>
        <TouchableOpacity style={styles.photoContainer2}>
          <Image source={require('../../../assets/user.png')} style={styles.profileImg}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  photoContainter1: {
    width: '100%',
    padding: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },
  photoContainer2: {
    width: 150,
    height: 150,
  },
  profileImg: {
    borderRadius: 75,
    width: 150,
    height: 150,
    borderWidth: 2,
    borderColor: '#a9a9a9',
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
  }
})
