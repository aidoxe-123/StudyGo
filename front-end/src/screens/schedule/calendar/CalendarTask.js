import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet} from 'react-native'


export default function CalendarTask({task}) {
  const [color, setColor] = useState()
  const [title, setTitle] = useState('')
  
  useEffect(() => {
    switch (task.type) {
      case 'deadline':
        setColor(styles.blue)
        setTitle('Deadline:')
        break
      case 'assessment':
        setColor(styles.yellow)
        setTitle('Assessment:')
        break
      case 'special':
        setColor(styles.red)
        setTitle('Special Event:')
        break
    }
  }, [task])
    
    
  return (
    <View style={styles.container}>
      <View style={[styles.dot, color]}/>
      <View>
        <Text style={styles.text}>{title}</Text>
        <Text style={styles.text}>{task.detail}</Text>
      </View>    
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%', 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 14,
    marginLeft: 14,
  },
  dot: {
    width: 50, 
    height: 50, 
    borderRadius: 25,
    marginRight: 7,
    overflow: 'hidden'
  },
  red: {
    backgroundColor: '#e76f51'
  },
  blue: {
    backgroundColor: '#517ee7'
  },
  yellow: {
    backgroundColor: '#51e7ba'
  },
  text: {
    fontFamily: 'sourcesanspro-regular',
    fontSize: 24
  }
})