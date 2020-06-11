import { StyleSheet } from 'react-native'

const timetableHeight = 530

export const TimetableStyles = StyleSheet.create({
  content: {
    marginTop: 10,
    flexDirection: 'row',
    alignSelf: 'stretch',
    height: timetableHeight,
  },
  substituteRow: {
    flex: 0.5,
  },
  hourColumn: {
    width: '20%',
  },
  hourText: {
    flex: 1,
    textAlign: 'center',
  },
  column: {
    width: 100
  },
  header: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    borderWidth: 1,
    borderRightWidth: 0,
    borderColor: '#dddddd'
  },
  backgroundCell: {
    flex: 1,
    backgroundColor: 'rgba(220,220,220,0.2)',
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#dddddd'
  },
  blueCell: {
    position: "absolute",
    backgroundColor: '#588093', 
    position: 'absolute', 
    left: 2,
    width: 98,
    borderBottomWidth: 2,
    borderColor: 'rgb(25,25,112)'
  },
  lessonDuration: {
    color: 'rgba(255,255,255,0.7)'
  },
  lessonName: {
    color: 'white', 
    fontWeight: 'bold'
  },
  addButton: {
    position: 'absolute',
    bottom: 10, 
    right: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
})