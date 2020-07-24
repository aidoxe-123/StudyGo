import React, {useRef} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Animated} from 'react-native'

export default function Cell({lesson, openModal, portionWidth}) {
  const thisCell = useRef(null)

  const {name, start, end} = lesson
  
  const startHour = toTwoDigitString(Math.floor(start / 60)) + ':' + toTwoDigitString(start % 60)
  const endHour = toTwoDigitString(Math.floor(end / 60)) + ':' + toTwoDigitString(end % 60)
  const timeString = startHour + ' - ' + endHour // hh:mm-hh:mm

  function toTwoDigitString(number) {
    return number < 10 ? '0' + number : '' + number
  }

  const left = Animated.multiply(portionWidth, new Animated.Value(start / 60 + 0.5))
  const classWidth = Animated.multiply(portionWidth, new Animated.Value((end - start) / 60))
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
    // <TouchableOpacity style={[
    //     styles.cell,
    //     {left: (start / 60 + 0.5) * 100, width: (end - start) / 60 * 100},
    //     end % 60 === 0 && end < 1440 && {borderRightWidth: 0}
    //   ]}
    //   ref = {thisCell}
    //   onPress={handleClick}
    // >
    //   <View style={{flex: 1}}>
    //     {(end - start) / 60.0 > 1.5 && <Text style={styles.time}>{timeString}</Text>}
    //     <Text style={styles.name}>{name}</Text>
    //   </View>
    // </TouchableOpacity>
    <Animated.View 
      style={[styles.cell, {width: classWidth, left: left}]} 
      ref={thisCell}
    >
      <TouchableOpacity style={{flex: 1}} onPress={handleClick}>
        <View style={{flex: 1}}>
          {
            (end - start) / 60.0 > 1.5 && 
            <Text style={styles.time}>{timeString}</Text>
          }
          <Text style={styles.name}>{name}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  cell: {
    backgroundColor: '#51c9e7', 
    position: 'absolute', 
    height: '100%',
    padding: 5,
    borderWidth: 1,
    borderTopWidth: 0  
  }, 
  time: {
    color: 'rgba(255,255,255,0.7)',
    fontFamily: 'sourcesanspro-regular',
    fontSize: 20
  },
  name: {
    color: 'white', 
    fontFamily: 'sourcesanspro-semibold',
    fontSize: 25
  }
})