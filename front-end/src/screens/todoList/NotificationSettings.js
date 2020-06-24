import React, { useState } from 'react'
import { Modal, View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { RadioButtons } from '../../components/index'

export default function NotificationSettings({closeModal, handleNotify}) {
  // the map variable is for visualization only
  const map = { tenMin: 0, halfHour: 1, oneHour: 2, oneDay: 3}
  
  const [choice, setChoice] = useState()
  const durationAndMessage = [
    {duration: 10 * 60 * 1000, mess: 'ten minutes'},
    {duration: 30 * 60 * 1000, mess: 'half an hour'},
    {duration: 60 * 60 * 1000, mess: 'one hour'},
    {duration: 24 * 60 * 60 * 1000, mess: 'one day'}
  ]

  function handleChoice(index) {
    setChoice(index)
  }

  function handleSet() {
    handleNotify(durationAndMessage[choice].duration,
      durationAndMessage[choice].mess)
    closeModal()
  }

  return (
    <Modal visible={true} transparent={true}>
        <View style={styles.container}>
          <View style={styles.whiteBox}>
            <Text style={styles.headerText}>Notify me in advance: </Text>
            <RadioButtons onPressIndex={handleChoice}>
              {/*Choice 1*/}
              <Text>10 mins</Text>
              {/*Choice 2*/}
              <Text>30 mins</Text>
              {/*Choice 3*/}
              <Text>1 hour</Text>
              {/*Choice 4*/}
              <Text>1 day</Text>
            </RadioButtons>
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
  }
})