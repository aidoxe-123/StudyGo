import { StyleSheet } from 'react-native'
import {TimetableStyles} from './TimetableStyles'

export const TimetableEditStyles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#00000080'
  },
  insideBlueBox: {
    flex: 1, 
    paddingHorizontal: 10, 
    paddingTop: 23
  },
  closeButton: {
    position: 'absolute', 
    right: 5, 
    top: 5, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  viewDescription: {
    fontSize: 20, 
    padding: 6
  },
  editDescriptionBox: {
    borderColor: 'grey', 
    borderWidth: 1, 
    padding: 5, 
    height: 160
  },
  editDescriptionInput: {
    textAlignVertical: 'top', 
    height: 150, 
    fontSize: 20
  },
  doneButton: {
    position: 'absolute',
    bottom: 10,
    right: 70,
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: 'rgb(60,179,113)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  penButton: {
    position: 'absolute',
    bottom: 10,
    right: 10, 
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#588093',
    alignItems: 'center',
    justifyContent: 'center'
  },
  editDayTimeRow: {
    flexDirection: 'row'
  },
  duration: {
    ...TimetableStyles.lessonDuration,
    fontSize: 20,
  },
  name: {
    ...TimetableStyles.lessonName,
    fontSize: 30
  },
  dayDropdown: {
    color: 'rgba(255,255,255,0.7)', 
    transform: [
      {scaleX: 16/14}, 
      {scaleY: 16/14}, 
      {translateX: 5}, 
      {translateY: -9}
    ]
  },
  deleteButton: {
    position: 'absolute',
    bottom: 10,
    right: 130,
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center'
  }
})