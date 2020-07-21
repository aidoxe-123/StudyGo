import React, { useState } from 'react'
//import { Platform, Modal } from 'react-native'
//import DateTimePicker from '@react-native-community/datetimepicker'
import DateTimePickerModal from "react-native-modal-datetime-picker";

/* A custom DatePicker to solve the DateTimePicker's UI problem between IOS and Android
  @param: 
    -showDatePicker: decide whether to display this component
    -date: the value represent on the DatePicker
    -handleChange: f(event, date) a function that takes in an event and a date to do something.
    This function will be called when the user close the DatePicker
    -onCancel: a function with no argument, called when user cancel setting date/time
    -mode: choose between 'date' (default) or 'time'
  @return: A custom DatePicker component to replace DateTimePicker of @react-native-community/datetimepicker
*/
export default function DatePicker({ showDatePicker, value, handleChange, onCancel, mode }) {
  // return (Platform.OS === 'ios'
  //   ? <Modal visible={showDatePicker}>
  //     <DateTimePicker
  //       value={value}
  //       textColor='black'
  //       onChange={handleChange}
  //       mode={typeof mode === 'undefined' ? 'date' : mode}
  //     />
  //   </Modal>
  //   : showDatePicker && <DateTimePicker
  //     value={value}
  //     onChange={handleChange}
  //     mode={typeof mode === 'undefined' ? 'date' : mode}
  //   />
  // )

  return (
    <DateTimePickerModal
      textColor='black'
      headerTextIOS={"Pick a " + (mode || 'date')}
      isVisible={showDatePicker}
      date={value}
      mode={mode || 'date'}
      onCancel={onCancel || (() => handleChange(undefined, value))}
      onConfirm={(time) => handleChange(undefined, time)} />
  )
}
