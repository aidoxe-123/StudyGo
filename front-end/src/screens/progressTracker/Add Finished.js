import React, { useState, useContext } from 'react'
import { View, Text, TouchableWithoutFeedback, 
    Keyboard, TouchableOpacity, Alert, StyleSheet } from 'react-native'
import { PrettyTextInput, RadioButtons, UserIdContext} from './../../components/index'
import { YellowLine } from '../../../style/yellowLine'
import { Ionicons } from '@expo/vector-icons'
import { addTask } from '../../utils/data-fetchers/ProgressTracker';
import wrapper from '../../utils/data-fetchers/fetchingWrapper';

export default function Finished({ navigation, route }) {
    const [title, setTitle] = useState("");
    const [mark, setMark] = useState("");
    const [choice, setChoice] = useState(0);
    const userId = useContext(UserIdContext);

    const handleTitleInput = (text) => { setTitle(text); }
    const handleMarkInput = (text) => { setMark(text); }
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
                if (mark === "") {
                    Alert.alert("", "Please input your mark!");
                    return;
                }
                details = mark;
        }
        wrapper(() => addTask(userId, route.params.moduleId, title, true, details), response => navigation.goBack());
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={YellowLine.header}>
                    <TouchableOpacity style={YellowLine.leftWhiteButton} onPress={() => navigation.pop()}>
                        <View style={YellowLine.insideWhiteButton}>
                            <Ionicons name='ios-arrow-back' size={18} style={YellowLine.whiteButtonIcon}/>
                            <Text style={YellowLine.whiteButtonText}>Back</Text>
                        </View> 
                    </TouchableOpacity>
                    <Text h1 style={YellowLine.headerText}>New task</Text>
                    <TouchableOpacity style={YellowLine.rightWhiteButton} onPress={handleAdd}>
                        <View style={YellowLine.insideWhiteButton}>
                            <Text style={YellowLine.whiteButtonText}>Save</Text>
                        </View> 
                    </TouchableOpacity>
                </View>
                {/*Title input text box*/}
                <View style={styles.InputWithTitle}>
                    <PrettyTextInput
                        onChangeText={text => handleTitleInput(text)}
                        value={title}
                        placeholder="What have you finished?"
                        style={styles.text}
                    />
                    <Text style={styles.text}>Title</Text>
                </View>

                {/*Radio buttons*/}
                <RadioButtons onPressIndex={(index) => setChoice(index)} initialChoice={choice}>
                    <Text style={styles.text}>Not graded yet</Text>

                    <Text style={styles.text}>Ungraded</Text>

                    <PrettyTextInput
                        onChangeText={text => handleMarkInput(text)}
                        value={mark}
                        placeholder="Mark (e.g. 38)"
                        style={styles.text}
                    />
                </RadioButtons>
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
    text: {
        fontFamily: 'sourcesanspro-regular',
        fontSize: 20,
    }
})