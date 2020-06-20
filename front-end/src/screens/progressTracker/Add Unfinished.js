// import React, { useState, useContext } from 'react'
// import { View, Text, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Alert, StyleSheet } from 'react-native'
// import { PrettyTextInput, UserIdContext } from '../../components/index'
// import wrapper from '../../utils/data-fetchers/fetchingWrapper';
// import { addTask } from '../../utils/data-fetchers/ProgressTracker';

// export default function Finished({ navigation, route }) {
//     const [title, setTitle] = useState("");
//     const [progress, setProgress] = useState("");
//     const userId = useContext(UserIdContext)

//     const handleTitleInput = (text) => { setTitle(text); }
//     const handleProgressInput = (text) => { setProgress(text); }

//     const handleAdd = () => {
//         if (title === "") Alert.alert("", "Please input the title!");
//         else {
//             wrapper(() => addTask(userId, route.params.moduleId, title, false, progress),
//                 response => navigation.goBack());
//         }
//     }

//     return (
//         <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
//             <View style={{ flex: 1 }}>
//                 {/*Title input*/}
//                 <View style={styles.InputWithTitle}>
//                     <PrettyTextInput
//                         onChangeText={text => handleTitleInput(text)}
//                         value={title}
//                         placeholder="What have yet to finished?"
//                     />
//                     <Text>Title</Text>
//                 </View>
//                 {/*Progress percentage input*/}
//                 <View style={styles.InputWithTitle} >
//                     <PrettyTextInput
//                         onChangeText={text => handleProgressInput(text)}
//                         value={progress}
//                         placeholder="How much have you done?"
//                     />
//                     <Text>Progress</Text>
//                 </View>

//                 <View style={{ flex: 1, alignItems: 'center' }}>
//                     <TouchableOpacity onPress={() => handleAdd()} style={styles.DoneButton}>
//                         <Text style={{ color: "white" }}>Done</Text>
//                     </TouchableOpacity>
//                 </View>
//                 {/*Add button*/}
//             </View>
//         </TouchableWithoutFeedback>

//     )
// }

// const styles = StyleSheet.create({
//     InputWithTitle: {
//         flexDirection: 'column',
//         justifyContent: "space-between",
//         padding: "5%"
//     },
//     DoneButton: {
//         alignItems: "center",
//         aspectRatio: 5 / 2,
//         backgroundColor: "coral",
//         padding: 10
//     }
// }
// )
