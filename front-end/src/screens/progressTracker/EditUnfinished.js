import React, { useState, useContext, useEffect } from 'react'
import { View, Text, TouchableWithoutFeedback, Keyboard, TouchableOpacity, TextInput, Alert, StyleSheet } from 'react-native'
import { PrettyTextInput, UserIdContext, Spinner, YellowHeader } from '../../components/index'
import wrapper from '../../utils/data-fetchers/fetchingWrapper';
import { addOrEdit, link, deleteT, completeTask } from '../../utils/progress-tracker-task-handler';

export default function Finished({ navigation, route }) {
    let { title, taskId, details, isAdd, moduleId, reference, newRefId, isHost, willHost, data } = route.params;
    const userId = useContext(UserIdContext);
    const [loading, setLoading] = useState(false);

    const [newTitle, setTitle] = useState(title);
    const [newDetails, setDetails] = useState(details);

    useEffect(() => {
        console.log(route.params);
    }, []);

    const handleAdd = () => {
        console.log(route.params);
        if (newTitle === "") Alert.alert("", "Please input the title!");
        else {
            setLoading(true);

            let callback = async () => {
                let newTaskId = await addOrEdit(isAdd, userId, moduleId, taskId, newTitle, false, newDetails);

                if (willHost || newRefId !== "") await link(userId, moduleId, newTaskId, newTitle, false, reference, newRefId)
            }

            wrapper(callback,
                response => { setLoading(false); navigation.goBack(); })
        }
    }

    const handleDelete = () => {
        setLoading(true);
        wrapper(() => deleteT(userId, taskId, false, reference, moduleId), response => { setLoading(false); navigation.goBack(); })
    }

    const handleFinish = () => {
        setLoading(true);
        wrapper(() => completeTask(userId, moduleId, title, taskId, reference, true), response => { setLoading(false); navigation.goBack(); })
    }

    const OptionalDelete = () => {
        if (!isAdd) {
            return (
                < View style={{ flex: 1, alignItems: 'center' }}>
                    <TouchableOpacity onPress={handleDelete} style={styles.DoneButton}>
                        <Text style={{ color: "white" }}>Delete</Text>
                    </TouchableOpacity>
                </View >
            )
        }
    }

    const OptionalFinish = () => {
        if (!isAdd) {
            return (
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <TouchableOpacity onPress={handleFinish} style={styles.DoneButton}>
                        <Text style={{ color: "white" }}>Complete</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
            <View style={{ flex: 1 }}>
                <YellowHeader title={isAdd ? "Add task" : "Edit task"} onPressBack={() => navigation.pop()} />
                <Spinner
                    visible={loading}
                />
                {/*Title input*/}
                <View style={styles.InputWithTitle}>
                    <PrettyTextInput
                        onChangeText={setTitle}
                        value={newTitle}
                        placeholder="What have yet to finished?"
                    />
                    <Text>Title</Text>
                </View>

                {/*Progress percentage input*/}
                <View style={styles.InputWithTitle} >
                    <PrettyTextInput
                        onChangeText={setDetails}
                        value={newDetails}
                        placeholder="How much have you done?"
                    />
                    <Text>Progress</Text>
                </View>

                <View style={{ flex: 1, alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Link', { moduleId: moduleId, refId: reference, isHost: isHost, data: data })}
                        style={styles.DoneButton}>

                        <Text style={{ color: "white" }}>Link option</Text>

                    </TouchableOpacity>
                    <Text>{willHost ? "host a task" : (newRefId !== "" ? "linked to a public task" : "")}</Text>
                </View>

                {OptionalFinish()}

                {OptionalDelete()}

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
