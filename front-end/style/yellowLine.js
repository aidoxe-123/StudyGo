import { StyleSheet } from 'react-native'

export const YellowLine = StyleSheet.create({
  header: {
    padding: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftWhiteButton: {
    borderRadius: 3,
    backgroundColor: '#fff',
    left: 10,
    position: 'absolute',
  },
  rightWhiteButton: {
    borderRadius: 3,
    backgroundColor: '#fff',
    right: 10,
    position: 'absolute',
  },
  insideWhiteButton: {
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  whiteButtonText: {
    fontFamily: 'raleway-medium',
    fontSize: 16,
    paddingHorizontal: 5,
    color: '#e76f51'
  },
  whiteButtonIcon: {
    paddingHorizontal: 5,
    color: '#e76f51'
  },
  headerText: {
    textAlign: 'center',
    fontFamily: 'raleway-bold',
    fontSize: 20,
    color: '#e76f51',
  },
})