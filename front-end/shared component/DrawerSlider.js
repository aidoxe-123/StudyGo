import React from 'react'
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import { DrawerItemList} from '@react-navigation/drawer'
import { SimpleLineIcons } from '@expo/vector-icons';

export default function DrawerSlider(props) {
  return (
    <ScrollView contentContainerStyle={{flex: 1, marginTop: 25}}>
      <SafeAreaView>
        <DrawerItemList {...props}/>
      </SafeAreaView>
      <View style={{borderBottomColor: 'rgba(0,0,0,0.5)', borderBottomWidth: 1, margin: 10}} />
      <TouchableOpacity style={styles.logoutButton} onPress={() => props.navigation.navigate('Login')}>
        <View style={styles.insideLogoutButton}>
          <SimpleLineIcons name='logout' size={20} color='rgb(105,105,105)'/>
          <Text style={styles.logoutText}>Log out</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  logoutButton: {
    marginHorizontal: 20,
  }, 
  insideLogoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutText: {
    marginHorizontal: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 0.5)'
  }
})