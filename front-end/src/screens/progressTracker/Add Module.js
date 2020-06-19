import React, { useState, useContext } from 'react'
import { View, Text, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Alert, StyleSheet } from 'react-native'
import { PrettyTextInput, UserIdContext } from '../../components/index'
import { addModule } from '../../utils/data-fetchers/ProgressTracker'
import { useIsFocused } from "@react-navigation/native"
import Spinner from 'react-native-loading-spinner-overlay';
import { TodoStyles } from '../../../style/TodoStyles.js'

export default function Finished({ navigation }) {
    const userId = useContext(UserIdContext);
    const [module, setModule] = useState();
    const handleTextInput = (text) => { setModule(text); }
    const [loading, setLoading] = useState(false)

    const handleAdd = (moduleId) => {
        setLoading(true);
        addModule(userId, moduleId).then(() => setLoading(false)).catch(error => console.log(error));
        Alert.alert("", "Added " + moduleId + "!");
        navigation.goBack();
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
            <View style={{ flex: 1 }}>
                <Spinner
                    visible={loading}
                    textContent='Loading...'
                    textStyle={TodoStyles.spinner}
                />
                {/*Add title textbox*/}
                <View style={styles.InputWithTitle}>
                    <PrettyTextInput
                        onChangeText={text => handleTextInput(text)}
                        value={module}
                        placeholder="Module (e.g. CS2030, CS2040S,..."
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