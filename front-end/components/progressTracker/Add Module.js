import React, { useContext, useState } from 'react'
import { View, Text, TouchableWithoutFeedback, Keyboard, TouchableOpacity, TextInput, Alert, StyleSheet } from 'react-native'

export default function Finished({ navigation }) {
    const [module, setModule] = useState();
    const [color, setColor] = useState("grey");
    const handleTextInput = (text) => { setModule(text); }

    const handleAdd = (module) => {
        Alert.alert("", "Added " + module + "!");
        navigation.goBack();
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
            <View style={{ flex: 1 }}>
                {/*Add title textbox*/}
                <View style={styles.InputWithTitle}>
                    <TextInput
                        onChangeText={text => handleTextInput(text)}
                        value={module}
                        onFocus={() => setColor("coral")}
                        onBlur={() => setColor("grey")}
                        placeholder="Module (e.g. CS2030, CS2040S,..."
                        style={{ borderBottomColor: color, borderBottomWidth: 3, }}
                    />
                    <Text>Title</Text>
                </View>

                {/*Add button*/}
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => handleAdd(module)} style={styles.DoneButton}>
                        <Text style={{ color: "white" }}>Done</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>

    )
}


const styles = StyleSheet.create({
    InputWithTitle: {
        flex: 1,
        padding: "10%"
    },
    DoneButton: {
        alignItems: "center",
        aspectRatio: 5 / 2,
        backgroundColor: "coral",
        padding: 10
    }
}
)