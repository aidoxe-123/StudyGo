import React, { useContext } from 'react'
import { View, Text } from 'react-native'
import { UserIdContext} from '../../routes/MainDrawer'

export default function ProgressTracker() {
  const userId = useContext(UserIdContext)
  
  return (
    <View>
      <Text>This is the progress tracker page</Text>
      <Text>{userId}</Text>
    </View>
  )
}