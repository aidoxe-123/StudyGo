import React, { useState, useContext, useEffect } from 'react'
import { View, Text, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Alert, StyleSheet } from 'react-native'
import { SuggestInput, PrettyTextInput, UserIdContext } from '../../components/index'
import {YellowLine} from '../../../style/yellowLine'
import { addModule, updateModulesData, getModulesData } from '../../utils/data-fetchers/ProgressTracker'
import Spinner from 'react-native-loading-spinner-overlay';
import { TodoStyles } from '../../../style/TodoStyles.js'
import wrapper from '../../utils/data-fetchers/fetchingWrapper';
import {Ionicons} from '@expo/vector-icons'

export default function Finished({ navigation }) {
    const userId = useContext(UserIdContext);
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([]);

    useEffect(() => {
        wrapper(async () => {
            await updateModulesData();
            return await getModulesData();
        }, data => { setData(data); });
    }, [])

    const handleAdd = (moduleCode) => {
        setLoading(true);
        let title = data.filter(item => item.moduleCode === moduleCode)[0].title;
        addModule(userId, moduleCode, title).then(() => setLoading(false)).then(() => navigation.goBack()).catch(error => console.log(error));
    };

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
                    <Text h1 style={YellowLine.headerText}>New module</Text>
                </View>
                <Spinner
                    visible={loading}
                    textContent='Loading...'
                    textStyle={TodoStyles.spinner}
                />
                {/*Add title textbox*/}
                <View style={styles.InputWithTitle}>
                    <SuggestInput
                        allOptions={data}
                        onChoose={(choice) => handleAdd(choice)}
                        keyExtractor={item => item.moduleCode}
                        dataExtractor={item => item.moduleCode}
                        renderOption={(item) => (<Text>{item.moduleCode} - {item.title}</Text>)}
                    />
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
})