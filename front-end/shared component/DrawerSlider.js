import React, {useContext} from 'react'
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import { DrawerItemList} from '@react-navigation/drawer'
import { SimpleLineIcons, AntDesign } from '@expo/vector-icons';
import { UserIdContext } from '../routes/MainDrawer'


export default function DrawerSlider(props) {
  const userId = useContext(UserIdContext)
  return (
    <ScrollView contentContainerStyle={{flex: 1, marginTop: 25}}>
      <View style={styles.profileContainer}>
        <Image source={require('../assets/person.png')} style={styles.profileImg}/>
        <Text>{userId}</Text>
      </View>
      <SafeAreaView>
        <DrawerItemList {...props}/>
      </SafeAreaView>
      <View style={{borderBottomColor: 'rgba(0,0,0,0.5)', borderBottomWidth: 1, margin: 10}} />
      <TouchableOpacity style={styles.logoutButton} onPress={() => props.navigation.navigate('Login')}>
        <View style={styles.insideLogoutButton}>
          <SimpleLineIcons name='logout' size={20} color='rgba(0,0,0,0.5)'/>
          <Text style={styles.logoutText}>Log out</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  profileContainer: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImg: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  logoutButton: {
    marginHorizontal: 20,
  }, 
  insideLogoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutText: {
    marginHorizontal: 31,
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.5)'
  }
})