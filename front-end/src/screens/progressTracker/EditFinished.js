import React, { useState, useContext } from 'react'
import { View, Text, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Alert, StyleSheet } from 'react-native'
import { PrettyTextInput, RadioButtons, UserIdContext, Spinner, YellowHeader } from '../../components/index'
import { updateTask } from '../../utils/data-fetchers/ProgressTracker';
import wrapper from '../../utils/data-fetchers/fetchingWrapper';


export default function Finished({ navigation, route }) {
    const map = { "Not graded yet": 0, "Ungraded": 1, graded: 2 };
    const { title, taskId, details } = route.params;
    const [newTitle, setTitle] = useState(title);
    const [newMark, setMark] = useState(details);
    const [choice, setChoice] = useState(details === "Not graded yet" ? 0 : (details === "Ungraded" ? 1 : 2));
    const userId = useContext(UserIdContext);
    const [loading, setLoading] = useState(false)

    const handleTitleInput = (text) => { setTitle(text); }
    const handleMarkInput = (text) => { setMark(text); }
    const handleAdd = () => {
        let details = "";
        if (title === "") Alert.alert("", "Please input the title!");
        else switch (choice) {
            case 0: details = "Not graded yet";
                break;
            case 1: details = "Ungraded";
                break;
            case 2:
                if (newMark === "") {
                    Alert.alert("", "Please input your mark!");
                    return;
                }
                details = newMark;
        }
        setLoading(true);
        wrapper(() => updateTask(userId, taskId, newTitle, true, details), response => { setLoading(false); navigation.goBack(); });

    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
            <View style={{ flex: 1 }}>
                <YellowHeader title="Edit task" onPressBack={() => navigation.pop()} />
                {/*Title input text box*/}
                <Spinner
                    visible={loading}
                />
                <View style={styles.InputWithTitle}>
                    <PrettyTextInput
                        onChangeText={text => handleTitleInput(text)}
                        value={newTitle}
                        placeholder="What have you finished?"
                    />
                    <Text>Title</Text>
                </View>
                {/*Radio buttons*/}
                <RadioButtons onPressIndex={(index) => setChoice(index)} initialChoice={choice}>
                    {/*Choice 1*/}
                    <Text>Not graded yet</Text>
                    {/*Choice 2*/}
                    <Text>Ungraded</Text>
                    {/*Choice 3*/}
                    <PrettyTextInput
                        onChangeText={text => handleMarkInput(text)}
                        value={choice === 2 ? newMark : ""}
                        placeholder="Mark (e.g. 38)"
                    />
                </RadioButtons>


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
})