import React, { useState, useEffect, useContext } from 'react'
import { View, FlatList, TouchableWithoutFeedback,
  Keyboard, TouchableOpacity, Text, StyleSheet, Animated
} from 'react-native'
import {Notifications} from 'expo'
import { useIsFocused } from '@react-navigation/native'
import Spinner from 'react-native-loading-spinner-overlay';
import { TodoStyles } from '../../../style/TodoStyles.js'
import TodoItem from './TodoItem.js'
import { UserIdContext } from '../../components/index'
import { allTasks, deleteTask } from './DataFetcher'
import { AntDesign } from '@expo/vector-icons';

export default function TodoList({ navigation }) {
  const isFocused = useIsFocused()
  
  const userId = useContext(UserIdContext)

  const [todos, setTodos] = useState([]) 
  // array of deadlines/tasks
  const [loading, setLoading] = useState(true)
  // represent whether the screen is currenly loading

  const [toDelete, setToDelete] = useState({})
  // list of item selected to be delete

  const [notiToBeCanceled, setNotiToBeCanceled] = useState({})

  const deleteTranslateY = useState(new Animated.Value(130))[0]
  // translateY of the delete slider when long press an item

  const viewUnderFlatListHeight = useState(new Animated.Value(20))[0]

  const [inDeleteMode, setInDeleteMode] = useState(false)

  function changeDeleteState(itemId, state, notiList) {
    setToDelete(prev => {
      return {
        ...prev,
        [itemId]: state
      }
    })
    if (state === true) setNotiToBeCanceled(prev => {
      return {
        ...prev,
        [itemId]: {...notiList}
      }
    })
  }

  useEffect(() => {
    setLoading(true)
    var ok = true
    Object.keys(toDelete).forEach(key => {
      if (typeof notiToBeCanceled[key] === 'undefined') ok = false
    })
    if (ok) setLoading(false)
  }, [notiToBeCanceled, toDelete])

  function openDeleteMode(itemId, notiList) {
    changeDeleteState(itemId, true, notiList)
    setInDeleteMode(true),
    slideIn()
  }

  function slideIn() {
    const a = Animated.timing(deleteTranslateY, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    })
    const b = Animated.timing(viewUnderFlatListHeight, {
      toValue: 130,
      duration: 250,
      useNativeDriver: false,
    })
    Animated.parallel([a, b]).start()
  }

  function slideOut() {
    const a = Animated.timing(deleteTranslateY, {
      toValue: 130,
      duration: 250,
      useNativeDriver: true
    })
    const b = Animated.timing(viewUnderFlatListHeight, {
      toValue: 20,
      duration: 250,
      useNativeDriver: false
    })
    Animated.parallel([a, b]).start()
    setToDelete({})
    setNotiToBeCanceled({})
    setInDeleteMode(false)
  }

  function handleDelete() {
    let deletePromises = []
    Object.keys(toDelete).map(id => {
        if (toDelete[id] === true) {
          let promise = deleteTask(userId, id)
          deletePromises.push(promise)
          let notiList = notiToBeCanceled[id]
          Object.values(notiList).forEach(value => {
            Notifications.cancelScheduledNotificationAsync(value) 
          })
        }
    })
    setLoading(true)
    Promise.all(deletePromises).then(() => {
      // refetch data
      allTasks(userId)
      .then(tasksWithCorrectDateFormat => setTodos(tasksWithCorrectDateFormat))
      .then(() => {
        slideOut()
        setLoading(false)
      })
    })
  }
        
  // get data from api
  // id cannot be -1
  useEffect(() => {
    if (isFocused) {
      setLoading(true)
      allTasks(userId)
      .then(tasksWithCorrectDateFormat => setTodos(tasksWithCorrectDateFormat))
      .then(() => setLoading(false))
    }
  }, [isFocused])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Spinner
            visible={loading}
            textContent='Loading...'
            textStyle={TodoStyles.spinner}
          />
          <View style={TodoStyles.list}>
            <FlatList
              keyExtractor={(item) => item.id.toString()}
              data={todos}
              renderItem={({item}) => (
                <TodoItem 
                  item={item} 
                  navigation={navigation}
                  inDeleteMode={inDeleteMode}
                  selected={toDelete[item.id] === true ? true : false}
                  changeDeleteState={changeDeleteState}
                  openDeleteMode={openDeleteMode}
                />
              )}
            />
          </View>
          <Animated.View style={{height: viewUnderFlatListHeight}}></Animated.View>
        </View>
        <View style={styles.plusContainer}>
          <TouchableOpacity style={styles.plus} onPress={() => navigation.navigate('AddDeadline')}>
            <AntDesign 
              name="pluscircle" 
              size={60} 
              color="#e76f51" 
            />
          </TouchableOpacity>
        </View>
        <Animated.View style={[
            styles.deleteContainer,
            {transform: [{translateY: deleteTranslateY}]}
          ]}
        >
          <TouchableOpacity style={styles.deleteContainer2} onPress={handleDelete}>
              <Text>Delete</Text>
          </TouchableOpacity>
          <View style={{height: 10}}></View>
          <TouchableOpacity style={styles.deleteContainer2} onPress={slideOut}>
              <Text>Cancel</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 0,
  },
  plusContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    right: 0,
    left: 0,
    bottom: 0,
  },
  plus: {
    marginBottom: 10,
    borderWidth: 7,
    borderColor: 'white',
    borderRadius: 50,
  },
  deleteContainer: {
    position: 'absolute',
    bottom: 0,
    transform: [{translateY: 130}],
    height: 130,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e76f51',
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  deleteContainer2: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelText: {
    fontFamily: 'sourcesanspro-regular',
    fontSize: 20,
  }
})