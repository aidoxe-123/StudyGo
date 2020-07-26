import React, { useContext, useState, useEffect } from 'react'
import { View, Text, TouchableWithoutFeedback, Keyboard, TouchableOpacity, TouchableHighlight, ScrollView, StyleSheet, Alert } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view';
import { useIsFocused } from '@react-navigation/native'
import { FloatingAdd, UserIdContext, Spinner } from '../../components/index'
import { getModules } from '../../utils/data-fetchers/ProgressTracker'
import wrapper from '../../utils/data-fetchers/fetchingWrapper'
import { deleteModuleRecursive } from "../../utils/progress-tracker-task-handler";
import {AntDesign} from '@expo/vector-icons'

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
    wrapper(() => deleteModuleRecursive(userId, moduleId),
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

  const line = (props) => (
    <View style={{height: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', ...props}}>
      <View style={{height: '80%', borderLeftWidth: 1, borderColor: '#e76f51', marginRight: 2}}></View>
      <View style={{height: '80%', borderLeftWidth: 1, borderColor: '#e76f51'}}></View>
    </View>
  )


  // handle the swipable button lists
  // --------------------------------
  const renderItem = data => (
    <TouchableHighlight
      style={{marginBottom: 10}}
      onPress={() => navigation.navigate('Module', { name: data.item.text, moduleId: data.item.key })}
    >
      <View style={styles.rowFront}>
        <View style={styles.leftMarker}/>
        <View style={styles.itemContent}>
          <Text style={[{fontSize: 25 }, styles.text]}>{data.item.key}</Text>
          <Text style={[{ fontSize: 20 }, styles.text]}>{data.item.text}</Text>
          {line({position: 'absolute', right: '2%'})} 
        </View>
      </View>
    </TouchableHighlight>
  );

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={styles.backRightBtn}
        onPress={() => handleDeleteButton(data.item)}
      >
        <AntDesign name="delete" size={24} color="white" />
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

          rightOpenValue={-100}
          disableRightSwipe
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
    padding: 20
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    borderBottomColor: '#e76f51',
    height: 100,
    flexDirection: 'row',
  },
  rowBack: {
    marginBottom: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    right: 0,
    height: '100%',
    justifyContent: 'center',
    position: 'absolute',
    width: 100,
    backgroundColor: '#d11a2a',
  },
  leftMarker: {
    backgroundColor: '#e76f51', 
    width: 20
  },
  itemContent: {
    flex: 1, 
    justifyContent: 'center', 
    padding: 20,
    backgroundColor: '#e76f5150'
  },
  text: {
    fontFamily: 'sourcesanspro-regular'
  }
});