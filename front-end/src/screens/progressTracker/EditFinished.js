import React, { useState } from 'react'
import { View, Text, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Alert, StyleSheet } from 'react-native'
import { PrettyTextInput, RadioButtons } from '../../components/index'

export default function Finished({ navigation, route }) {
    const map = { notGraded: 0, ungraded: 1, graded: 2 };
    const { title, mark, status } = route.params;
    const [newTitle, setTitle] = useState(title);
    const [newMark, setMark] = useState(mark);
    const [choice, setChoice] = useState(map[status]);


    const handleTitleInput = (text) => { setTitle(text); }
    const handleMarkInput = (text) => { setMark(text); }
    const handleAdd = () => {
        if (title === "") Alert.alert("", "Please input the title!");
        else {
            switch (choice) {
                case 0: Alert.alert("", newTitle + " Not graded yet");
                    break;
                case 1: Alert.alert("", newTitle + " Ungraded");
                    break;
                case 2:
                    if (mark === "") {
                        Alert.alert("", "Please input your mark!");
                        return;
                    }
                    Alert.alert("", newTitle + " Score: " + newMark);
                    break;
            }
            navigation.goBack();
        }
    }
    const handleChoice = (index) => {
        setChoice(index);
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
            <View style={{ flex: 1 }}>
                {/*Title input text box*/}
                <View style={styles.InputWithTitle}>
                    <PrettyTextInput
                        onChangeText={text => handleTitleInput(text)}
                        value={title}
                        placeholder="What have you finished?"
                    />
                    <Text>Title</Text>
                </View>
                {/*Radio buttons*/}
                <RadioButtons onPressIndex={handleChoice} initialChoice={map[status]}>
                    {/*Choice 1*/}
                    <Text>Not graded yet</Text>
                    {/*Choice 2*/}
                    <Text>Ungraded</Text>
                    {/*Choice 3*/}
                    <PrettyTextInput
                        onChangeText={text => handleMarkInput(text)}
                        value={mark}
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