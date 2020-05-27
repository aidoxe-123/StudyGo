import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';

/* The common header design used by TodoStack, ProgressTrackerStack and TimetableStack
  @param:
  + title: The title that will be displayed on the header (string)
  + navigation: The navigation object passed by the system
*/
export default function Header({title, navigation }) {
  const openMenu = () => {
    navigation.openDrawer();
  }
  
  const moveToLogin = () => {
    navigation.navigate('Login')
  }

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.menu} onPress={openMenu}>
        <MaterialIcons name='menu' size={28} color='#fff'/>
      </TouchableOpacity>
      <View>
        <Text style={styles.headerText}>{title}</Text>
      </View>
      <TouchableOpacity style={styles.logout} onPress={moveToLogin}>
        <SimpleLineIcons name='logout' size={24} color='#fff'/>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
    letterSpacing: 1,
  },
  menu: {
    position: 'absolute',
    left: 16,
  },
  logout: {
    position: 'absolute',
    right: 16,
  },
});