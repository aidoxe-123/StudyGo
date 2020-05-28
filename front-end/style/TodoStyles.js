import { StyleSheet } from 'react-native'

export const TodoStyles = StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: '#fff',
      flex: 1,
    },
    spinner: {
      color: '#fff'
    },
    addTask: {
      fontSize: 20,
      fontWeight: 'bold',
      padding: 10,
      textAlign: 'center',
      borderStyle: 'dashed',
      borderWidth: 1,
      borderRadius: 10,
    },
    list: {
      marginTop: 20,
      flex: 1,
    },
})