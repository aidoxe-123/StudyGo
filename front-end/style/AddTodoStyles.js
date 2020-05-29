import { StyleSheet } from 'react-native'

export const AddTodoStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    margin: 20,
  },
  label: {
    fontSize: 18,
  },
  input: {
    fontSize: 16,
    padding: 5,
    borderBottomWidth: 1,
    borderColor: 'grey',
  },
  dateView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  dateBox: {
    fontSize: 18,
    padding: 5,
    borderWidth: 1,
    borderColor: 'grey',
    marginRight: 10,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    padding: 6,
    minWidth: '20%',
    backgroundColor: 'coral',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center'
  }
})