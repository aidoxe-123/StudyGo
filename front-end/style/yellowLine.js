import { StyleSheet } from 'react-native'

export const YellowLine = StyleSheet.create({
  header: {
    padding: 10,
    backgroundColor: 'rgb(245,199,26)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
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
    fontSize: 16,
    paddingHorizontal: 5,
  },
  whiteButtonIcon: {
    paddingHorizontal: 5,
  },
  headerText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
})