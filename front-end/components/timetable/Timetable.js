import React from 'react'
import { View, Text } from 'react-native'

export default function Timetable({ route }) {
  console.log(route.params.userId)
  return (
    <View>
      <Text>{route.params.userId}</Text>
    </View>
  )
}