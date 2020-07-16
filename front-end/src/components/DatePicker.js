import React from 'react'
import { Platform, Modal } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'

/* A custom DatePicker to solve the DateTimePicker's UI problem between IOS and Android
  @param: 
    -showDatePicker: decide whether to display this component
    -date: the value represent on the DatePicker
    -handleChange: f(event, date) a function that takes in an event and a date to do something.
    This function will be called when the user close the DatePicker
    -mode: choose between 'date' (default) or 'time'
  @return: A custom DatePicker component to replace DateTimePicker of @react-native-community/datetimepicker
*/
export default function DatePicker({ showDatePicker, value, handleChange, mode }) {
  return (Platform.OS === 'ios'
    ? <Modal visible={showDatePicker}>
      <DateTimePicker
        value={value}
        textColor='black'
        onChange={handleChange}
        mode={typeof mode === 'undefined' ? 'date' : mode}
      />
    </Modal>
    : showDatePicker && <DateTimePicker
      value={value}
      onChange={handleChange}
      mode={typeof mode === 'undefined' ? 'date' : mode}
    />
  )
}
