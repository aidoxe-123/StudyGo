import React, { useState, useContext, useEffect } from 'react'
import { View, Text, TouchableWithoutFeedback, Keyboard, TouchableOpacity, TextInput, Alert, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { PrettyTextInput, UserIdContext, Spinner } from '../../components/index'
import { YellowLine } from '../../../style/yellowLine'
import { Ionicons, AntDesign } from '@expo/vector-icons'
import Slider from '@react-native-community/slider'
import wrapper from '../../utils/data-fetchers/fetchingWrapper';
import { addOrEdit, link, deleteT, completeTask, link2 } from '../../utils/progress-tracker-task-handler';

export default function Finished({ navigation, route }) {
    let { title, taskId, details, isAdd, moduleId, reference, newRefId, isHost, willHost, data } = route.params;
    const userId = useContext(UserIdContext);
    const [loading, setLoading] = useState(false);

    const [newTitle, setTitle] = useState(title);
    const [newDetails, setDetails] = useState(details);

    const handleAdd = () => {
        if (newTitle === "") Alert.alert("", "Please input the title!");
        else if (newDetails === "") Alert.alert("", "Please input your progress!");
        if (newDetails === '100%') {
            Alert.alert('', "Since this task's progress reaches 100%, it will be moved to finished task", [
                { text: 'Cancel' },
                { text: 'Proceed', onPress: handleFinish }
            ])
        } else {
            setLoading(true);

            let callback = async () => {
                let newTaskId = await addOrEdit(isAdd, userId, moduleId, taskId, newTitle, false, newDetails);
                if (willHost && !isHost && reference !== "") await link2(userId, moduleId, taskId, newTitle, false, reference);
                else if (willHost || isHost || newRefId !== reference) await link(userId, moduleId, newTaskId, newTitle, false, reference, newRefId)
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
                < View style={{ alignItems: 'center', padding: 10 }}>
                    <TouchableOpacity onPress={handleDelete} style={styles.DeleteBtn}>
                        <AntDesign name="delete" size={20} color="#d11a2a" />
                        <Text style={[{ color: "#d11a2a", paddingLeft: 5 }, styles.text]}>Delete</Text>
                    </TouchableOpacity>
                </View >
            )
        }
    }

    const OptionalFinish = () => {
        if (!isAdd) {
            return (
                <View style={{ alignItems: 'center', padding: 10 }}>
                    <TouchableOpacity onPress={handleFinish} style={styles.FinishBtn}>
                        <Text style={[{ color: "white" }, styles.text]}>Marked as finished</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    const openAnnotate = () => {
        Alert.alert('Link property',
            'Link property helps link similar task of different users together, ' +
            'so that you can keep track of where you are compared to your peers',
            [{ text: 'Ok' }]
        )
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={YellowLine.header}>
                    <TouchableOpacity style={YellowLine.leftWhiteButton} onPress={() => navigation.pop()}>
                        <View style={YellowLine.insideWhiteButton}>
                            <Ionicons name='ios-arrow-back' size={18} style={YellowLine.whiteButtonIcon} />
                            <Text style={YellowLine.whiteButtonText}>Back</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={YellowLine.rightWhiteButton} onPress={handleAdd}>
                        <View style={YellowLine.insideWhiteButton}>
                            <Text style={YellowLine.whiteButtonText}>Save</Text>
                        </View>
                    </TouchableOpacity>
                    <Text h1 style={YellowLine.headerText}>
                        {isAdd ? "New task" : "Edit task"}
                    </Text>
                </View>
                <Spinner
                    visible={loading}
                />
                {/*Title input*/}
                <View style={styles.InputWithTitle}>
                    <Text style={styles.text}>Title</Text>
                    <PrettyTextInput
                        onChangeText={setTitle}
                        value={newTitle}
                        placeholder="What is yet to be finished?"
                    />
                </View>

                {/*Progress percentage input*/}
                <View style={styles.InputWithTitle} >
                    <Text style={styles.text}>{'Progress: ' + newDetails}</Text>
                    <Slider
                        style={{ width: '100%' }}
                        minimumValue={0}
                        maximumValue={100}
                        step={1}
                        value={parseInt(newDetails ? newDetails : 0)}
                        onSlidingComplete={value => setDetails(value + '%')}
                    />
                </View>

                <View style={{ padding: '5%' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.text}>I want to... </Text>
                        <TouchableOpacity onPress={openAnnotate}>
                            <AntDesign name="questioncircleo" size={20} color="#e76f51" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={styles.text}>
                            {
                                willHost
                                    ? "Be the first one created this\ntask to track with others"
                                    : (newRefId !== ""
                                        ? "Track this task with others"
                                        : "Track the task by myself")
                            }
                        </Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Link', {
                                moduleId: moduleId,
                                refId: reference,
                                isHost: isHost,
                                data: data
                            })}
                        >
                            <Text style={[styles.text, { color: '#e76f51', fontSize: 18 }]}>Change</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    {OptionalDelete()}
                    {OptionalFinish()}
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
    DeleteBtn: {
        flexDirection: 'row',
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 10,
        borderWidth: 1,
        borderColor: '#d11a2a',
        borderRadius: 10,
    },
    text: {
        fontFamily: 'sourcesanspro-regular',
        fontSize: 20
    },
    FinishBtn: {
        borderRadius: 10,
        backgroundColor: '#51c9e7',
        padding: 10,
        alignItems: 'center'
    }
}
)
