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
    
  const line = (props) => (
    <View style={{height: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', ...props}}>
      <View style={{height: '50%', borderLeftWidth: 1, borderColor: '#d3d3d3', marginRight: 2}}></View>
      <View style={{height: '50%', borderLeftWidth: 1, borderColor: '#d3d3d3'}}></View>
    </View>
  )
  
  return (
    <View style={styles.container}>
      {line({marginRight: '2%'})}
      <View style={{flexDirection: 'row', flex: 1, paddingRight: '4%', alignItems: 'center'}}>
        <View style={[styles.dot, color]}/>
        <View>
          <Text style={styles.text}>{title}</Text>
          <Text style={styles.text}>{task.detail}</Text>
        </View> 
      </View>  
      {line({position: 'absolute', right: '2%'})} 
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: '2%',
    marginLeft: '2%',
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