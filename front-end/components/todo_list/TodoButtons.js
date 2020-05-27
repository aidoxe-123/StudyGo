import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import { MaterialIcons, Feather } from '@expo/vector-icons'
import { TodoStyles } from '../../style/TodoStyles.js'

// the pen and bin icons on the right of each todoItem
export default function TodoButtons({item, handleDelete, changeEditId}) {
  return (
    <View style={TodoStyles.todoButton}>
      <TouchableOpacity onPress={() => changeEditId(item)}>
        <Feather name='edit-2' size={18} color='#333' />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDelete(item.id)}>
        <MaterialIcons name='delete' size={18} color='#333' />
      </TouchableOpacity>
    </View>
  )
}