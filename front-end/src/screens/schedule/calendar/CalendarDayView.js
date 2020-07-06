import React, {useState, useContext} from 'react'
import { FlatList, View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'
import { AntDesign, Feather } from '@expo/vector-icons'
import CalendarTask from './CalendarTask'
import EditEventModal from './EditEventModal'
import { UserIdContext } from '../../../components/index'
import { deleteEvent } from './DataFetcher'

export default function CalendarDayView({tasks, dateString, refetchData}) {
  const userId = useContext(UserIdContext)
  const [isEditing, setIsEditing] = useState(false)
  const [selectedTask, setSelectedTask] = useState()

  // handle the delete button clicked event
  // --------------------------------------------
  const onDelete = ({item}) => {
    deleteEvent(userId, dateString, item.id)
    .then(() => refetchData(dateString))
    .then(() => Alert.alert('Delete', 'Task deleted', [{text: 'Ok'}]))
  }
  ///////////////////////////////////////////////

  // close the modal when finished editing
  // -----------------------------------------
  const onFinishEditing = () => {
    setIsEditing(false)
  }
  ////////////////////////////////////////////

  // handle the edit button clicked event
  // ------------------------------------------
  const onEdit = ({item}) => {
    setIsEditing(true)
    setSelectedTask(item)
  }
  /////////////////////////////////////////////

  // render the back of the swipe rows
  // --------------------------------------------
  const renderHiddenItem = (data, rowMap) => (  
    <View style={styles.rowBack}>
      <TouchableOpacity 
        style={styles.backLeftBtn}
        onPress={() => onDelete(data)}
      >
        <AntDesign name="delete" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.backRightBtn}
        onPress={() => onEdit(data)}
      >
        <Feather name="edit-2" size={24} color='white'/>
      </TouchableOpacity>
    </View>
  )
  ///////////////////////////////////////////////////

  // render the swipe rows
  // ------------------------------------------------
  const renderItem = data => (
    <View style={{backgroundColor: 'white'}}>
      <CalendarTask task={data.item} />
    </View>
  )
  ///////////////////////////////////////////////////

  return (
    <View style={{flex: 1, backgroundColor: '#ffffff'}}>
      <SwipeListView
        keyExtractor={item => item.id}
        data={tasks}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        showsVerticalScrollIndicator={false}
        leftOpenValue={75}
        rightOpenValue={-75}
      />
      { isEditing &&
        <EditEventModal 
          onFinishEditing={onFinishEditing} 
          task={selectedTask}
          refetchData={refetchData}
          dateString={dateString}
        />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#ffffff80',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backLeftBtn: {
    height: '100%',
    width: 75,
    backgroundColor: '#e76f51',
    alignItems: 'center',
    justifyContent: 'center'
  },
  backRightBtn: {
    height: '100%',
    width: 75,
    backgroundColor: '#51c9e7',
    alignItems: 'center',
    justifyContent: 'center'
  },
})