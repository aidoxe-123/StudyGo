import React from 'react'
import { View, Text } from 'react-native'
import Header from '../../shared component/Header'

export default function Timetable({ route }) {
  const userId = route.params.userId

  return (
    <View>
      <Text>This is the Timetable page</Text>
    </View>
  )
}