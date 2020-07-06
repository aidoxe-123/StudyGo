import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, Switch } from 'react-native'

export default function NotificationSettings({handleNotify, notiList}) {
  const duration = [
    10 * 60 * 1000, // 10 mins
    30 * 60 * 1000, // 30 mins
    60 * 60 * 1000, // 1 hour
    24 * 60 * 60 * 1000, // one day
  ]
  
  const [toggleCheckBox1, setToggleCheckBox1] = useState(false)
  const [toggleCheckBox2, setToggleCheckBox2] = useState(false)
  const [toggleCheckBox3, setToggleCheckBox3] = useState(false)
  const [toggleCheckBox4, setToggleCheckBox4] = useState(false)

  useEffect(() => {
    if (typeof notiList[duration[0].toString()] !== 'undefined') setToggleCheckBox1(true) 
    if (typeof notiList[duration[1].toString()] !== 'undefined') setToggleCheckBox2(true)
    if (typeof notiList[duration[2].toString()] !== 'undefined') setToggleCheckBox3(true)
    if (typeof notiList[duration[3].toString()] !== 'undefined') setToggleCheckBox4(true)
  }, [])

  return (
    <View style={styles.whiteBox}>
      <Text style={styles.headerText}>Notify me in advance: </Text>
      <View style={styles.checkboxRow}>
        <Text style={styles.choice}>10 Minutes</Text>
        <Switch
          value={toggleCheckBox1}
          onValueChange={() => {
            handleNotify(duration[0], !toggleCheckBox1)
            toggleCheckBox1 ? setToggleCheckBox1(false) : setToggleCheckBox1(true)
          }}
        />
      </View>
      <View style={styles.checkboxRow}>
        <Text style={styles.choice}>30 Minutes</Text>
        <Switch
          value={toggleCheckBox2}
          onValueChange={() => {
            handleNotify(duration[1], !toggleCheckBox2)
            toggleCheckBox2 ? setToggleCheckBox2(false) : setToggleCheckBox2(true)
          }}
        />
      </View>
      <View style={styles.checkboxRow}>
        <Text style={styles.choice}>1 Hour</Text>
        <Switch
          value={toggleCheckBox3}
          onValueChange={() => {
            handleNotify(duration[2], !toggleCheckBox3)
            toggleCheckBox3 ? setToggleCheckBox3(false) : setToggleCheckBox3(true)
          }}
        />
      </View>
      <View style={styles.checkboxRow}>
        <Text style={styles.choice}>1 Day</Text>
        <Switch
          value={toggleCheckBox4}
          onValueChange={() => {
            handleNotify(duration[3], !toggleCheckBox4)
            toggleCheckBox4 ? setToggleCheckBox4(false) : setToggleCheckBox4(true)
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  whiteBox: {
    flex: 1,
    padding: 20,
  },
  headerText: {
    fontFamily: 'sourcesanspro-regular',
    fontSize: 30
  },
  bottomRow: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'row',
  },
  checkboxRow: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  choice: {
    fontFamily: 'sourcesanspro-regular',
    fontSize: 20
  }
})