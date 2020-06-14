import React, { useContext, useState, Children } from 'react'
import { View, Text, TouchableWithoutFeedback, Keyboard, TouchableOpacity, TextInput, Alert, StyleSheet } from 'react-native'

export default function Finished({ navigation, route }) {
    const { title, progress } = route.params;
    const [newTitle, setTitle] = useState(title);
    const [color, setColor] = useState("grey");
    const [newProgress, setProgress] = useState(progress);
    const [color2, setColor2] = useState("grey");

    const handleTitleInput = (text) => { setTitle(text); }
    const handleProgressInput = (text) => { setProgress(text); }

    const handleAdd = () => {
        if (newTitle === "") Alert.alert("", "Please input the title!");
        else {

            navigation.goBack();
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
            <View style={{ flex: 1 }}>
                {/*Title input*/}
                <View style={styles.InputWithTitle}>
                    <TextInput
                        onChangeText={text => handleTitleInput(text)}
                        value={title}
                        onFocus={() => setColor("coral")}
                        onBlur={() => setColor("grey")}
                        placeholder="What have yet to finished?"
                        style={{ borderBottomColor: color, borderBottomWidth: 3 }}
                    />
                    <Text>Title</Text>
                </View>

                {/*Progress percentage input*/}
                <View style={styles.InputWithTitle} >
                    <TextInput
                        onChangeText={text => handleProgressInput(text)}
                        value={progress}
                        onFocus={() => setColor2("coral")}
                        onBlur={() => setColor2("grey")}
                        placeholder="How much have you done?"
                        style={{ borderBottomColor: color2, borderBottomWidth: 3 }}
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
