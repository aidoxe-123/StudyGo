import React, { useState, useContext } from 'react'
import { View, Text, TouchableWithoutFeedback, Keyboard, TouchableOpacity, TextInput, Alert, StyleSheet } from 'react-native'
import { PrettyTextInput, UserIdContext, Spinner } from '../../components/index'
import { updateTask, addTask } from '../../utils/data-fetchers/ProgressTracker';
import wrapper from '../../utils/data-fetchers/fetchingWrapper';

export default function Finished({ navigation, route }) {
    const { title, taskId, details, isAdd, moduleId } = route.params;
    const [newTitle, setTitle] = useState(title);
    const [newProgress, setProgress] = useState(details);
    const userId = useContext(UserIdContext);
    const [loading, setLoading] = useState(false)

    const handleTitleInput = (text) => { setTitle(text); }
    const handleProgressInput = (text) => { setProgress(text); }

    const handleAdd = () => {
        if (newTitle === "") Alert.alert("", "Please input the title!");
        else {
            setLoading(true);

            wrapper(() => isAdd
                ? addTask(userId, moduleId, newTitle, false, newProgress)
                : updateTask(userId, taskId, newTitle, false, newProgress),
                response => { setLoading(false); navigation.goBack(); })
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
            <View style={{ flex: 1 }}>
                <Spinner
                    visible={loading}
                />
                {/*Title input*/}
                <View style={styles.InputWithTitle}>
                    <PrettyTextInput
                        onChangeText={text => handleTitleInput(text)}
                        value={newTitle}
                        placeholder="What have yet to finished?"
                    />
                    <Text>Title</Text>
                </View>

                {/*Progress percentage input*/}
                <View style={styles.InputWithTitle} >
                    <PrettyTextInput
                        onChangeText={text => handleProgressInput(text)}
                        value={newProgress}
                        placeholder="How much have you done?"
                    />
                    <Text>Progress</Text>
                </View>

                {/*Add button*/}
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => handleAdd()} style={styles.DoneButton}>
                        <Text style={{ color: "white" }}>Done</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>

    )
}


const styles = StyleSheet.create({
    InputWithTitle: {
        flexDirection: 'column',
        justifyContent: "space-between",
        padding: "5%"
    },
    DoneButton: {
        alignItems: "center",
        aspectRatio: 5 / 2,
        backgroundColor: "coral",
        padding: 10
    }
}
)
