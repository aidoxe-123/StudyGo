import React from 'react'
import { View, Text } from 'react-native'

export default function ProgressTracker({ route }) {
  const userId = route.params.userId
  
  return (
    <View>
      <Text>This is the progress tracker page</Text>
    </View>
  )
}