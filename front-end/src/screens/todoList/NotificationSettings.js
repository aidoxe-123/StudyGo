import React, { useState } from 'react'
import { Modal, View, StyleSheet, Text, TouchableOpacity, Switch } from 'react-native'
import CheckBox from '@react-native-community/checkbox'

export default function NotificationSettings({closeModal, handleNotify, notiList}) {
  const duration = [
    10 * 60 * 1000, // 10 mins
    30 * 60 * 1000, // 30 mins
    60 * 60 * 1000, // 1 hour
    24 * 60 * 60 * 1000, // one day
  ]
  
  const [toggleCheckBox1, setToggleCheckBox1] = useState(
    typeof notiList[duration[0].toString()] === 'undefined'
    ? false
    : notiList[duration[0].toString()]
  )
  const [toggleCheckBox2, setToggleCheckBox2] = useState(
    typeof notiList[duration[1].toString()] === 'undefined'
    ? false
    : notiList[duration[1].toString()]
  )
  const [toggleCheckBox3, setToggleCheckBox3] = useState(
    typeof notiList[duration[2].toString()] === 'undefined'
    ? false
    : notiList[duration[2].toString()]
  )
  const [toggleCheckBox4, setToggleCheckBox4] = useState(
    typeof notiList[duration[3].toString()] === 'undefined'
    ? false
    : notiList[duration[3].toString()]
  )

  const toggleStates = [toggleCheckBox1, toggleCheckBox2, toggleCheckBox3, toggleCheckBox4]

  function handleSet() {
    closeModal()
    for (var i = 0; i < 4; i++) {
      handleNotify(duration[i], toggleStates[i])
    }
  }

  return (
    <Modal visible={true} transparent={true}>
        <View style={styles.container}>
          <View style={styles.whiteBox}>
            <Text style={styles.headerText}>Notify me in advance: </Text>
            <View style={styles.checkboxRow}>
              <Text style={styles.choice}>10 Minutes</Text>
              <Switch
                value={toggleCheckBox1}
                onValueChange={() => toggleCheckBox1 ? setToggleCheckBox1(false) : setToggleCheckBox1(true)}
              />
            </View>
            <View style={styles.checkboxRow}>
              <Text style={styles.choice}>30 Minutes</Text>
              <Switch
                value={toggleCheckBox2}
                onValueChange={() => toggleCheckBox2 ? setToggleCheckBox2(false) : setToggleCheckBox2(true)}
              />
            </View>
            <View style={styles.checkboxRow}>
              <Text style={styles.choice}>1 Hour</Text>
              <Switch
                value={toggleCheckBox3}
                onValueChange={() => toggleCheckBox3 ? setToggleCheckBox3(false) : setToggleCheckBox3(true)}
              />
            </View>
            <View style={styles.checkboxRow}>
              <Text style={styles.choice}>1 Day</Text>
              <Switch
                value={toggleCheckBox4}
                onValueChange={() => toggleCheckBox4 ? setToggleCheckBox4(false) : setToggleCheckBox4(true)}
              />
            </View>
            <View style={styles.bottomRow}>
              <TouchableOpacity style={{marginRight: 20}} onPress={closeModal}>
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSet}>
                <Text>Set</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00000080',
    justifyContent: 'center',
    alignItems: 'center'
  },
  whiteBox: {
    backgroundColor: 'white',
    height: '70%',
    width: '70%',
    minHeight: 350,
    padding: 20
  },
  headerText: {
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
    fontSize: 20
  }
})