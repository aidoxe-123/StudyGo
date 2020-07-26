import React, { useState, useContext } from 'react'
import {
    View, Text, TouchableWithoutFeedback,
    Keyboard, TouchableOpacity, Alert, StyleSheet
} from 'react-native'
import { YellowLine } from '../../../style/yellowLine'
import { Ionicons } from '@expo/vector-icons'
import { PrettyTextInput, RadioButtons, UserIdContext, Spinner } from '../../components/index'
import { updateTask, deleteTask } from '../../utils/data-fetchers/ProgressTracker';
import wrapper from '../../utils/data-fetchers/fetchingWrapper';
import { AntDesign } from '@expo/vector-icons'


export default function Finished({ navigation, route }) {
    const map = { "Not graded yet": 0, "Ungraded": 1, graded: 2 };
    const { title, taskId, details } = route.params;
    const [newTitle, setTitle] = useState(title);
    const [newMark2, setMark2] = useState("");
    const [newMark, setMark] = useState(details);
    const [choice, setChoice] = useState(details === "Not graded yet" ? 0 : (details === "Ungraded" ? 1 : 2));
    const userId = useContext(UserIdContext);
    const [loading, setLoading] = useState(false)

    const handleTitleInput = (text) => { setTitle(text); }
    const handleMarkInput = (text) => { setMark(text); setMark2(text) }
    const handleAdd = () => {
        let details = "";
        if (title === "") {
            Alert.alert("", "Please input the title!");
            return;
        }
        switch (choice) {
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

    const handleDelete = () => {
        setLoading(true);
        wrapper(() => deleteTask(userId, taskId),
            response => { setLoading(false); navigation.goBack(); })
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={YellowLine.header}>
                    <TouchableOpacity style={YellowLine.leftWhiteButton} onPress={() => navigation.pop()}>
                        <View style={YellowLine.insideWhiteButton}>
                            <Ionicons name='ios-arrow-back' size={18} style={YellowLine.whiteButtonIcon} />
                            <Text style={YellowLine.whiteButtonText}>Back</Text>
                        </View>
                    </TouchableOpacity>
                    <Text h1 style={YellowLine.headerText}>Edit task</Text>
                    <TouchableOpacity style={YellowLine.rightWhiteButton} onPress={handleAdd}>
                        <View style={YellowLine.insideWhiteButton}>
                            <Text style={YellowLine.whiteButtonText}>Save</Text>
                        </View>
                    </TouchableOpacity>
                </View>
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
                        blurOnSubmit={true}
                        onChangeText={text => handleMarkInput(text)}
                        value={newMark2}
                        placeholder="Mark (e.g. 38)"
                    />
                </RadioButtons>

                < View style={{ flex: 1, alignItems: 'center' }}>
                    <TouchableOpacity onPress={handleDelete} style={styles.DeleteBtn}>
                        <AntDesign name="delete" size={20} color="#d11a2a" />
                        <Text style={[{ color: "#d11a2a", paddingLeft: 5 }, styles.text]}>Delete</Text>
                    </TouchableOpacity>
                </View >
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
})