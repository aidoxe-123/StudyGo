import React, { useContext, useState, useEffect, useRef } from 'react'
import {
  View, Text, TouchableWithoutFeedback, Platform,
  Keyboard, TouchableOpacity, ScrollView, StatusBar, StyleSheet, Dimensions
} from 'react-native'
import { useHeaderHeight } from '@react-navigation/stack';
import Spinner from 'react-native-loading-spinner-overlay';
import { AntDesign } from '@expo/vector-icons'
import { UserIdContext } from '../../components/index'
import DayNameColumn from './DayNameColumn'
import HourTitle from './HourTitle'
import DayRow from './DayRow'
import EditModal from './EditModal'
import AddModal from './AddModal'
import { allClasses, editClass, deleteClass, addClass } from '../../utils/data-fetchers/Timetable'


export default function Timetable({ navigation }) {
  const HEADER_HEIGHT = useHeaderHeight();
  const SCREEN_HEIGHT = Dimensions.get('window').height
  
  const userId = useContext(UserIdContext)
  const [startHour, setStartHour] = useState(9)
  const [endHour, setEndHour] = useState(18)

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
  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    setLoading(true)
    return allClasses(userId).then(data => {
      setLessons(data.timetable)
      let start = 9 * 60
      let end = 0 * 60
      Object.keys(data.timetable).forEach(key => {
        let arr = data.timetable[key]
        for (i = 0; i < arr.length; i++) {
          let lesson = arr[i]
          start = Math.min(start, lesson.start)
          end = Math.max(end, lesson.end)
        }
      })
      start = Math.floor(start / 60)
      end = Math.ceil(end / 60)
      if (end - start < 8) end = start + 8
      setStartHour(start)
      setEndHour(end)
    }).then(() => {
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
    addClass(userId, lesson.day, lesson).then(() => fetchData().then(handleCloseAddModal))
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
      <View style={{ flex: 1, backgroundColor: 'white', height: SCREEN_HEIGHT - HEADER_HEIGHT }}>
        <Spinner
          visible={loading}
          textContent='Loading...'
          textStyle={{ color: "#fff" }}
        />
        <View style={styles.content}>
          <DayNameColumn />
          <View style={{ flex: 1 }} onStartShouldSetResponder={() => true}>
            <ScrollView horizontal={true} contentContainerStyle={{ flexGrow: 1 }}>
              <TouchableWithoutFeedback>
                <View>
                  <HourTitle startHour={startHour} endHour={endHour}/>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: 25 }} />
                    <View style={{ width: (endHour - startHour) * 50, borderBottomWidth: 1 }} />
                    <View style={{ width: 25 }} />
                  </View>
                  <DayRow lessons={lessons.monday} openModal={openEditModal} startHour={startHour} endHour={endHour}/>
                  <DayRow lessons={lessons.tuesday} openModal={openEditModal} startHour={startHour} endHour={endHour}/>
                  <DayRow lessons={lessons.wednesday} openModal={openEditModal} startHour={startHour} endHour={endHour}/>
                  <DayRow lessons={lessons.thursday} openModal={openEditModal} startHour={startHour} endHour={endHour}/>
                  <DayRow lessons={lessons.friday} openModal={openEditModal} startHour={startHour} endHour={endHour}/>
                  <DayRow lessons={lessons.saturday} openModal={openEditModal} startHour={startHour} endHour={endHour}/>
                  <DayRow lessons={lessons.sunday} openModal={openEditModal} startHour={startHour} endHour={endHour}/>
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
          <AntDesign name="pluscircle" size={50} color='#e76f51' />
        </TouchableOpacity>
        {editModalVisible &&
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

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    alignSelf: 'stretch',
    marginBottom: 10,
  },
  addButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
})