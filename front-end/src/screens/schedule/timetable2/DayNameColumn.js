import React, {useRef, useState} from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native'

export default function DayNameColumn() {
  const [height, setHeight] = useState(0)
  const col = useRef(null)
  return (
      <KeyboardAvoidingView style={styles.dayColumn} ref={col} onLayout={event => {
        setHeight(event.nativeEvent.layout.height)
        console.log(event.nativeEvent.layout.height)
      }} behavior={null}>
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
    </KeyboardAvoidingView>
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