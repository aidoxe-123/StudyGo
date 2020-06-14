import React, { useContext, useState, useEffect } from 'react'
import { View, Text, TouchableWithoutFeedback, Keyboard, TouchableOpacity, TouchableHighlight, ScrollView, StyleSheet, Alert } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { YellowLine } from '../../style/yellowLine'
import { UserIdContext } from '../../shared component/UserIdContext'
import { SwipeListView } from 'react-native-swipe-list-view';
import { modulesSupplier, useFetch } from './DataFetcher';
import { useIsFocused } from '@react-navigation/native'

export default function ProgressTracker({ navigation }) {
  const userId = useContext(UserIdContext);
  const isFocus = useIsFocused();
  const [tasks, setTasks] = useState([]);
  // interact with database
  // ---------------------
  const handleDelete = (item) => {
    setTasks(tasks.filter(obj => (obj.key != item.text)));
  }

  useEffect(() => {
    if (isFocus) {
      setTasks([
        { key: "CS2020", text: "CS2030" },
        { key: "CS2040S", text: "CS2040S" },
        { key: "CS2100", text: "CS2100" },
        { key: "CS1101S", text: "CS1101S" }
      ])
    };
  }, [isFocus]);

  // handle actions
  //---------------------------------
  const handleDeleteButton = (item) => {
    Alert.alert(
      "",
      "Are you sure you want to delete this module?",
      [{
        text: "Cancel",
        style: "cancel"
      }, {
        text: "OK",
        onPress: () => handleDelete(item)
      }], { cancelable: false }
    );
  }
  ///////////////////////////////////


  // handle the swipable button lists
  // --------------------------------
  const renderItem = data => (
    <TouchableHighlight
      onPress={() => navigation.navigate('Module', { name: data.item.text })}
    >
      <View style={styles.rowFront}>
        <Text>{data.item.text}</Text>
      </View>
    </TouchableHighlight>
  );

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => handleDeleteButton(data.item)}
      >
        <Text style={{ color: "white" }}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
  ///////////////////////////////////

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/*list of all modules*/}
        <SwipeListView
          data={tasks}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}

          rightOpenValue={-75}
        />

        {/*add module button*/}
        <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate("Add Module")}>
          <AntDesign name="pluscircle" size={50} color="coral" />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomColor: 'coral',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },




  fab: {
    color: "red",
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  }
});