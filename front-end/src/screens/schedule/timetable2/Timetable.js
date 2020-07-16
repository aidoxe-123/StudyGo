import React, {useContext, useState, useEffect, useRef} from 'react'
import { 
  View, Text, TouchableWithoutFeedback, Platform,
  Keyboard, TouchableOpacity, ScrollView, StatusBar, StyleSheet, Dimensions
} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay';
import { Ionicons, AntDesign } from '@expo/vector-icons'
import { YellowLine } from '../../../../style/yellowLine'
import { UserIdContext } from '../../../components/index'
import DayNameColumn from './DayNameColumn'
import HourTitle from './HourTitle'
import DayRow from './DayRow'
import EditModal from './EditModal'
import AddModal from './AddModal'
import {allClasses, editClass, deleteClass, addClass} from './DataFetcher.js'

export default function Timetable({navigation}) {
  const userId = useContext(UserIdContext)

  const [loading, setLoading] = useState(false)

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
    friday: [],
    saturday: [],
    sunday: []
  }) 

  // when first mount
  useEffect(fetchData, [])

  function fetchData() {
    setLoading(true)
    allClasses(userId).then(data => {
      setLessons(data.timetable)
      setLoading(false)
    })
  }

  function handleEdit(lesson, taskId) {
    editClass(userId, taskId, lesson, lesson.day).then(fetchData)
  }

  function handleDelete(taskId) {
    deleteClass(userId, taskId).then(fetchData).then(handleCloseEditModal)
  }

  function handleAdd(lesson) {
    addClass(userId, lesson.day, lesson).then(fetchData).then(handleCloseAddModal)
  }

  // for the opening and closure of edit modal
  // -------------------------------------------------
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
  ///////////////////////////////////////////////////////////////////

  // for opening and closure of add modal
  // ---------------------------------------------------------------
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
  ///////////////////////////////////////////////////////////////////

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Spinner
          visible={loading}
          textContent='Loading...'
          textStyle={{color: "#fff"}}
        />
        {/* title */}
        <View style={YellowLine.header}>
          <Text style={YellowLine.headerText}>Timetable</Text>
          <TouchableOpacity 
            style={YellowLine.rightWhiteButton} 
            onPress={() => navigation.navigate('Calendar')}
          >
              <View style={YellowLine.insideWhiteButton}>
                  <Text style={YellowLine.whiteButtonText}>Calendar</Text>
                  <Ionicons name='ios-arrow-forward' size={18} style={YellowLine.whiteButtonIcon}/>
              </View> 
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <DayNameColumn/>
          <View style={{flex: 1}} onStartShouldSetResponder={() => true}>
            <ScrollView horizontal={true} contentContainerStyle={{flexGrow: 1}}>
              <TouchableWithoutFeedback>
              <View>
                <HourTitle/>
                <View style={{flexDirection: 'row'}}>
                  <View style={{width: 50}}/>
                  <View style={{width: 2400, borderBottomWidth: 1}}/>
                  <View style={{width: 50}}/>
                </View>
                <DayRow lessons={lessons.monday} openModal={openEditModal}/>
                <DayRow lessons={lessons.tuesday} openModal={openEditModal}/>
                <DayRow lessons={lessons.wednesday} openModal={openEditModal}/>
                <DayRow lessons={lessons.thursday} openModal={openEditModal}/>
                <DayRow lessons={lessons.friday} openModal={openEditModal}/>
                <DayRow lessons={lessons.saturday} openModal={openEditModal}/>
                <DayRow lessons={lessons.sunday} openModal={openEditModal}/>
                </View>
                </TouchableWithoutFeedback>
            </ScrollView>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.addButton} 
          onPress={openAddModal} 
          ref={addButtonPos}
        >
          <AntDesign name="pluscircle" size={50} color='#e76f51'/>
        </TouchableOpacity>
        { editModalVisible && 
          <EditModal 
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
        {
          addModalVisible && 
          <AddModal
            height={addModalHeight}
            width={addModalWidth}
            x={addModalX}
            y={addModalY}
            handleClose={handleCloseAddModal}   
            handleAdd={handleAdd} 
          />
        }
      </View> 
    </TouchableWithoutFeedback>
  )
}

const {height} = Dimensions.get('window')

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    alignSelf: 'stretch',
    marginBottom: 10,
    minHeight: height * 70 / 100
  },
  addButton: {
    position: 'absolute',
    bottom: 10, 
    right: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
})