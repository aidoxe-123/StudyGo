import React, {useState, useRef} from 'react'
import { TouchableOpacity, Text, View, Modal } from 'react-native'
import { TimetableStyles } from '../../../style/TimetableStyles'

export default function TimetableCell({lesson, openModal}) {
  const thisCell = useRef(null)
  const rowUnit = 530 / 25.5
  const { name, start, end, description } = lesson

  const startHour = (Math.floor(start / 60) < 10 ? "0" + Math.floor(start / 60) : Math.floor(start / 60)) 
                  + ':' + (start % 60 < 10 ? "0" + (start % 60) : (start % 60))
  const endHour = (Math.floor(end / 60) < 10 ? "0" + Math.floor(end / 60) : Math.floor(end / 60)) 
                  + ':' + (end % 60 < 10 ? "0" + (end % 60) : (end % 60))
  const timeString = startHour + ' - ' + endHour // hh:mm-hh:mm
  
  function handleClick() {
    thisCell.current.measure( (fx, fy, width, height, px, py) => {
      // console.log(name)
      // console.log('Component width is: ' + width)
      // console.log('Component height is: ' + height)
      // console.log('X offset to frame: ' + fx)
      // console.log('Y offset to frame: ' + fy)
      // console.log('X offset to page: ' + px)
      // console.log('Y offset to page: ' + py)
      openModal(height, width, px, py, lesson)
    })
  }

  return (
    <TouchableOpacity 
      style={[TimetableStyles.blueCell,{
        top: (start / 60 + 1) * rowUnit, 
        height:  (end - start) / 60 * rowUnit
      }]}
      ref = {thisCell}
      onPress={handleClick}
    >
      {((end - start) / 60 >= 2) 
        ? <View>
            <Text style={[{paddingLeft: 5, paddingTop: 5, fontSize: 9}, TimetableStyles.lessonDuration]}>{timeString}</Text>
            <Text style={[{paddingLeft: 5, fontSize: 10}, TimetableStyles.lessonName]}>{name}</Text>
          </View>
        : ((end - start) / 60 >= 1) 
        && <Text style={[{paddingLeft: 5, fontSize: 10, paddingTop: 2}, TimetableStyles.lessonName]}>{name}</Text>
      }
    </TouchableOpacity>
  )
} 