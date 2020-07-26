import React, { useState, useContext, useEffect } from 'react'
import { View, Text, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Alert, StyleSheet } from 'react-native'
import { PrettyTextInput, RadioButtons, UserIdContext, Spinner, SuggestInput, YellowHeader } from '../../components/index'
import { YellowLine } from '../../../style/yellowLine'
import { Ionicons } from '@expo/vector-icons'


export default function Finished({ navigation, route }) {
    const { moduleId, refId, isHost, data } = route.params;
    const [choice, setChoice] = useState(isHost ? 1 : (refId !== "" ? 2 : 0));
    const [newRefId, setRefId] = useState("")
    const [title, setTitle] = useState("")

    const handleSubmit = () => {
        switch (choice) {
            case 0:
                navigation.navigate('Edit Unfinished', { newRefId: "", willHost: false });
                break;
            case 1:
                navigation.navigate('Edit Unfinished', { newRefId: "", willHost: true });
                break;
            case 2:
                navigation.navigate('Edit Unfinished', { newRefId: newRefId, willHost: false })
                break;
        }
    }

    useEffect(() => {
        let query = data.filter(item => item.taskId === refId);
        if (query.length === 0) setTitle("");
        else setTitle(data.filter(item => item.taskId === refId)[0].title);
    }, [])

    const renderOption = (item) => (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontSize: 16 }}>{item.title}</Text>
            <Text style={{ fontSize: 12, color: 'coral' }}> linked by {item.registered} other(s)</Text>
        </View>)

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
                    <Text h1 style={YellowLine.headerText}>Link task</Text>
                    <TouchableOpacity style={YellowLine.rightWhiteButton} onPress={() => handleSubmit("pressed")}   >
                        <View style={YellowLine.insideWhiteButton}>
                            <Text style={YellowLine.whiteButtonText}>Done</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {/*Radio buttons*/}
                <RadioButtons onPressIndex={(index) => setChoice(index)} initialChoice={choice}>
                    {/*Choice 1*/}
                    <Text>Track this task by myself</Text>
                    {/*Choice 2*/}
                    <Text>{'Make this task available to others \nfor them to search'}</Text>
                    {/*Choice 3*/}
                    <Text>Search for an already created one:</Text>
                </RadioButtons>

                <View style={styles.InputWithTitle}>
                    <SuggestInput
                        initialText={title}
                        allOptions={data}
                        onChoose={(choice) => setRefId(choice)}
                        keyExtractor={item => item.taskId}
                        dataExtractor={item => item.title}
                        renderOption={renderOption}
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>

    )
}

const styles = StyleSheet.create({
    InputWithTitle: {
        padding: '5%',
        paddingTop: '0%',
        flex: 1,
        flexDirection: 'column',
        justifyContent: "space-between"
    },
})