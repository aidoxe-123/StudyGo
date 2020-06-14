import React, { useContext, useState, Children } from 'react'
import { View, Text, TouchableWithoutFeedback, Keyboard, TouchableOpacity, TextInput, Alert, StyleSheet } from 'react-native'

export default function Finished({ navigation }) {
    const [title, setTitle] = useState("");
    const [color, setColor] = useState("grey");
    const [color2, setColor2] = useState("grey");
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
                    <TextInput
                        onChangeText={text => handleTitleInput(text)}
                        value={title}
                        onFocus={() => setColor("coral")}
                        onBlur={() => setColor("grey")}
                        placeholder="What have you finished?"
                        style={{ borderBottomColor: color, borderBottomWidth: 3 }}
                    />
                    <Text>Title</Text>
                </View>

                {/*Radio buttons*/}
                <RadioButtons onPressIndex={handleChoice} initialChoice={choice}>
                    {/*Choice 1*/}
                    <Text>Not graded yet</Text>
                    {/*Choice 2*/}
                    <Text>Ungraded</Text>
                    {/*Choice 3*/}
                    <TextInput
                        onChangeText={text => handleMarkInput(text)}
                        value={mark}
                        onFocus={() => setColor2("coral")}
                        onBlur={() => setColor2("grey")}
                        placeholder="Mark (e.g. 38)"
                        style={{ borderBottomColor: color2, borderBottomWidth: 3 }}
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

// props: style, selected, onPress
function RadioButton(props) {
    return (
        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={props.onPress} >
            <View style={[{
                height: 24,
                width: 24,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: '#000',
                alignItems: 'center',
                justifyContent: 'center'
            }, props.style]}>
                {
                    props.selected ?
                        <View style={{
                            height: 12,
                            width: 12,
                            borderRadius: 6,
                            backgroundColor: '#000',
                        }} />
                        : null
                }
            </View>
        </TouchableOpacity>
    );
}

// props: onPressIndex, initialChoice
function RadioButtons(props) {
    const [value, setValue] = useState(props.initialChoice);
    return (
        Children.map(props.children, (child, index) => (
            <View style={{ flexDirection: "row", alignItems: 'center' }}>
                <View style={{ padding: "5%" }}>
                    <RadioButton selected={value === index} onPress={() => {
                        setValue(index);
                        props.onPressIndex(index);
                    }}
                    />
                </View>
                {child}
            </View>
        ))
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