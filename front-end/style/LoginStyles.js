import { StyleSheet } from 'react-native'
import { RawButton } from 'react-native-gesture-handler'

// bootstap reference: https://bootsnipp.com/snippets/92gmX

export const LoginStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'coral', 
  },
  whitePanel: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    //height: '60%',
    minHeight: 400,
    position: 'absolute',
    width: '70%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
    zIndex: 0,
  },
  loginShow: {
    zIndex: 1,
    padding: 40,
    textAlign: 'left',
  }, 
  heading: {
    fontSize: 20,
  },
  input: {
    marginTop: 30,
    padding: 15,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  wrongInputAlert: {
    color: 'red',
    fontSize: 10,
  },
  bottomRow: {
    flexDirection: 'row',
    marginTop: 30,
    alignItems: 'center'
  },
  link: {
    fontSize: 16,
    color: 'green',
    textDecorationLine: 'underline',
  },
  button: {
    paddingVertical: 6,
    backgroundColor: 'grey',
    marginLeft: 'auto',
  },
  buttonText: {
      fontSize: 16,
      color: '#fff',
      textAlign: 'center',
      paddingHorizontal: 10,
  },
  invalidLogin: {
    color: 'red',
    marginTop: 30,
  },
})