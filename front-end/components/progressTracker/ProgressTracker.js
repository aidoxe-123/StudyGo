import React, { useContext } from 'react'
import { View, Text } from 'react-native'
import { UserIdContext } from '../../shared component/UserIdContext'

export default function ProgressTracker() {
  const userId = useContext(UserIdContext)
  
  return (
    <View>
      <Text>This is the progress tracker page</Text>
      <Text>{userId}</Text>
    </View>
  )
}