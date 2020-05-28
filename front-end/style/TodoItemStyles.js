import { StyleSheet } from 'react-native'

export const TodoItemStyles = StyleSheet.create({
  task: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginTop: 16,
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 1,
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
  },
  rightColumn: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 20,
  }
})