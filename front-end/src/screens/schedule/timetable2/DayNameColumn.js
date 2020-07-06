import React, {useRef} from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function DayNameColumn() {
  return (
      <View style={styles.dayColumn} >
        <View style={styles.substituteRow}></View>
        <View style={styles.day}>
          <Text style={styles.dayName}>Mon</Text>
        </View>   
        <View style={styles.day}>
          <Text style={styles.dayName}>Tue</Text>
        </View>   
        <View style={styles.day}>
          <Text style={styles.dayName}>Wed</Text>
        </View> 
        <View style={styles.day}>
          <Text style={styles.dayName}>Thu</Text>
        </View> 
        <View style={styles.day}>
          <Text style={styles.dayName}>Fri</Text>
        </View>    
    </View>
  )
}

const styles = StyleSheet.create({
  dayColumn: {
    height: '100%',
    width: '15%',
  },
  day: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'  
  },
  dayName: {
    fontFamily: 'sourcesanspro-regular',
    fontSize: 20,
  },
  substituteRow: {
    flex: 0.5,
  },
})