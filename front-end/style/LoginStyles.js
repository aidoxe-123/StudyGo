import { StyleSheet } from 'react-native'

export const LoginStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#51c9e7', 
  },
  container2: {
    height: '80%',
    width: '70%',
    minHeight: 500
  },
  logoContainer: {
    height: 50,
    width: '100%',
    alignItems: 'center',
  },
  logo: {
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#51c9e7'
  },
  ggBtn: {
    height: 50,
    width: '90%',
    marginTop: 10,
    backgroundColor: '#dd4b39',
    alignItems: 'center',
    padding: '5%',
    flexDirection: 'row',
    borderRadius: 10,
  },
  ggBtnTxt: {
    paddingLeft: 10,
    fontFamily: 'sourcesanspro-regular',
    fontSize: 20,
    color: '#fff'
  },
  spinner: {
    color: '#fff'
  },
  whitePanel: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
    alignItems: 'center'
    
  },
  heading: {
    fontSize: 20,
  },
  input: {
    height: 50,
    width: '90%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    flexDirection: 'row',
    overflow: 'hidden'
  },
  inpIconContainer: {
    flex: 1,
    backgroundColor: '#d3d3d3',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    flex: 5,
    fontFamily: 'sourcesanspro-regular',
    fontSize: 20,
    padding: '5%'
  },
  wrongInputAlert: {
    color: 'red',
    fontSize: 10,
    fontFamily: 'sourcesanspro-regular',
    marginBottom: 10,
  },
  signInBtn: {
    height: 50,
    width: '90%',
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#51e76f',
    justifyContent: 'center',
    alignItems: 'center'
  },
  eyeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})