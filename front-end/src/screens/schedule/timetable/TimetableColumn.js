import React, {useRef, useEffect, useState} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TimetableStyles } from '../../../../style/TimetableStyles'
import TimetableCell from './TimetableCell'

export default function TimetableColumn({dateName, lessons, openModal}) {
  const column = useRef(null)
  const timeArray = []
  for (var i = 0; i < 24; i++) {
    timeArray[i] = i
  }

  const [colHeight, setColHeight] = useState(0)

  return (
    <View style={styles.column} ref={column} onLayout={event => {
      setColHeight(event.nativeEvent.layout.height)
    }}>
      <Text style={styles.header}>{dateName.toUpperCase().substring(0, 3)}</Text>
      { timeArray.map(index => {
          return (
            <View style={{flex: 1}} key={index.toString()}>
              <View style={styles.backgroundCell}></View>
            </View> 
          )
        })
      }
      <View style={[styles.substituteRow, {borderTopWidth: 1, borderColor: '#dddddd'}]}></View>
      { lessons.map(lesson => {
        return (
          <TimetableCell 
            colHeight={colHeight}
            key={lesson.id} 
            lesson={lesson} 
            openModal={openModal}
            dateName={dateName}
          />
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  column: {
    width: 100,
    height: '100%'
  },
  header: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'sourcesanspro-semibold',
    borderWidth: 1,
    borderRightWidth: 0,
    borderColor: '#dddddd',
  },
  backgroundCell: {
    flex: 1,
    backgroundColor: 'rgba(220,220,220,0.2)',
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#dddddd'
  },
  substituteRow: {
    flex: 0.5,
  },
})