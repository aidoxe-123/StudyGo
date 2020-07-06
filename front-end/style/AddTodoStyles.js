import { StyleSheet } from 'react-native'

export const AddTodoStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  form: {
    margin: 20,
  },
  label: {
    fontFamily: 'sourcesanspro-regular',
    fontSize: 20,
  },
  input: {
    fontFamily: 'sourcesanspro-regular',
    fontSize: 20,
    padding: 5,
    borderBottomWidth: 1,
    borderColor: 'grey',
  },
  dateView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  dateBox: {
    fontFamily: 'sourcesanspro-regular',
    fontSize: 20,
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
    backgroundColor: '#fff',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#e76f51',
  },
  buttonText: {
    fontFamily: 'sourcesanspro-regular',
    fontSize: 20,
    color: '#e76f51',
    textAlign: 'center'
  }
})