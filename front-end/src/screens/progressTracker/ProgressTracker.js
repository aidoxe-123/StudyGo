import React, { useContext, useState, useEffect } from 'react'
import { View, Text, TouchableWithoutFeedback, Keyboard, TouchableOpacity, TouchableHighlight, ScrollView, StyleSheet, Alert } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view';
import { useIsFocused } from '@react-navigation/native'
import { FloatingAdd, UserIdContext, Spinner } from '../../components/index'
import { getModules, deleteModule } from '../../utils/data-fetchers/ProgressTracker'
import wrapper from '../../utils/data-fetchers/fetchingWrapper'

export default function ProgressTracker({ navigation }) {
  const userId = useContext(UserIdContext)
  const isFocus = useIsFocused();
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true);
    return wrapper(() => getModules(userId),
      response => { setModules(response.data.sort((o1, o2) => (o1.key > o2.key) ? 1 : -1)); setLoading(false) })

  }, [isFocus]);

  const handleDeleteModule = (moduleId) => {
    setLoading(true);
    setModules(modules.filter(item => item.key !== moduleId))
    wrapper(() => deleteModule(userId, moduleId),
      response => setLoading(false))
  }

  // handle actions
  //---------------------------------
  const handleDeleteButton = (item) => {
    Alert.alert(
      "",
      "Are you sure you want to delete this module?",
      [{
        text: "Cancel",
        style: 'cancel'
      }, {
        text: "OK",
        style: 'destructive',
        onPress: () => handleDeleteModule(item.key)
      }], { cancelable: false }
    );
  }
  ///////////////////////////////////


  // handle the swipable button lists
  // --------------------------------
  const renderItem = data => (
    <TouchableHighlight
      onPress={() => navigation.navigate('Module', { name: data.item.text, moduleId: data.item.key })}
    >
      <View style={styles.rowFront}>
        <Text style={{ fontSize: 18 }}>{data.item.key}</Text>
        <Text style={{ fontSize: 13 }}>{data.item.text}</Text>
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
        <Spinner
          visible={loading}
        />
        {/*list of all modules*/}
        <SwipeListView
          data={modules}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}

          rightOpenValue={-75}
        />

        {/*add module button*/}
        <FloatingAdd onPress={() => navigation.navigate("Add Module")} />
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
});