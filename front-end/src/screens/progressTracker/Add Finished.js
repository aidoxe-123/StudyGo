import React, { useState } from 'react'
import { View, Text, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Alert, StyleSheet } from 'react-native'
import { PrettyTextInput, RadioButtons } from './../../components/index'
export default function Finished({ navigation }) {
    const [title, setTitle] = useState("");
    const [mark, setMark] = useState("");
    const [choice, setChoice] = useState(0);

    const handleTitleInput = (text) => { setTitle(text); }
    const handleMarkInput = (text) => { setMark(text); }
    const handleAdd = () => {
        if (title === "") Alert.alert("", "Please input the title!");
        else {
            switch (choice) {
                case 0: Alert.alert("", title + " Not graded yet");
                    break;
                case 1: Alert.alert("", title + " Ungraded");
                    break;
                case 2:
                    if (mark === "") {
                        Alert.alert("", "Please input your mark!");
                        return;
                    }
                    Alert.alert("", title + " Score: " + mark);
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
                <RadioButtons onPressIndex={handleChoice} initialChoice={choice}>
                    <Text>Not graded yet</Text>

                    <Text>Ungraded</Text>

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