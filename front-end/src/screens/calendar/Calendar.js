import React, { useContext, useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { Calendar as RNCalendar} from 'react-native-calendars'
import Spinner from 'react-native-loading-spinner-overlay';
import { UserIdContext } from '../../components/index'
import { getEvents } from './DataFetcher'
import CalendarDayView from './CalendarDayView'
import AddEventModal from './AddEventModal'

export default function Calendar({navigation}) {
  const userId = useContext(UserIdContext)

  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState()

  const [tasks, setTasks] = useState([]) // tasks in one date
  const [events, setEvents] = useState({})

  const [marked, setMarked] = useState({})
  // dot colors to be marked on calendars
  // --------------------------------------------------------------------------------------
  const special = {key: 'special', color: '#e76f51', selectedDotColor: 'white'} // red
  const deadline = {key: 'deadline', color: '#517ee7', selectedDotColor: 'white'} // blue
  const assessment = {key: 'assessment', color: '#51e7ba', selectedDotColor: 'white'} // yellow
  //////////////////////////////////////////////////////////////////////////////////////////////
  
  // get the data from the current month if the component is first fetched
  // -----------------------------------------------------------------------
  useEffect(() => {
    const currMonth = new Date().getMonth() + 1
    const currYear = new Date().getFullYear()
    getEvents(userId, currMonth, currYear).then(data => {
      setEvents(data)
      setLoading(false)
    })
  }, [])
  ///////////////////////////////////////////////////////////////////////////

  // re-assign the dots on the calendar every time the events are changed
  // -----------------------------------------------------------------------
  useEffect(() => {
    let markedDates = {}
    Object.keys(events).forEach(key => {
      let event = events[key]
      let dots = []
      for (var i = 0; i < event.length; i++) {
        let task = event[i]
        if (dots.length === 3) break
        switch (task.type) {
          case 'deadline':
            if (!dots.includes(deadline)) dots.push(deadline)
            break
          case 'assessment':
            if (!dots.includes(assessment)) dots.push(assessment)
            break
          case 'special':
            if (!dots.includes(special)) dots.push(special)
            break
          default:
        }
      }
      markedDates[key] = {dots}
    }) 
    setMarked(markedDates)
    if (typeof selected !== 'undefined') setTasks(events[selected])
  }, [events])
  ///////////////////////////////////////////////////////

  // re-fetch the data
  // ----------------------------------------------------
  function refetchData(dateString) {
    setLoading(true)
    let date = new Date(Date.parse(dateString))
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    getEvents(userId, month, year).then(data => {
      setEvents(data)
      setLoading(false)
    })
  }
  //////////////////////////////////////////////////////

  // change the data in the view below the calendar
  // -----------------------------------------------
  function handleDayPress(date) {
    setTasks(events[date.dateString])
    setSelected(date.dateString)
  }
  //////////////////////////////////////////////////

  // re-fetch the data every time the month is changed
  // ------------------------------------------------
  function handleMonthChange(month) {
    setLoading(true)
    setTasks([])
    setSelected(null)
    getEvents(userId, month.month, month.year).then(data => {
      setEvents(data)
      setLoading(false)
    })
  }
  /////////////////////////////////////////////////////

  // deal with the adding event modal
  // ------------------------------------------------
  const [isAdding, setIsAdding] = useState(false)
  const [addingDate, setAddingDate] = useState(null)

  useEffect(() => {
    if (addingDate === null) setIsAdding(false)
    else setIsAdding(true)
  }, [addingDate])

  function openAddModal(date) {
    setAddingDate(date.dateString)
  }

  function onFinishAdding() {
    setAddingDate(null)
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
      <View style={{flex: 1}}>
        <Spinner
          visible={loading}
          textContent='Loading...'
          textStyle={{color: "#fff"}}
        />
        <RNCalendar
          markedDates={{
            ...marked,
            [selected]: {
              selected: true,
              ...marked[selected]
            },
          }}
          markingType={'multi-dot'}
          onDayPress={handleDayPress}
          onDayLongPress={openAddModal}
          monthFormat={'MM yyyy'}
          onMonthChange={handleMonthChange}
          firstDay={1}
          theme={{
            arrowColor: '#e76f51',
            selectedDayBackgroundColor: '#e76f51',
            todayTextColor: '#e76f51',
          }}
        />
        <CalendarDayView tasks={tasks} dateString={selected} refetchData={refetchData}/>
        {
          isAdding &&
          <AddEventModal 
            onFinishAdding={onFinishAdding}
            refetchData={refetchData}
            dateString={addingDate}
          />
        }
      </View>
    </TouchableWithoutFeedback>
  )
}