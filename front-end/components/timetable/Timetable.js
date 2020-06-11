import React, {useContext, useState, useEffect, useRef} from 'react'
import { 
  View, Text, TouchableWithoutFeedback, Platform,
  Keyboard, TouchableOpacity, ScrollView, StatusBar
} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay';
import { Ionicons, AntDesign } from '@expo/vector-icons'
import { YellowLine } from '../../style/yellowLine'
import { TimetableStyles } from '../../style/TimetableStyles'
import { UserIdContext } from '../../shared component/UserIdContext'
import TimetableHourColumn from './TimetableHourColumn'
import TimetableColumn from './TimetableColumn'
import TimetableEditModal from './TimetableEditModal'
import TimetableEmptyColumn from './TimetableEmptyColumn'
import TimetableAddModal from './TimetableAddModal'


export default function Timetable() {
  const userId = useContext(UserIdContext)

  const [loading, setLoading] = useState(true)


  // for the edit modal
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [editModalHeight, setEditModalHeight] = useState(null)
  const [editModalWidth, setEditModalWidth] = useState(null)
  const [editModalX, setEditModalX] = useState(null)
  const [editModalY, setEditModalY] = useState(null)
  const [editedLesson, setEditedLesson] = useState(null) // the current lesson being opened in modal

  // for the add modal
  const addButtonPos = useRef(null)
  const [addModalVisible, setAddModalVisible] = useState(false)
  const [addModalHeight, setAddModalHeight] = useState(null)
  const [addModalWidth, setAddModalWidth] = useState(null)
  const [addModalX, setAddModalX] = useState(null)
  const [addModalY, setAddModalY] = useState(null)

  const [lessons, setLessons] = useState({
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: []
  }) 

  function fetchData() {
    setLoading(true)
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        userId: userId
      })
    }
    fetch('https://fir-tut2-82e4f.firebaseapp.com/api/v1/timetable/all', requestOptions)
        .then(res => res.json())
        .then(data => setLessons(data.timetable))
        .then(() => setLoading(false))
        .catch(error => console.log(error))
  }
  useEffect(() => {
    fetchData()
  }, [])

  function handleEdit(lesson, id) {
    const requestOptions = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        userId: userId,
        taskId: id,
        newTask: lesson,
        newDay: lesson.day        
      })
    }
    fetch('https://fir-tut2-82e4f.firebaseapp.com/api/v1/timetable', requestOptions)
      .catch(error => console.log(error))
      .then(() => fetchData())
  }

  function handleDelete(id) {
    const requestOptions = {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        userId: userId,
        taskId: id,
      })
    }
    fetch('https://fir-tut2-82e4f.firebaseapp.com/api/v1/timetable', requestOptions)
      .catch(error => console.log(error))
      .then(() => fetchData())
      .then(() => handleCloseEditModal())
  }

  function openEditModal(height, width, x, y, lesson) {
    setEditModalHeight(height)
    setEditModalWidth(width)
    setEditModalX(x)
    setEditModalY(Platform.OS === 'ios' ? y : y - StatusBar.currentHeight)
    setEditedLesson(lesson)
  }

  useEffect(() => {
    if (editModalHeight !== null && editModalWidth !== null && 
        editModalX !== null && editModalY !== null && editedLesson !== null) { 
      // wait for the setState in openEditModal to finish
      setEditModalVisible(true)
    }
  }, [editModalHeight, editModalWidth, editModalX, editModalY, editedLesson])

  function handleCloseEditModal() {
    setEditModalVisible(false)
    setEditModalHeight(null)
    setEditModalWidth(null)
    setEditModalX(null)
    setEditModalY(null)
    setEditedLesson(null)
  }

  function openAddModal() {
    addButtonPos.current.measure((fx, fy, width, height, px, py) => {
      setAddModalHeight(height)
      setAddModalWidth(width)
      setAddModalX(px)
      setAddModalY(py)
    })
  }

  useEffect(() => {
    if (addModalHeight !== null && addModalWidth !== null && addModalX !== null && addModalY !== null) {
      // wait for the set states in openAddModal to finish
      setAddModalVisible(true)
    }
  }, [addModalHeight, addModalWidth, addModalX, addModalY])

  function handleCloseAddModal() {
    setAddModalVisible(false)
    setAddModalHeight(null)
    setAddModalWidth(null)
    setAddModalX(null)
    setAddModalY(null)
  }

  function handleAdd(lesson) {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        userId: userId,
        day: lesson.day,
        task: lesson     
      })
    }
    fetch('https://fir-tut2-82e4f.firebaseapp.com/api/v1/timetable', requestOptions)
      .then(() => fetchData())
      .then(() => handleCloseAddModal())
      .catch(error => console.log(error))
  } 
  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Spinner
          visible={loading}
          textContent='Loading...'
          textStyle={{color: "#fff"}}
        />
        <View style={YellowLine.header}>
          <Text h1 style={YellowLine.headerText}>Timetable</Text>
          <TouchableOpacity style={YellowLine.rightWhiteButton}>
              <View style={YellowLine.insideWhiteButton}>
                  <Text style={YellowLine.whiteButtonText}>Calendar</Text>
                  <Ionicons name='ios-arrow-forward' size={18} style={YellowLine.whiteButtonIcon}/>
              </View> 
          </TouchableOpacity>
        </View>
        { editModalVisible && 
          <TimetableEditModal 
            height={editModalHeight} 
            width={editModalWidth}
            x={editModalX}
            y={editModalY}
            handleClose={handleCloseEditModal}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            lesson={editedLesson}
          />
        }
        <View style={TimetableStyles.content}>
          <TimetableHourColumn />
          <ScrollView 
            horizontal={true} 
            showsHorizontalScrollIndicator={false} 
            scrollEventThrottle={16}
            style={{width: '80%'}}
          >
            <TimetableColumn dateName='monday' lessons={lessons.monday} openModal={openEditModal}/>
            <TimetableColumn dateName='tuesday' lessons={lessons.tuesday} openModal={openEditModal}/>
            <TimetableColumn dateName='wednesday' lessons={lessons.wednesday} openModal={openEditModal}/>
            <TimetableColumn dateName='thursday' lessons={lessons.thursday} openModal={openEditModal}/>
            <TimetableColumn dateName='friday' lessons={lessons.friday} openModal={openEditModal}/>
            <TimetableEmptyColumn />
          </ScrollView>
        </View>
        {
          addModalVisible && 
          <TimetableAddModal
            height={addModalHeight}
            width={addModalWidth}
            x={addModalX}
            y={addModalY}
            handleClose={handleCloseAddModal}   
            handleAdd={handleAdd} 
          />
        }
        <TouchableOpacity style={TimetableStyles.addButton} onPress={openAddModal} ref={addButtonPos}>
          <AntDesign name="pluscircle" size={50} color="coral"/>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  )
}